import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import {Category} from '../src/models';
// import {DataStore} from 'aws-amplify';
// import {API} from 'aws-amplify';
// import {listCategories} from '../src/graphql/queries';
import firestore from '@react-native-firebase/firestore';
const initialState = {
  data: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,

  extraReducers: builder => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

// export const {fetchCategory} = categorySlice.actions;
export default categorySlice.reducer;

// export function getCategory() {
//   return async function getCategoryThunk(dispatch, getState) {
//     try {
//       const categoriesData = await DataStore.query(Category);
//       dispatch(fetchCategory(categoriesData));
//     } catch (error) {
//       console.log('error', error);
//     }
//   };
// }

export const getCategory = createAsyncThunk('categories/get', async () => {
  try {
    const catList = [];
    await firestore()
      .collection('Categories')
      .orderBy('sort', 'asc')
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(doc => {
          const {title, image} = doc.data();
          catList.push({id: doc.id, title, image});
        });
      });
    return catList;
  } catch (error) {}
  // try {
  //   // const categoriesData = await DataStore.query(Category);
  //   const categoriesData = await API.graphql({query: listCategories});
  //   return categoriesData.data.listCategories.items;
  // } catch (error) {
  //   console.log('error', error);
  // }
});
