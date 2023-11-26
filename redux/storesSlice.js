import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import {Store} from '../src/models';
// import {DataStore} from 'aws-amplify';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  data: [],
};

const storesSlice = createSlice({
  name: 'stores',
  initialState,
  extraReducers: build => {
    build.addCase(getStores.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

// export const {fetchStores} = storesSlice.actions;
export default storesSlice.reducer;

// export function getStores() {
//   return async function getStoresThunk(dispatch, getState) {
//     try {
//       const storesData = await DataStore.query(Store);
//       dispatch(fetchStores(storesData));
//     } catch (error) {
//       console.log('error', error);
//     }
//   };
// }

export const getStores = createAsyncThunk('stores/get', async () => {
  try {
    const stores = [];
    await firestore()
      .collection('Stores')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const {
            address,
            city,
            country,
            courier,
            description,
            image,
            sellerId,
            title,
            type,
          } = doc.data();
          stores.push({
            id: doc.id,
            address,
            city,
            country,
            courier,
            description,
            image,
            sellerId,
            title,
            type,
          });
        });
      });
    return stores;
  } catch (error) {}
  // try {
  //   const storesData = await DataStore.query(Store);
  //   return storesData;
  // } catch (error) {
  //   console.log('error', error);
  // }
});
