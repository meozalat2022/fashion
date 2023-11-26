import {DataStore} from 'aws-amplify';
import {Cart, Product} from '../src/models';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

// import {API} from 'aws-amplify';
// import {listCarts} from '../src/graphql/queries';
const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, {payload}) {
      const {id} = payload;
      const find = state.find(item => item.id === id);
      if (find) {
        return state.map(item =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      } else {
        state.push({
          ...payload,
          quantity: 1,
        });
      }
    },
    increment(state, {payload}) {
      return state.map(item =>
        item.id === payload
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
    },
    decrement(state, {payload}) {
      return state.map(item =>
        item.id === payload
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      );
    },
    clear(state, {payload}) {
      return state.filter(item => item.id !== payload);
    },
    clearCart(state) {
      return [];
    },
  },
  // extraReducers: build => {
  //   build.addCase(getCart.fulfilled, (state, action) => {
  //     state.data = action.payload;
  //   });
  // },
});
export const {addToCart, increment, decrement, clear, clearCart} =
  cartSlice.actions;

export default cartSlice.reducer;

// export const getCart = createAsyncThunk('cart/get', async loggedUser => {
//   try {
//     const cartPros = [];
//     await firestore()
//       .collection('Cart')
//       .where('userId', '==', loggedUser)
//       .get()
//       .then(querySnapShot => {
//         querySnapShot.forEach(doc => {
//           const {
//             productId,
//             productTitle,
//             productImage,
//             productOfferPrice,
//             productPrice,
//             quantity,
//           } = doc.data();
//           cartPros.push({
//             id: doc.id,
//             productId,
//             productTitle,
//             productImage,
//             productOfferPrice,
//             productPrice,
//             quantity,
//           });
//         });
//       });
//     return cartPros;
//   } catch (error) {
//     console.log('error', error);
//   }
//   try {
//     const variables = {
//       filter: {
//         cartUserId: {
//           eq: userId,
//         },
//       },
//     };
//     const cartProducts = await API.graphql({
//       query: listCarts,
//       variables: variables,
//     });
//     return cartProducts.data.listCarts.items;
//     const cartData = await DataStore.query(Cart, u => u.cartUserId.eq(userId));
//     const cartProducts = await Promise.all(
//       cartData.map(pro => DataStore.query(Product, pro.cartProductId)),
//     );
//     const finalData = cartData.map(pr => ({
//       ...pr,
//       product: cartProducts.find(pro => pro.id === pr.cartProductId),
//     }));
//     // console.log('555555555555555', finalData);
//     return finalData;
//   } catch (error) {
//     console.log('Error', error);
//   }
// });
