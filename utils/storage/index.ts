import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'bytebank';
const formatKey = (key: string) => `${PREFIX}-${key}`;

export const storageGetItem = async <T = any>(key: string) => {
  try {
    const value = await AsyncStorage.getItem(formatKey(key));
    if (!value) return undefined;

    const parsed = JSON.parse(value);
    if (!parsed) return undefined;

    return parsed.value as T;
  } catch (error) {
    console.error('storageGetItem error:', error);
    return undefined;
  }
};

export const storageSetItem = async <T>(key: string, value: T) => {
  try {
    const formattedKey = formatKey(key);
    if (!value) return await AsyncStorage.removeItem(formattedKey);

    const formattedValue = JSON.stringify({ value });
    await AsyncStorage.setItem(formattedKey, formattedValue);
  } catch (error) {
    console.error('storageSetItem error:', error);
  }
};

export const storageRemoveItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(formatKey(key));
  } catch (error) {
    console.error('storageRemoveItem error:', error);
  }
};
