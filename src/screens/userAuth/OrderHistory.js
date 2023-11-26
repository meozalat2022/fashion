//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import Colors from '../../../Constants/Colors';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

// create a component

const OrderHistory = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const loggedUser = useSelector(state => state.authUser.authenticated);
  console.log(loggedUser);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = [];
        await firestore()
          .collection('Orders')
          .where('userId', '==', loggedUser)
          .get()
          .then(snapShot => {
            snapShot.forEach(doc => {
              const {totalPrice, createdAt} = doc.data();
              ordersData.push({
                orderId: doc.id,
                createdAt,
                totalPrice: totalPrice,
              });
            });
          });
        setOrders(ordersData);
      } catch (error) {
        console.log('Error', error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          backgroundColor: '#F1F6F9',
          width: '100%',
          height: '10%',
          alignItems: 'center',
        }}>
        <View style={{width: '70%'}}>
          <Text>Total Price</Text>
        </View>
        <View
          style={{
            width: '30%',
            backgroundColor: Colors.primary,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <Text style={{color: Colors.accent, fontSize: 15}}>Order Date</Text>
        </View>
      </View>
      <FlatList
        data={orders}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate('OrderDetails', {orderId: item.orderId})
              }
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: Colors.accent,
                paddingHorizontal: 10,
                marginBottom: 5,
                paddingVertical: 20,
              }}>
              <View style={{alignItems: 'center', paddingHorizontal: 10}}>
                <Text
                  style={{color: Colors.primary, paddingTop: 5, fontSize: 16}}>
                  ${item.totalPrice}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: Colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 40,
                  paddingVertical: 10,
                  borderRadius: 15,
                  //   borderColor: 'red',
                  //   borderWidth: 1
                }}>
                <Text style={{color: Colors.accent, fontSize: 16}}>
                  {moment(item.createdAt).format('ll')}
                </Text>
              </View>
            </Pressable>
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
    // marginTop: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default OrderHistory;
