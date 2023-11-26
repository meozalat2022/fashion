import {configureStore} from '@reduxjs/toolkit';
import productSlice from './productSlice';
import categorySlice from './categorySlice';
import storesSlice from './storesSlice';
import singleProductSlice from './singleProductSlice';
import newProductsSlice from './newProductsSlice';
import promotionProductsSlice from './promotionProductsSlice';
import storeToFollowSLice from './storesFollowSlice';
import userSlice from './userSlice';
import authUserSlice from './authUserSlice';
import cartSlice from './cartSlice';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';

const reducers = combineReducers({
  products: productSlice,
  category: categorySlice,
  stores: storesSlice,
  singleProduct: singleProductSlice,
  newProducts: newProductsSlice,
  promotionProducts: promotionProductsSlice,
  storesToFollow: storeToFollowSLice,
  userLogged: userSlice,
  authUser: authUserSlice,
  cart: cartSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart', 'authUser'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
