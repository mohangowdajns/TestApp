import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (language: string) => void;
}

export default function LanguageSelector({
  visible,
  onClose,
  selected,
  onSelect,
}: LanguageSelectorProps) {
  const languages = ['English', 'Hindi'];

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.sheet}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang}
            style={styles.option}
            onPress={() => onSelect(lang)}
          >
            <Text
              style={[
                styles.optionText,
                lang === selected && styles.selectedText,
              ]}
            >
              {lang}
            </Text>
            {lang === selected && <Text style={styles.check}>✔</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    minHeight: 100,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  check: {
    color: '#007AFF',
    fontSize: 16,
  },
});
