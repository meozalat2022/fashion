//import liraries
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import PRODUCTS from '../../../data/ProductsList';
import Card from '../../../components/Card';
// import {DataStore} from 'aws-amplify';
// import {UserProduct} from '../../models';
// import {User, Product} from '../../models';
import {useSelector, useDispatch} from 'react-redux';
// create a component
const WishList = () => {
  const loggedUser = useSelector(state => state.userLogged.data);
  const products = useSelector(state => state.products.data);
  const userWishList = useSelector(state => state.userLogged.data);
  const wishListProducts = [];
  for (let i in userWishList[0].wishList) {
    const wishData = products.filter(
      item => item.id === userWishList[0].wishList[i],
    );
    wishListProducts.push(wishData[0]);
  }

  console.log(wishListProducts);

  // fetch single product here not in redux

  // const getProduct = async id => {
  //   const data = await DataStore.query(Product, id);
  //   wishListProducts.push(data);
  //   // console.log('123456789', data);
  // };

  // useEffect(() => {
  //   const fetchUserProducts = async () => {
  //     const productsData = await DataStore.query(UserProduct);
  //     const userProducts = productsData.filter(
  //       item => item.userId === loggedUser[0].id,
  //     );
  //     for (let i in userProducts) {
  //       getProduct(userProducts[i].productId);
  //     }
  //   };
  //   fetchUserProducts();
  // }, []);
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={wishListProducts}
        renderItem={({item}) => {
          return (
            <Card
              title={item.title}
              image={item.image}
              storeImage={item.storeImage}
              storeName={item.storeName}
              price={item.price}
            />
          );
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default WishList;
