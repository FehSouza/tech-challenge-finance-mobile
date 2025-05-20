import { theme } from '@/theme';
import React, { useCallback, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SelectItem } from '../SelectItem';

interface SelectProps<T extends readonly string[]> {
  placeholder: string;
  options: T;
  value: T[number] | null | undefined;
  onPress: (option: T[number]) => void;
  color?: 'primary' | 'error';
}

export const Select = <T extends readonly string[]>({
  placeholder,
  options,
  value,
  onPress,
  color = 'primary',
}: SelectProps<T>) => {
  const [opened, setOpened] = useState(false);

  const handleSelect = useCallback(
    (option: string) => {
      onPress(option as T[number]);
      setOpened(false);
    },
    [onPress]
  );

  const buttonStyle = [style.button, style[`button_${color}`]];
  const buttonTextStyle = [style.buttonText, value && style.buttonTextSelected];

  return (
    <View>
      <TouchableOpacity style={buttonStyle} activeOpacity={0.8} onPress={() => setOpened(true)}>
        <Text style={buttonTextStyle}>{value || placeholder}</Text>
      </TouchableOpacity>

      <Modal visible={opened} transparent animationType='fade'>
        <TouchableOpacity style={style.modalOverlay} activeOpacity={0.8} onPress={() => setOpened(false)}>
          <View style={style.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item, i) => `select-item-${item}-${i}`}
              renderItem={({ item }) => (
                <SelectItem option={item} value={value} handleSelect={handleSelect} color={color} />
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 40,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.gray800,
    borderWidth: 1,
    borderRadius: 8,
  },

  button_primary: {
    borderColor: theme.colors.gray800,
  },

  button_error: {
    borderColor: theme.colors.error,
  },

  buttonText: {
    fontFamily: theme.fontFamily.inter400,
    fontSize: 16,
    lineHeight: 18,
    color: theme.colors.gray400,
  },

  buttonTextSelected: {
    color: theme.colors.white,
  },

  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: theme.colors.overlay,
  },

  modalContent: {
    width: '100%',
    maxHeight: '50%',
    borderRadius: 8,
    backgroundColor: theme.colors.gray800,
    paddingVertical: 16,
  },
});
