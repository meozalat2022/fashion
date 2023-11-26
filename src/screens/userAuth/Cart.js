//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import CartItem from '../../../components/CartItem';
import Colors from '../../../Constants/Colors';
import PRODUCTS from '../../../data/ProductsList';
import {useNavigation} from '@react-navigation/native';
import {clear} from '../../../redux/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
// import {DataStore} from 'aws-amplify';
import {Cart as shoppingCart} from '../../models';
import firestore from '@react-native-firebase/firestore';

// create a component
const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loggedUser = useSelector(state => state.authUser.authenticated);
  const cartProducts = useSelector(state => state.cart);
  const [cartProds, setCartProds] = useState(cartProducts);
  // useEffect(() => {
  //   dispatch(getCart(loggedUser));
  // }, [cartItemDelete]);
  // console.log('cart products', cartProducts);
  // useEffect(() => {
  //   const subscriptions = cartProducts.map(cp =>
  //     DataStore.observe(shoppingCart, cp.id).subscribe(msg => {
  //       if (msg.opType === 'UPDATE') {
  //         setCartProds(curCartProduct =>
  //           curCartProduct.map(cp => {
  //             if (cp.id !== msg.element.id) {
  //               return cp;
  //             }
  //             return {
  //               ...cp,
  //               ...msg.element,
  //             };
  //           }),
  //         );
  //       }
  //     }),
  //   );
  //   return () => {
  //     subscriptions.forEach(sub => sub.unsubscribe());
  //   };
  // }, [cartProducts, cartItemDelete]);

  const totalPrice = cartProducts.reduce(
    (summedPrice, product) =>
      summedPrice +
      (product.offerPrice ? product?.offerPrice || 0 : product?.price || 0) *
        product.quantity,
    0,
  );

  // const cartItemDelete = async id => {
  //   console.log('item id', id);
  //   await firestore()
  //     .collection('Cart')
  //     .doc(id)
  //     .delete()
  //     .then(() => {
  //       console.log('Cart Item deleted!');
  //     });
  //   // const toDelete = await DataStore.query(shoppingCart, id);
  //   // DataStore.delete(toDelete);
  // };

  if (!cartProducts) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('AddNewAddress');
        }}
        style={{
          width: '100%',
          backgroundColor: Colors.accent,
          paddingVertical: 25,
          alignItems: 'center',
          marginBottom: 5,
        }}>
        <Text style={{fontSize: 16}}>+ Add New Address</Text>
      </Pressable>
      <FlatList
        data={cartProducts}
        renderItem={({item}) => {
          return (
            <>
              <CartItem
                title={item.title}
                image={item.image}
                offerPrice={item.offerPrice}
                price={item.price}
                productId={item.id}
                quantity={item.quantity}
              />
              <TouchableOpacity
                onPress={() => {
                  dispatch(clear(item.id));
                }}
                style={{
                  backgroundColor: Colors.accent,
                  width: '100%',
                  padding: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <Text>Remove</Text>
              </TouchableOpacity>
            </>
          );
        }}
      />
      <View
        style={{
          width: '100%',
          backgroundColor: Colors.accent,
          paddingVertical: 25,
          //   alignItems: 'center',
          marginTop: 10,
          //   flexDirection: 'row',

          paddingHorizontal: 15,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Total Items</Text>
          <Text style={{fontSize: 16}}>{cartProducts.length}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
          }}>
          <Text style={{fontSize: 16}}>Total Price</Text>
          <Text style={{fontSize: 16}}>{totalPrice}</Text>
        </View>
        <View></View>
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate('Payment', {
            orderPrice: totalPrice,
            totalItems: cartProducts.length,
          });
        }}
        style={{
          width: '80%',
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 15,
          backgroundColor: Colors.primary,
          paddingVertical: 15,
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={{fontSize: 16, color: Colors.accent}}>
          Continue to Check out
        </Text>
      </Pressable>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

//make this component available to the app
export default Cart;
