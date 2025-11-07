package com.arkaenergy.testapp1;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

public class MediaStoreModule extends ReactContextBaseJavaModule {
    private static final String TAG = "MediaStoreModule";

    public MediaStoreModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "MediaStoreModule";
    }

    @ReactMethod
    public void saveToDownloads(String sourceFilePath, String fileName, Promise promise) {
        try {
            Context context = getReactApplicationContext();
            
            // For Android 10+ use MediaStore
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                saveToMediaStore(context, sourceFilePath, fileName, promise);
            } else {
                // For older versions, fall back to direct file copy
                saveToLegacyStorage(sourceFilePath, fileName, promise);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error saving to downloads: " + e.getMessage());
            promise.reject("SAVE_ERROR", e.getMessage());
        }
    }

    private void saveToMediaStore(Context context, String sourceFilePath, String fileName, Promise promise) {
        try {
            ContentResolver resolver = context.getContentResolver();
            
            ContentValues contentValues = new ContentValues();
            contentValues.put(MediaStore.Downloads.DISPLAY_NAME, fileName);
            contentValues.put(MediaStore.Downloads.MIME_TYPE, "application/pdf");
            contentValues.put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS);
            
            Uri uri = resolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, contentValues);
            
            if (uri != null) {
                try (OutputStream outputStream = resolver.openOutputStream(uri);
                     FileInputStream inputStream = new FileInputStream(sourceFilePath)) {
                    
                    byte[] buffer = new byte[1024];
                    int length;
                    while ((length = inputStream.read(buffer)) > 0) {
                        outputStream.write(buffer, 0, length);
                    }
                    
                    Log.d(TAG, "File saved to MediaStore: " + uri.toString());
                    promise.resolve(uri.toString());
                }
            } else {
                promise.reject("MEDIASTORE_ERROR", "Failed to create MediaStore entry");
            }
        } catch (IOException e) {
            Log.e(TAG, "IOException in saveToMediaStore: " + e.getMessage());
            promise.reject("IO_ERROR", e.getMessage());
        }
    }

    private void saveToLegacyStorage(String sourceFilePath, String fileName, Promise promise) {
        try {
            File downloadsDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
            File destFile = new File(downloadsDir, fileName);
            
            try (FileInputStream inputStream = new FileInputStream(sourceFilePath);
                 java.io.FileOutputStream outputStream = new java.io.FileOutputStream(destFile)) {
                
                byte[] buffer = new byte[1024];
                int length;
                while ((length = inputStream.read(buffer)) > 0) {
                    outputStream.write(buffer, 0, length);
                }
                
                Log.d(TAG, "File saved to legacy storage: " + destFile.getAbsolutePath());
                promise.resolve("file://" + destFile.getAbsolutePath());
            }
        } catch (IOException e) {
            Log.e(TAG, "IOException in saveToLegacyStorage: " + e.getMessage());
            promise.reject("IO_ERROR", e.getMessage());
        }
    }
}