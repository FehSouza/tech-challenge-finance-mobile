import { theme } from '@/theme';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface SelectItemProps {
  option: string;
  value: string | null | undefined;
  handleSelect: (option: string) => void;
  color?: 'primary' | 'error';
}

export const SelectItem = ({ option, value, handleSelect, color = 'primary' }: SelectItemProps) => {
  const itemSelected = option === value;

  const itemStyle = [style.item, itemSelected && style[`item_selected_${color}`]];
  const itemTextStyle = [style.itemText, itemSelected && style.itemTextSelected];

  return (
    <TouchableOpacity style={itemStyle} activeOpacity={0.8} onPress={() => handleSelect(option)}>
      <Text style={itemTextStyle}>{option}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  item: {
    minHeight: 40,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  item_selected_primary: {
    backgroundColor: theme.colors.primary,
  },

  item_selected_error: {
    backgroundColor: theme.colors.error,
  },

  itemText: {
    fontFamily: theme.fontFamily.inter400,
    fontSize: 16,
    lineHeight: 18,
    color: theme.colors.gray400,
  },

  itemTextSelected: {
    color: theme.colors.white,
  },
});
