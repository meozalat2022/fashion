//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Share,
  Alert,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {getProducts} from '../../../redux/productSlice';
import firestore from '@react-native-firebase/firestore';
import {addToWishList} from '../../../redux/addItemsToWishList';
import {addToStoresList} from '../../../redux/followingStores';
import {addToCart} from '../../../redux/cartSlice';

// import {Product, Store, UserStore, UserProduct, Cart} from '../../models';
// import {DataStore} from 'aws-amplify';

// create a component
const ProductDetails = ({route, navigation: {goBack}}) => {
  // const product = PRODUCTS.filter(item => item.id === route.params.productId);
  // const selectedItem = product[0];
  // const category = CATEGORY.filter(item => item.id === selectedItem.categoryId);
  const dispatch = useDispatch();
  const selectedItem = useSelector(state =>
    state.products.data.filter(item => item.id === route?.params?.productId),
  );
  const loggedUser = useSelector(state => state.authUser.authenticated);
  console.log(loggedUser);
  const userInfo = useSelector(state => state.userLogged.data);
  const storeData = useSelector(state =>
    state.stores.data.filter(item => item.id === selectedItem[0].storeID),
  );
  const selectedCateg = useSelector(state =>
    state.category.data.filter(item => item.id === selectedItem[0].categoryID),
  );
  // console.log(selectedCateg[0].title);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // const addToWishList = async proId => {
  //   await firestore()
  //     .collection('User')
  //     .doc(loggedUser)
  //     .update({
  //       wishList: firestore.FieldValue.arrayUnion(proId),
  //     });
  // };

  // const addToFollowingStores = async stoId => {
  //   const storeExits = await DataStore.query(Store, u =>
  //     u.users.user.id.eq(loggedUser[0].id),
  //   );
  //   const foundStore = storeExits.find(item => item.id === stoId);
  //   if (foundStore) {
  //     return;
  //   } else {
  //     await DataStore.save(
  //       new UserStore({
  //         userId: loggedUser[0].id,
  //         storeId: stoId,
  //       }),
  //     );
  //   }
  // };

  // const onAddToCart = async () => {
  //   try {
  //     await firestore().collection('Cart').add({
  //       productId: selectedItem[0].id,
  //       productImage: selectedItem[0]?.image[0],
  //       productPrice: selectedItem[0].price,
  //       productOfferPrice: selectedItem[0].offerPrice,
  //       productTitle: selectedItem[0].title,
  //       userId: loggedUser,
  //       quantity: 1,
  //     });
  //   } catch (error) {
  //     console.log('Error', error);
  //   }
  //   const productExist = await DataStore.query(Cart);
  //   const productFound = productExist.find(
  //     item =>
  //       item.cartProductId === selectedItem[0].id &&
  //       item.cartUserId === loggedUser[0].id,
  //   );
  //   // console.log('123456', productFound);
  //   if (productFound) {
  //     return;
  //   } else {
  //     await DataStore.save(
  //       new Cart({
  //         quantity: 1,
  //         cartUserId: loggedUser[0].id,
  //         cartProductId: selectedItem[0].id,
  //       }),
  //     );
  //   }
  // };

  if (!selectedItem) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{width: '100%'}}>
        <Image
          style={{width: '100%', aspectRatio: 4 / 3}}
          source={{uri: selectedItem[0]?.image[0]}}
        />
      </View>
      <View
        style={{
          marginBottom: 7,
          backgroundColor: Colors.accent,
          height: 100,
          justifyContent: 'space-around',
          paddingHorizontal: 10,
        }}>
        <Text>{selectedItem[0].title}</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginHorizontal: 10}}>
            {selectedItem[0].offerPrice && (
              <Text
                style={{
                  color: Colors.primary,
                  fontWeight: '500',
                  fontSize: 15,
                }}>
                $ {selectedItem[0].offerPrice}
              </Text>
            )}
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                marginHorizontal: 5,
                textDecorationLine: selectedItem[0].offerPrice
                  ? 'line-through'
                  : 'none',
                fontWeight: '500',
                fontSize: 15,
                color: 'black',
              }}>
              $ {selectedItem[0].price}
            </Text>
            {selectedItem[0].offerPrice && (
              <Text style={{fontWeight: '500', fontSize: 15, color: 'black'}}>
                {(
                  ((selectedItem[0].price - selectedItem[0].offerPrice) /
                    selectedItem[0].price) *
                  100
                ).toFixed(0)}
                % off
              </Text>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 15,
          left: 10,
          justifyContent: 'space-between',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Pressable onPress={() => goBack()} style={styles.iconView}>
          <Ionicons name="arrow-back" size={25} color="white" />
        </Pressable>
        <View style={{flexDirection: 'row', marginHorizontal: 15}}>
          <Pressable onPress={onShare} style={styles.iconView}>
            <Ionicons name="share-social-sharp" size={25} color="white" />
          </Pressable>
          <Pressable
            onPress={() => addToWishList(loggedUser, selectedItem[0].id)}
            style={styles.iconView}>
            <Ionicons name="heart" size={25} color="white" />
          </Pressable>
          {/* <Pressable style={styles.iconView}>
            <Ionicons name="ellipsis-vertical" size={25} color="white" />
          </Pressable> */}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: 75,
          backgroundColor: Colors.accent,
          marginBottom: 7,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 40 / 2,
              marginHorizontal: 5,
            }}
            source={{uri: storeData[0]?.image}}
          />
          <Text style={{fontSize: 18, fontWeight: '500'}}>
            {storeData[0].title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            addToStoresList(loggedUser, storeData[0].id);
          }}
          style={{
            paddingHorizontal: 30,
            paddingVertical: 5,
            backgroundColor: Colors.primary,
            borderRadius: 20,
          }}>
          <Text
            style={{
              color: Colors.accent,
              fontSize: 15,
              fontWeight: '400',
              textAlign: 'center',
            }}>
            Follow
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: Colors.accent,
          width: '100%',
          // height: '100%',
          alignItems: 'center',
          paddingTop: 20,
        }}>
        <Text>{selectedItem[0].description}</Text>
        <TouchableOpacity
          onPress={() => dispatch(addToCart(selectedItem[0]))}
          style={{
            backgroundColor: Colors.primary,
            paddingHorizontal: 120,
            paddingVertical: 15,
            borderRadius: 20,
            marginTop: 20,
          }}>
          <Text
            style={{
              color: Colors.accent,
              fontSize: 20,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Add to Cart
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: '40%',
            backgroundColor: 'grey',
            height: 5,
            marginTop: 20,
            borderRadius: 20,
            marginVertical: 10,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: Colors.accent,
          marginBottom: 7,
          paddingLeft: 30,
          paddingRight: 30,
          paddingBottom: 10,
        }}>
        <View style={styles.productConditions}>
          <View style={{width: '40%'}}>
            <Text style={styles.productConditionText}>Category</Text>
          </View>
          <View>
            <Text style={styles.productConditionText}>
              {selectedCateg[0].title}
            </Text>
          </View>
        </View>
        <View style={styles.productConditions}>
          <View style={{width: '40%'}}>
            <Text style={styles.productConditionText}>Location</Text>
          </View>
          <View>
            <Text style={styles.productConditionText}>
              {selectedItem[0].location}
            </Text>
          </View>
        </View>
      </View>
      <View style={{backgroundColor: Colors.accent, height: '100%'}}>
        <View style={{marginLeft: 20, marginTop: 5}}>
          <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
            Addition details
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            marginTop: 20,
            marginBottom: 10,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{fontSize: 15, fontWeight: '400', textAlign: 'center'}}>
              Delivery Details:{' '}
            </Text>
          </View>
          <View style={{width: '75%', paddingEnd: 20}}>
            <Text umberOfLines={2} style={{textAlign: 'center'}}>
              {selectedItem[0].additionalDetails}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  iconView: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  productConditions: {flexDirection: 'row', alignItems: 'center'},
  productConditionText: {
    marginHorizontal: 12,
    fontSize: 18,
    fontWeight: '300',
    // textAlign: 'center',
  },
});

//make this component available to the app
export default ProductDetails;
