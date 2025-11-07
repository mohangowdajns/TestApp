import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Modal, ScrollView } from 'react-native';
import { generatePDF } from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import SmartFileManager from '../utils/SmartFileManager';
import notifee, { EventType } from '@notifee/react-native';

const ProposalGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // Set up notification action handlers
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.ACTION_PRESS) {
        const { pressAction, notification } = detail;
        const data = notification?.data as { filePath?: string; fileName?: string } || {};
        const { filePath, fileName } = data;
        
        if (pressAction?.id && filePath && fileName) {
          SmartFileManager.handleNotificationAction(pressAction.id, filePath, fileName);
        }
      }
    });

    return unsubscribe;
  }, []);

  const createHtmlContent = (customer: any) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Solar Installation Proposal</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.4;
            margin: 0;
            padding: 20px;
            color: #333;
            background-color: #f8f9fa;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #ff6b35, #ff8c42);
            color: white;
            padding: 30px;
            text-align: right;
            position: relative;
          }
          .logo {
            position: absolute;
            right: 30px;
            top: 20px;
            font-size: 14px;
            font-weight: bold;
          }
          .sun-icon {
            width: 40px;
            height: 40px;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            right: 30px;
            top: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ff6b35;
            font-size: 20px;
          }
          .customer-info {
            margin-top: 60px;
            text-align: left;
          }
          .customer-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .customer-address {
            font-size: 14px;
            opacity: 0.9;
          }
          .content {
            padding: 30px;
          }
          .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin-bottom: 20px;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 10px;
          }
          .recommendation-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
          }
          .rec-card {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            border: 2px solid #e9ecef;
          }
          .rec-card.highlight {
            background: linear-gradient(135deg, #4dabf7, #74c0fc);
            color: white;
            border: none;
          }
          .rec-label {
            font-size: 12px;
            margin-bottom: 5px;
            opacity: 0.8;
          }
          .rec-value {
            font-size: 20px;
            font-weight: bold;
          }
          .rec-unit {
            font-size: 14px;
            opacity: 0.8;
          }
          .environment-section {
            margin: 30px 0;
          }
          .env-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 15px;
          }
          .env-card {
            background: linear-gradient(135deg, #51cf66, #69db7c);
            color: white;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
          }
          .env-value {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .env-label {
            font-size: 12px;
            opacity: 0.9;
          }
          .price-section {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
            border-left: 4px solid #ff6b35;
          }
          .price-value {
            font-size: 32px;
            font-weight: bold;
            color: #333;
          }
          .contact-section {
            background: #e9ecef;
            border-radius: 8px;
            padding: 25px;
            margin-top: 30px;
          }
          .contact-title {
            text-align: center;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #333;
          }
          .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
          }
          .contact-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
          }
          .contact-value {
            font-weight: 600;
            margin-bottom: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">RISING SUN</div>
            <div class="sun-icon">☀</div>
            <div class="customer-info">
              <div class="customer-name">${customer.name}</div>
              <div class="customer-address">${customer.address}</div>
            </div>
          </div>

          <div class="content">
            <div class="section-title">Our Recommendation</div>
            <div class="recommendation-grid">
              <div class="rec-card highlight">
                <div class="rec-label">Recommended Solar Capacity</div>
                <div class="rec-value">${customer.solarCapacity}</div>
              </div>
              <div class="rec-card">
                <div class="rec-label">Required area for installation</div>
                <div class="rec-value">${customer.roofArea}</div>
                <div class="rec-unit">${customer.roofAreaM2}</div>
              </div>
              <div class="rec-card">
                <div class="rec-label">Bill Savings</div>
                <div class="rec-value">${customer.billSavings}</div>
              </div>
            </div>

            <div class="environment-section">
              <div class="section-title">Your Contribution to Environment</div>
              <div class="env-grid">
                <div class="env-card">
                  <div class="env-value">${customer.co2Reduced}</div>
                  <div class="env-label">CO₂ Reduced (metric tons)</div>
                </div>
                <div class="env-card">
                  <div class="env-value">${customer.treesPlanted}</div>
                  <div class="env-label">Trees Planted</div>
                </div>
                <div class="env-card">
                  <div class="env-value">${customer.coalAvoided}</div>
                  <div class="env-label">Coal Avoided (metric tons)</div>
                </div>
              </div>
            </div>

            <div class="price-section">
              <div class="price-value">${customer.price}</div>
              <div class="disclaimer">
                *Subsidy may be applicable as per state regulation.<br>
                Disclaimer: The price is indicative and subject to change.
              </div>
            </div>

            <div class="contact-section">
              <div class="contact-title">Contact Us</div>
              <div class="contact-grid">
                <div class="contact-card">
                  <div class="contact-value">${customer.contactPerson}</div>
                  <div class="contact-label">Rising Sun Energy</div>
                </div>
                <div class="contact-card">
                  <div class="contact-value">${customer.email}</div>
                </div>
                <div class="contact-card">
                  <div class="contact-value">${customer.phone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const showPreviewModal = () => {
    setShowPreview(true);
  };

  const generateProposalPDF = async () => {
    setIsGenerating(true);
    
    try {
      const customer = {
        name: "Deepanshu Sharma",
        address: "Flat 123, 6th Main Road, Jayanagar, Bengaluru - 560041, INDIA",
        solarCapacity: "3 kWp",
        roofArea: "360 Sq. ft",
        roofAreaM2: "33 Sq. m",
        billSavings: "55%",
        co2Reduced: "47",
        treesPlanted: "774",
        coalAvoided: "23",
        price: "₹1,86,380",
        contactPerson: "Aravind S.",
        email: "risingsun@email.com",
        phone: "80647 86549"
      };

      const htmlContent = createHtmlContent(customer);
      const fileName = 'SolarProposal_' + customer.name.replace(/\s+/g, '_') + '.pdf';

      console.log('📁 Generating PDF...');
      
      // First generate PDF in app cache (guaranteed to work)
      const cacheOptions = {
        html: htmlContent,
        fileName: fileName,
        base64: false,
        width: 612,
        height: 792,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 16,
        filePath: RNFS.CachesDirectoryPath + '/' + fileName,
      };

      const pdf = await generatePDF(cacheOptions);
      console.log('✅ PDF generated in cache:', pdf.filePath);

      // Now use SmartFileManager to save to best location
      const saveResult = await SmartFileManager.savePDFSmart(pdf.filePath, fileName);
      
      if (saveResult.success) {
        // Show notification with appropriate actions
        await SmartFileManager.showDownloadNotification(saveResult, fileName);
        
        // Also show a brief success alert
        Alert.alert(
          'Success! 🎉',
          `PDF saved using ${saveResult.method} storage.\\n\\nCheck your notification for quick actions!`,
          [{ text: 'OK' }]
        );
      } else {
        throw new Error('Failed to save PDF to any location');
      }

    } catch (error) {
      console.error('PDF Generation Error:', error);
      Alert.alert(
        'Generation Failed 😞', 
        `Could not create PDF. Error: ${(error as Error).message || error}\\n\\nPlease try again.`,
        [{ text: 'OK' }]
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const PreviewModal = () => {
    const customer = {
      name: "Deepanshu Sharma",
      address: "Flat 123, 6th Main Road, Jayanagar, Bengaluru - 560041",
      solarCapacity: "3 kWp",
      roofArea: "360 Sq. ft",
      roofAreaM2: "33 Sq. m",
      billSavings: "55%",
      co2Reduced: "47",
      treesPlanted: "774",
      coalAvoided: "23",
      price: "₹1,86,380",
      contactPerson: "Aravind S.",
      email: "risingsun@email.com",
      phone: "80647 86549"
    };

    return (
      <Modal
        visible={showPreview}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>📄 Proposal Preview</Text>
            <TouchableOpacity 
              onPress={() => setShowPreview(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.previewScroll}>
            <View style={styles.previewContainer}>
              {/* Header */}
              <View style={styles.previewHeader}>
                <Text style={styles.logoText}>RISING SUN</Text>
                <Text style={styles.sunIcon}>☀</Text>
                <Text style={styles.customerName}>{customer.name}</Text>
                <Text style={styles.customerAddress}>{customer.address}</Text>
              </View>

              {/* Recommendations */}
              <Text style={styles.sectionTitle}>Our Recommendation</Text>
              <View style={styles.recGrid}>
                <View style={[styles.recCard, styles.highlight]}>
                  <Text style={styles.recLabel}>Solar Capacity</Text>
                  <Text style={styles.recValue}>{customer.solarCapacity}</Text>
                </View>
                <View style={styles.recCard}>
                  <Text style={styles.recLabel}>Required Area</Text>
                  <Text style={styles.recValue}>{customer.roofArea}</Text>
                  <Text style={styles.recUnit}>{customer.roofAreaM2}</Text>
                </View>
                <View style={styles.recCard}>
                  <Text style={styles.recLabel}>Bill Savings</Text>
                  <Text style={styles.recValue}>{customer.billSavings}</Text>
                </View>
              </View>

              {/* Environment */}
              <Text style={styles.sectionTitle}>Environmental Impact</Text>
              <View style={styles.envGrid}>
                <View style={styles.envCard}>
                  <Text style={styles.envValue}>{customer.co2Reduced}</Text>
                  <Text style={styles.envLabel}>CO₂ Reduced (tons)</Text>
                </View>
                <View style={styles.envCard}>
                  <Text style={styles.envValue}>{customer.treesPlanted}</Text>
                  <Text style={styles.envLabel}>Trees Planted</Text>
                </View>
                <View style={styles.envCard}>
                  <Text style={styles.envValue}>{customer.coalAvoided}</Text>
                  <Text style={styles.envLabel}>Coal Avoided (tons)</Text>
                </View>
              </View>

              {/* Price */}
              <View style={styles.priceSection}>
                <Text style={styles.priceTitle}>Total Price</Text>
                <Text style={styles.priceValue}>{customer.price}</Text>
                <Text style={styles.disclaimer}>
                  *Subsidy may be applicable. Price is indicative.
                </Text>
              </View>

              {/* Contact */}
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <View style={styles.contactGrid}>
                <Text>{customer.contactPerson}</Text>
                <Text>{customer.email}</Text>
                <Text>{customer.phone}</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowPreview(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.generateButton]}
              onPress={() => {
                setShowPreview(false);
                generateProposalPDF();
              }}
              disabled={isGenerating}
            >
              <Text style={styles.generateButtonText}>
                {isGenerating ? 'Generating...' : '📄 Generate PDF'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solar Proposal Generator</Text>
      <Text style={styles.description}>
        Generate professional solar installation proposals with smart file management
      </Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={showPreviewModal}
      >
        <Text style={styles.buttonText}>👁 Preview Proposal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.directButton]}
        onPress={generateProposalPDF}
        disabled={isGenerating}
      >
        <Text style={styles.buttonText}>
          {isGenerating ? 'Generating...' : '☀ Generate PDF with Notification'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>🚀 New Features:</Text>
        <Text style={styles.infoItem}>• Smart file storage (works on all Android versions)</Text>
        <Text style={styles.infoItem}>• Rich notifications with Open & Share actions</Text>
        <Text style={styles.infoItem}>• Automatic permission handling</Text>
        <Text style={styles.infoItem}>• MediaStore integration for Android 10+</Text>
      </View>

      <PreviewModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#ff6b35',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#4dabf7',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 10,
  },
  directButton: {
    backgroundColor: '#ff6b35',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  infoItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f8f9fa',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
  },
  previewScroll: {
    flex: 1,
  },
  previewContainer: {
    padding: 20,
  },
  previewHeader: {
    backgroundColor: '#ff6b35',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  logoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'right',
  },
  sunIcon: {
    fontSize: 20,
    textAlign: 'right',
    marginVertical: 5,
  },
  customerName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  customerAddress: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 5,
  },
  recGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  recCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    flex: 1,
    margin: 5,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  highlight: {
    backgroundColor: '#4dabf7',
    borderColor: '#4dabf7',
  },
  recLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  recValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  recUnit: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  envGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  envCard: {
    backgroundColor: '#51cf66',
    borderRadius: 8,
    padding: 15,
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  envValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  envLabel: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  priceSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 20,
    marginVertical: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b35',
  },
  priceTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  disclaimer: {
    fontSize: 11,
    color: '#666',
    fontStyle: 'italic',
  },
  contactGrid: {
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#f8f9fa',
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  generateButton: {
    backgroundColor: '#ff6b35',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  generateButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ProposalGenerator;