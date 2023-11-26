import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import {Product} from '../src/models';
// import {DataStore} from 'aws-amplify';

const initialState = {
  data: [],
};

const promotionProductsSlice = createSlice({
  name: 'promotionProducts',
  initialState,
  extraReducers: builder => {
    builder.addCase(getPromotionProducts.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default promotionProductsSlice.reducer;
// export const {fetchPromotionProducts} = promotionProductsSlice.actions;

export const getPromotionProducts = createAsyncThunk(
  'promotionProducts/get',
  async () => {
    // try {
    //   const promotionProductsData = await DataStore.query(Product, pro =>
    //     pro.discountRate.gt(0),
    //   );
    //   return promotionProductsData;
    //   // console.log('promotions', promotionProductsData);
    // } catch (error) {
    //   console.log('Error', error);
    // }
  },
);
