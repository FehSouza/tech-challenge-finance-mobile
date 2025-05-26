import { storage } from '@/FirebaseConfig';
import { getAuth } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Alert } from 'react-native';

export const uploadImage = async (attachment: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user || !attachment) {
    Alert.alert('No user or image found!');
    return;
  }

  try {
    const response = await fetch(attachment);
    const blob = await response.blob();

    const storageRef = ref(storage, `images/${user.uid}/${Date.now()}`);
    await uploadBytes(storageRef, blob);

    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error: any) {
    console.error('Error uploading image: ', error);
    Alert.alert('Upload failed!', error.message);
  }
};
