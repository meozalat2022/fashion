import firestore from '@react-native-firebase/firestore';

export const addToWishList = async (loggedUser, proId) => {
  await firestore()
    .collection('User')
    .doc(loggedUser)
    .update({
      wishList: firestore.FieldValue.arrayUnion(proId),
    });
};
