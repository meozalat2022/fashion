import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import {Store} from '../src/models';
// import {DataStore} from 'aws-amplify';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  data: [],
};

const storeToFollowSLice = createSlice({
  name: 'storesToFollow',
  initialState,
  extraReducers: build => {
    build.addCase(getStoreToFOllow.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

// const storesSlice = createSlice({
//     name: 'stores',
//     initialState,
//     extraReducers: build => {
//       build.addCase(getStores.fulfilled, (state, action) => {
//         state.data = action.payload;
//       });
//     },
//   });

export default storeToFollowSLice.reducer;

export const getStoreToFOllow = createAsyncThunk(
  'getStoreToFollow/get',
  async storeId => {
    // console.log(storeId);
    try {
      const pros = [];
      await firestore()
        .collection('Products')
        .where('storeID', '==', storeId)
        .get()
        .then(querySnapShot => {
          querySnapShot.forEach(doc => {
            const {title, image, offerPrice, price} = doc.data();
            pros.push({id: doc.id, title, image, offerPrice, price});
          });
        });
      return pros;
    } catch (error) {
      console.log('error', error);
    }
    // try {
    //   const storesData = await DataStore.query(Store, storeId);
    //   const storesProducts = storesData.storeProducts.toArray();
    //   return storesProducts;
    // } catch (error) {
    //   console.log("error", error)
    // }
  },
);
