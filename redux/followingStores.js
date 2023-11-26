import firestore from '@react-native-firebase/firestore';

export const addToStoresList = async (loggedUser, proId) => {
  await firestore()
    .collection('User')
    .doc(loggedUser)
    .update({
      storesList: firestore.FieldValue.arrayUnion(proId),
    });
};
