import { NativeModules, Platform, PermissionsAndroid, Linking } from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import notifee from '@notifee/react-native';

const { MediaStoreModule } = NativeModules;

interface SaveResult {
  success: boolean;
  filePath: string;
  method: 'MediaStore' | 'External' | 'Internal';
  canOpen: boolean;
  canShare: boolean;
}

export class SmartFileManager {
  
  static async getAndroidVersion(): Promise<number> {
    return Platform.Version as number;
  }

  static async requestStoragePermission(): Promise<boolean> {
    try {
      const androidVersion = await this.getAndroidVersion();
      
      // Android 11+ doesn't need WRITE_EXTERNAL_STORAGE
      if (androidVersion >= 30) {
        return true;
      }

      // Android 6-10 needs runtime permission
      if (androidVersion >= 23) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs storage permission to save PDF files to Downloads.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }

      // Android 5 and below - no runtime permission needed
      return true;
    } catch (error) {
      console.log('Permission request failed:', error);
      return false;
    }
  }

  static async savePDFSmart(sourceFilePath: string, fileName: string): Promise<SaveResult> {
    const androidVersion = await this.getAndroidVersion();
    
    console.log(`📱 Android Version: ${androidVersion}`);
    console.log(`📁 Attempting to save: ${fileName}`);
    
    // Try Method 1: MediaStore (Android 10+)
    if (androidVersion >= 29 && MediaStoreModule) {
      try {
        console.log('🔄 Trying MediaStore API...');
        const mediaStoreUri = await MediaStoreModule.saveToDownloads(sourceFilePath, fileName);
        console.log('✅ MediaStore Success:', mediaStoreUri);
        
        return {
          success: true,
          filePath: mediaStoreUri,
          method: 'MediaStore',
          canOpen: true,
          canShare: true
        };
      } catch (error) {
        console.log('❌ MediaStore failed:', error);
      }
    }

    // Try Method 2: External Storage (Android 6-10)
    if (androidVersion >= 23 && androidVersion < 30) {
      const hasPermission = await this.requestStoragePermission();
      if (hasPermission) {
        try {
          console.log('🔄 Trying External Storage...');
          const externalPath = `/storage/emulated/0/Download/${fileName}`;
          await RNFS.copyFile(sourceFilePath, externalPath);
          
          // Verify file exists
          const fileExists = await RNFS.exists(externalPath);
          if (fileExists) {
            console.log('✅ External Storage Success:', externalPath);
            return {
              success: true,
              filePath: `file://${externalPath}`,
              method: 'External',
              canOpen: true,
              canShare: true
            };
          }
        } catch (error) {
          console.log('❌ External Storage failed:', error);
        }
      }
    }

    // Try Method 3: Legacy External Storage (Android < 6)
    if (androidVersion < 23) {
      try {
        console.log('🔄 Trying Legacy External Storage...');
        const legacyPath = `/storage/emulated/0/Download/${fileName}`;
        await RNFS.copyFile(sourceFilePath, legacyPath);
        
        const fileExists = await RNFS.exists(legacyPath);
        if (fileExists) {
          console.log('✅ Legacy Storage Success:', legacyPath);
          return {
            success: true,
            filePath: `file://${legacyPath}`,
            method: 'External',
            canOpen: true,
            canShare: true
          };
        }
      } catch (error) {
        console.log('❌ Legacy Storage failed:', error);
      }
    }

    // Fallback: Keep in Internal Storage
    console.log('🔄 Using Internal Storage fallback...');
    return {
      success: true,
      filePath: `file://${sourceFilePath}`,
      method: 'Internal',
      canOpen: false,
      canShare: true
    };
  }

  static async openPDF(filePath: string): Promise<boolean> {
    try {
      const supported = await Linking.canOpenURL(filePath);
      if (supported) {
        await Linking.openURL(filePath);
        return true;
      }
      return false;
    } catch (error) {
      console.log('Error opening PDF:', error);
      return false;
    }
  }

  static async sharePDF(filePath: string, fileName: string): Promise<boolean> {
    try {
      const options = {
        title: 'Share Solar Proposal',
        message: `Solar proposal for ${fileName.replace('.pdf', '').replace(/_/g, ' ')}`,
        url: filePath,
        type: 'application/pdf',
        filename: fileName,
        saveToFiles: true,
      };

      await Share.open(options);
      return true;
    } catch (error) {
      console.log('Error sharing PDF:', error);
      return false;
    }
  }

  static async showDownloadNotification(saveResult: SaveResult, fileName: string): Promise<void> {
    try {
      // Create notification channel
      const channelId = await notifee.createChannel({
        id: 'pdf_download',
        name: 'PDF Downloads',
        importance: 4,
      });

      // Create notification with actions
      const actions = [];
      
      if (saveResult.canOpen) {
        actions.push({
          id: 'open',
          title: '📖 Open PDF',
          pressAction: { id: 'open', launchActivity: 'default' }
        });
      }

      if (saveResult.canShare) {
        actions.push({
          id: 'share',
          title: '📤 Share',
          pressAction: { id: 'share', launchActivity: 'default' }
        });
      }

      await notifee.displayNotification({
        title: 'Solar Proposal Ready! 🎉',
        body: `${fileName} saved successfully to ${saveResult.method === 'MediaStore' ? 'Downloads' : saveResult.method === 'External' ? 'Downloads folder' : 'app storage'}`,
        android: {
          channelId,
          smallIcon: 'ic_notification',
          largeIcon: 'ic_launcher',
          actions,
          pressAction: {
            id: 'default',
            launchActivity: 'default',
          },
          data: {
            filePath: saveResult.filePath,
            fileName: fileName,
          }
        },
      });

    } catch (error) {
      console.log('Notification error:', error);
    }
  }

  static async handleNotificationAction(actionId: string, filePath: string, fileName: string): Promise<void> {
    try {
      switch (actionId) {
        case 'open':
          const opened = await this.openPDF(filePath);
          if (!opened) {
            console.log('Could not open PDF with default app');
          }
          break;
          
        case 'share':
          await this.sharePDF(filePath, fileName);
          break;
          
        default:
          // Default action - try to open
          await this.openPDF(filePath);
      }
    } catch (error) {
      console.log('Error handling notification action:', error);
    }
  }
}

export default SmartFileManager;