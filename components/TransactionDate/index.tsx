import { Button } from '@/components/shared';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

interface TransactionDateProps {
  placeholder: string;
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
}

export const TransactionDate = ({ placeholder, date, setDate }: TransactionDateProps) => {
  const isIOS = Platform.OS === 'ios';
  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const showPicker = () => {
    if (isIOS && date) setTempDate(date);
    setShow(true);
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type !== 'set' || !selectedDate) return setShow(false);
    if (isIOS) return setTempDate(selectedDate);
    setDate(selectedDate);
    setShow(false);
  };

  const handleIOSCancel = () => setShow(false);

  const handleIOSSave = () => {
    setDate(tempDate);
    setShow(false);
  };

  const dateFormatted = date?.toLocaleDateString('pt-BR', { dateStyle: 'full' });

  return (
    <>
      <Button variant='input' textAlign='left' textActive={!!date} onPress={showPicker}>
        {!date ? placeholder : dateFormatted}
      </Button>

      {show && (
        <DateTimePicker
          display='spinner'
          mode='date'
          value={isIOS ? tempDate : date ?? new Date()}
          onChange={onChange}
          minimumDate={new Date(1980, 0, 1)}
        />
      )}

      {show && isIOS && (
        <View style={style.buttonsContainer}>
          <View style={style.button}>
            <Button variant='outlined' onPress={handleIOSCancel}>
              Cancelar
            </Button>
          </View>
          <View style={style.button}>
            <Button variant='outlined' onPress={handleIOSSave}>
              Salvar
            </Button>
          </View>
        </View>
      )}
    </>
  );
};

const style = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    gap: 25,
    justifyContent: 'space-between',
  },

  button: {
    flex: 1,
  },
});
