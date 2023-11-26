//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../Constants/Colors';
// import {SelectCountry} from 'react-native-element-dropdown';
// import {Cart} from '../src/models';
import {increment, decrement} from '../redux/cartSlice';
import {useDispatch} from 'react-redux';
// create a component
const CartItem = props => {
  const dispatch = useDispatch();
  const [newQuantity, setNewQuantity] = useState(props.quantity);

  // useEffect(() => {
  //   const updateCart = async () => {
  //     const existsCartProduct = await DataStore.query(Cart, c =>
  //       c.cartProductId.eq(props.productId),
  //     );

  //     await DataStore.save(
  //       Cart.copyOf(existsCartProduct[0], updated => {
  //         updated.quantity = +newQuantity;
  //       }),
  //     );
  //   };
  //   updateCart();
  // }, [newQuantity]);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          //   marginBottom: 50,
          width: '100%',
          backgroundColor: Colors.accent,
          alignItems: 'center',
        }}>
        <View style={{marginRight: 15, marginLeft: 10, marginTop: 2}}>
          <Image
            resizeMode="contain"
            style={{
              width: 150,
              height: 150,
              borderWidth: 1,
              borderRadius: 15,
              borderColor: 'grey',
            }}
            source={{
              uri: props.image[0],
            }}
          />
        </View>
        <View>
          <Text style={{marginBottom: 7, fontSize: 15}}>{props.title}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                marginBottom: 5,
                fontSize: 15,
                color: Colors.primary,
                marginRight: 15,
              }}>
              {!props.offerPrice ? props.price : props.offerPrice} $
            </Text>
            <Text
              style={{
                marginBottom: 5,
                fontSize: 15,
                marginRight: 5,
                textDecorationLine: 'line-through',
              }}>
              {props.offerPrice && props.price + '$'}
            </Text>
            {props.offerPrice && (
              <Text>
                {(
                  ((props.price - props.offerPrice) / props.price) *
                  100
                ).toFixed(0)}{' '}
                %off
              </Text>
            )}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Qty: </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(decrement(props.productId));
              }}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  paddingHorizontal: 10,
                }}>
                -
              </Text>
            </TouchableOpacity>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              {props.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => dispatch(increment(props.productId))}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  paddingHorizontal: 10,
                }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  dropdown: {
    // margin: 16,
    height: 50,
    width: 60,
    // backgroundColor: '#EEEEEE',
    // borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

//make this component available to the app
export default CartItem;
