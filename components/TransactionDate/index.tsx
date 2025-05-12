import { Button } from '@/components/shared';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

export const TransactionDate = () => {
  const isIOS = Platform.OS === 'ios';
  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
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
        {!date ? 'Selecione a data da transação' : dateFormatted}
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
          <Button variant='outlined' styles={{ width: '49%' }} onPress={handleIOSCancel}>
            Cancelar
          </Button>
          <Button variant='outlined' styles={{ width: '49%' }} onPress={handleIOSSave}>
            Salvar
          </Button>
        </View>
      )}
    </>
  );
};

const style = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
});
