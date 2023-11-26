//import liraries
import React, {useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Colors from '../../../Constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {clearCart} from '../../../redux/cartSlice';

// create a component
const Payment = ({route}) => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState('Debit');
  const dispatch = useDispatch();

  const user = useSelector(state => state.userLogged.data);
  const loggedUser = useSelector(state => state.authUser.authenticated);
  const cartProducts = useSelector(state => state.cart);
  const orderProducts = [];
  for (const key in cartProducts) {
    orderProducts.push({
      title: cartProducts[key].title,
      price: !cartProducts[key].OfferPrice
        ? cartProducts[key].price
        : cartProducts[key].OfferPrice,
      image: cartProducts[key].image[0],
      quantity: cartProducts[key].quantity,
    });
  }
  const placeOrder = async () => {
    let orderId;
    const doc = await firestore().collection('Orders').add({
      totalPrice: route?.params?.orderPrice,
      userId: loggedUser,
      createdAt: firestore.FieldValue.serverTimestamp(),
      items: orderProducts,
    });
    console.log('order id', doc.id);
    orderId = doc.id;
    navigation.navigate('OrderDetails', {orderId});

    dispatch(clearCart());
    // const orderId = doc.id;
    // for (const key in cartProducts) {
    //   doc = await firestore()
    //     .collection('Orders')
    //     .doc(orderId)
    //     .collection('Products')
    //     .add({
    //       productTitle: cartProducts[key].title,
    //       productImage: cartProducts[key].image[0],
    //       productQuantity: cartProducts[key].quantity,
    //       productPrice: cartProducts[key].price,
    //       productOfferPrice: cartProducts[key].offerPrice,
    //     });
    //   console.log(doc);
    // }
  };
  if (!user) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          width: '100%',
          backgroundColor: Colors.accent,
          height: 200,
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          onPress={() => navigation.navigate('AddCard')}
          style={{
            width: '80%',
            borderColor: 'grey',
            borderWidth: 1,
            height: 150,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            borderStyle: 'dashed',
          }}>
          <AntDesign
            style={styles.cartIcon}
            name="plus"
            size={35}
            color="#D3D3D3"
          />
          <Text style={{marginTop: 15, color: '#D3D3D3'}}>
            Add New Payment Method
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          backgroundColor: Colors.accent,
          // justifyContent: 'space-evenly',
          marginTop: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <RadioButton
            color={Colors.primary}
            value="Debit"
            status={checked === 'Debit' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Debit')}
          />
          <Text style={{fontSize: 20, fontWeight: '600'}}>
            Debit / Credit Card
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: '#C5C5C5',
            height: 0.5,
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <RadioButton
            color={Colors.primary}
            value="Cash"
            status={checked === 'Cash' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Cash')}
          />
          <Text style={{fontSize: 20, fontWeight: '600'}}>
            Cash on Delivery
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: '#C5C5C5',
            height: 0.5,
            alignSelf: 'center',
          }}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          height: 100,
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          alignItems: 'center',
          backgroundColor: Colors.accent,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text>
            {!user[0]?.address
              ? 'NO address found'
              : user[0]?.address?.StreetAddress}
          </Text>
          <Text style={{marginTop: 5}}>
            {!user[0]?.address ? 'NO address found' : user[0]?.address.City}
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('AddNewAddress')}
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 20,
            paddingHorizontal: 25,
            paddingVertical: 5,
          }}>
          <Text style={{color: Colors.accent, fontSize: 15}}>
            {!user[0]?.address ? 'Add Delivery Address' : 'Change'}
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          marginTop: 10,
          backgroundColor: Colors.accent,
          paddingVertical: 15,
          paddingLeft: 5,
        }}>
        <Text style={{fontSize: 16}}>Price Details</Text>
      </View>
      <View
        style={{
          backgroundColor: Colors.accent,
          justifyContent: 'space-between',
          paddingVertical: 15,
          paddingHorizontal: 5,
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: 16}}>
          Price {route?.params?.totalItems} item
        </Text>
        <Text style={{fontSize: 16}}>{route?.params?.orderPrice}</Text>
      </View>
      <View
        style={{
          marginTop: 10,
          backgroundColor: Colors.accent,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Pressable
          onPress={placeOrder}
          style={{
            // paddingBottom: 10,
            backgroundColor: Colors.primary,
            paddingHorizontal: 140,
            paddingVertical: 15,
            borderRadius: 25,
            marginBottom: 10,
            // justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{textAlign: 'center', color: Colors.accent, fontSize: 18}}>
            Check out
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default Payment;
