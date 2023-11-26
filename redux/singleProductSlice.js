import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {DataStore} from 'aws-amplify';
// import {Product} from '../src/models';

const initialState = {
  data: [],
};

const signleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  extraReducers: builder => {
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default signleProductSlice.reducer;
// export const {fetchSingleProduct} = signleProductSlice.actions;

export const getSingleProduct = createAsyncThunk(
  'singleProduct/get',
  async id => {
    try {
      await firestore()
        .collection('Product')
        .doc(id)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            setMealDetails(documentSnapshot.data());
            return documentSnapshot.data();
          }
        });
    } catch (error) {
      console.log('error', error);
    }
    // try {
    //   const selectedProductsData = await DataStore.query(Product, id);
    //   // console.log('single Product', selectedProductsData);
    //   return selectedProductsData[0];
    // } catch (error) {
    //   console.log('Error', error);
    // }
  },
);
