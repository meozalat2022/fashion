import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

// import {Auth} from 'aws-amplify';

const initialState = {
  authenticated: null,
};

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  extraReducers: build => {
    build
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.authenticated = action.payload;
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.authenticated = action.payload;
      });
  },
});

export default authUserSlice.reducer;

export const getAuthUser = createAsyncThunk('authUser/get', async data => {
  const {email, password} = data;
  let user;
  try {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        user = userCredential.user.uid;
      });
    return user;
  } catch (error) {
    console.log('Error', error);
  }
  // try {
  //   const loggedInUser = await Auth.currentAuthenticatedUser({
  //     bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  //   });
  //   return loggedInUser.attributes.sub;
  // } catch (error) {
  //   console.log(error);
  // }
});

export const signOutUser = createAsyncThunk('signOut/get', async () => {
  try {
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    return null;
  } catch (error) {
    console.log('error', error);
  }
});
