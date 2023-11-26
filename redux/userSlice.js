import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {DataStore} from 'aws-amplify';
// import {User} from '../src/models';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  data: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: build => {
    build.addCase(getUser.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default userSlice.reducer;

export const getUser = createAsyncThunk('user/get', async userId => {
  try {
    const userInfo = [];
    await firestore()
      .collection('User')
      .doc(userId)
      .get()
      .then(documentSnapshot => {
        userInfo.push(documentSnapshot.data());
      });
    return userInfo;
  } catch (error) {
    console.log('error', error);
  }
  // try {
  //   const userData = await DataStore.query(User, u => u.authID.eq(userId));
  //   console.log('user data', userId);
  //   return userData;
  // } catch (error) {
  //   console.log('Error', error);
  // }
});
