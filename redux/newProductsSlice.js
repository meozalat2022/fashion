import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {Product} from '../src/models';
// import {
//   API,
//   graphqlOperation,
//   DataStore,
//   Predicates,
//   SortDirection,
// } from 'aws-amplify';
// import {productByDate} from '../src/graphql/queries';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  data: [],
};

const newProductSlice = createSlice({
  name: 'newProducts',
  initialState,
  extraReducers: builder => {
    builder.addCase(getNewProducts.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default newProductSlice.reducer;
// export const {fetchNewProducts} = newProductSlice.actions;

export const getNewProducts = createAsyncThunk('newProducts/get', async () => {
  try {
    const newPro = [];
    await firestore()
      .collection('Products')
      .orderBy('createdAt', 'asc')
      .limit(10)
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(doc => {
          const {title, image, offerPrice, price} = doc.data();
          newPro.push({id: doc.id, title, image, offerPrice, price});
        });
      });
    return newPro;
  } catch (error) {}

  // try {
  //   const newProductsData = await API.graphql(
  //     graphqlOperation(productByDate, {
  //       type: 'Product',
  //       SortDirection: ASC,
  //     }),
  //   );
  //   // const newProductsData = await DataStore.query(Product, Predicates.ALL, {
  //   //   sort: s => s.createdAt(SortDirection.DESCENDING),
  //   //   page: 0,
  //   //   limit: 10,
  //   // });
  //   console.log('0000000000000000000', newProductsData);
  //   return newProductsData;
  // } catch (error) {
  //   console.log('error', error);
  // }
});
