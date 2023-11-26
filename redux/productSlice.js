import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import {Product} from '../src/models';
// import {DataStore} from 'aws-amplify';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  data: [],
  singleProduct: [],
  deleted: [],
};

const productSlice = createSlice({
  name: 'singleProduct',
  initialState,
  // reducers: {
  //   fetchSingleProduct(state, action) {
  //     state.singleProduct = action.payload;
  //   },
  //   fetchPromotionProducts(state, action) {
  //     state.promotionProducts = action.payload;
  //   },
  //   fetchNewProducts(state, action) {
  //     state.newProducts = action.payload;
  //   },
  //   fetchAllProducts(state, action) {
  //     state.data = action.payload;
  //   },
  // },
  extraReducers: builder => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleted = action.payload;
      });
    // .addCase(fetchNewProducts.fulfilled, (state, action) => {
    //   state.newProducts = action.payload;
    // })
    // .addCase(fetchPromotionProducts.fulfilled, (state, action) => {
    //   state.promotionProducts = action.payload;
    // });
    // .addCase(getSingleProduct.fulfilled, (state, action) => {
    //   state.singleProduct = action.payload;
    // });
  },
});

// export const {fetchAllProducts} = productSlice.actions;
export default productSlice.reducer;

// export function getSingleProduct({id}) {
//   return async function getProductThunk(dispatch, getState) {
//     try {
//       const selectedProductsData = await DataStore.query(Product, id);
//       dispatch(fetchSingleProduct(selectedProductsData));
//       // console.log('single Product', selectedProductsData);
//     } catch (error) {
//       console.log('Error', error);
//     }
//   };
// }

// export const getSingleProduct = createAsyncThunk(
//   'singleProduct/get',
//   async ({id}) => {
//     try {
//       const selectedProductsData = await DataStore.query(Product, id);
//       return selectedProductsData;
//       // console.log('single Product', selectedProductsData);
//     } catch (error) {
//       console.log('Error', error);
//     }
//   },
// );

// export function getProducts() {
//   return async function getProductsThunk(dispatch, getState) {
//     try {
//       const productsData = await DataStore.query(Product);
//       dispatch(fetchAllProducts(productsData));
//     } catch (error) {
//       console.log('error', error);
//     }
//   };
// }

export const getProducts = createAsyncThunk('products/get', async () => {
  try {
    const pros = [];
    await firestore()
      .collection('Products')
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(doc => {
          const {
            title,
            image,
            offerPrice,
            price,
            storeID,
            categoryID,
            location,
            description,
            priceType,
            condition,
          } = doc.data();
          pros.push({
            id: doc.id,
            title,
            image,
            offerPrice,
            price,
            storeID,
            categoryID,
            location,
            description,
            priceType,
            condition,
          });
        });
      });
    return pros;
  } catch (error) {}
  // try {
  //   const productsData = await DataStore.query(Product);
  //   return productsData;
  // } catch (error) {
  //   console.log('error', error);
  // }
});

export const getSingleProduct = createAsyncThunk(
  'product/get',
  async productId => {
    try {
      const productData = [];
      await firestore()
        .collection('Products')
        .doc(productId)
        .get()
        .then(documentSnapshot => {
          productData.push(documentSnapshot.data());
          console.log('single product', documentSnapshot());
        });
      return productData;
    } catch (error) {
      console.log('error', error);
    }
  },
);
export const deleteProduct = createAsyncThunk(
  'product/delete',
  async productId => {
    try {
      await firestore().collection('Products').doc(productId).delete();
    } catch (error) {
      console.log('Error', error);
    }
  },
);
// export function getPromotionProducts() {
//   return async function getPromotionProductThunk(dispatch, getState) {
//     try {
//       const promotionProductsData = await DataStore.query(Product, pro =>
//         pro.discountRate.gt(0),
//       );
//       dispatch(fetchPromotionProducts(promotionProductsData));
//       // console.log('promotions', promotionProductsData);
//     } catch (error) {
//       console.log('Error', error);
//     }
//   };
// }

// export const getPromotionProducts = createAsyncThunk(
//   'promotion/get',
//   async () => {
//     try {
//       const promotionProductsData = await DataStore.query(Product, pro =>
//         pro.discountRate.gt(0),
//       );
//       return promotionProductsData;
//       // console.log('promotions', promotionProductsData);
//     } catch (error) {
//       console.log('Error', error);
//     }
//   },
// );

// export function getNewProducts() {
//   return async function getNewProductsThunk(dispatch, getState) {
//     try {
//       const newProductsData = await DataStore.query(Product, Predicates.ALL, {
//         sort: s => s.createdAt(SortDirection.DESCENDING),
//         page: 0,
//         limit: 10,
//       });
//       dispatch(fetchNewProducts(newProductsData));
//       console.log('000000000', newProductsData);
//     } catch (error) {
//       console.log('error', error);
//     }
//   };
// }

// export const getNewProducts = createAsyncThunk('newProducts/get', async () => {
//   try {
//     const newProductsData = await DataStore.query(Product, Predicates.ALL, {
//       sort: s => s.createdAt(SortDirection.DESCENDING),
//       page: 0,
//       limit: 10,
//     });
//     return newProductsData;
//     // console.log('000000000', newProductsData);
//   } catch (error) {
//     console.log('error', error);
//   }
// });
