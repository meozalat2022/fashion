//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CartItem from '../../../components/CartItem';
import Colors from '../../../Constants/Colors';
import PRODUCTS from '../../../data/ProductsList';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import moment from 'moment';

// create a component
const OrderDetails = ({route}) => {
  const [orderState, setOrderState] = useState(4);
  const [orderProducts, setOrderProducts] = useState('');
  const navigation = useNavigation();
  const loggedUser = useSelector(state => state.authUser.authenticated);
  useEffect(() => {
    const fetchOrder = async () => {
      await firestore()
        .collection('Orders')
        .doc(route?.params?.orderId)
        .get()
        .then(snapShot => {
          const orderProductsData = snapShot.data();
          setOrderProducts(orderProductsData);
        });
    };
    fetchOrder();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          width: '100%',
          height: 150,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#D4D4D4',
          marginBottom: 10,
        }}>
        <Image
          style={{width: 200, height: 100, marginBottom: 15}}
          source={require('../../../assets/images/Thanks_for_your_order.png')}
        />
        <Text style={{color: 'black', fontSize: 20, fontWeight: '500'}}>
          Thanks for Your Order
        </Text>
      </View>
      <View style={{height: 200}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={orderProducts.items}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  marginHorizontal: 5,
                  //   marginBottom: 50,
                  // width: '100%',
                  backgroundColor: Colors.accent,
                  alignItems: 'center',
                  borderRadius: 15,
                  paddingHorizontal: 10,
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
                      uri: item.image,
                    }}
                  />
                </View>
                <View>
                  <Text style={{marginBottom: 7, fontSize: 15}}>
                    {item.title}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        marginBottom: 5,
                        fontSize: 15,
                        color: Colors.primary,
                        marginRight: 15,
                      }}>
                      {item.price} $
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Qty: </Text>
                    <Text style={{fontSize: 20, textAlign: 'center'}}>
                      {item.quantity}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View style={{height: 250, backgroundColor: Colors.accent, marginTop: 5}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            paddingHorizontal: 10,
            paddingTop: 5,
          }}>
          Track order
        </Text>
        <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Order ID - </Text>
          <Text>{route?.params?.orderId}</Text>
        </View>
        <View
          style={{
            width: '20%',
            backgroundColor: Colors.primary,
            height: 5,
            borderRadius: 20,
            marginLeft: 10,
            marginBottom: 5,
            // paddingHorizontal: 10,
            // marginVertical: 10,
          }}
        />

        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: '10%',
              // borderColor: 'red',
              // borderWidth: 1,
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10 / 2,
                backgroundColor: orderState >= 1 ? Colors.primary : 'grey',
              }}
            />
            <View
              style={{
                height: 30,
                width: 5,
                backgroundColor: orderState > 1 ? Colors.primary : 'grey',
              }}
            />
          </View>
          <View style={{width: '90%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text>Order Placed</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text>{moment(orderProducts.createdAt).format('lll')}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: '10%',
              // borderColor: 'red',
              // borderWidth: 1,
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10 / 2,
                backgroundColor: orderState >= 2 ? Colors.primary : 'grey',
              }}
            />
            <View
              style={{
                height: 30,
                width: 5,
                backgroundColor: orderState > 2 ? Colors.primary : 'grey',
              }}
            />
          </View>
          <View style={{width: '90%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text>Processed</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text>{moment(orderProducts.createdAt).format('lll')}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: '10%',
              // borderColor: 'red',
              // borderWidth: 1,
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10 / 2,
                backgroundColor: orderState >= 3 ? Colors.primary : 'grey',
              }}
            />
            <View
              style={{
                height: 30,
                width: 5,
                backgroundColor: orderState > 3 ? Colors.primary : 'grey',
              }}
            />
          </View>
          <View style={{width: '90%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text>Out for Delivery</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text>{moment(orderProducts.createdAt).format('lll')}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: '10%',
              // borderColor: 'red',
              // borderWidth: 1,
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10 / 2,
                backgroundColor: orderState === 4 ? Colors.primary : 'grey',
              }}
            />
            {/* <View
              style={{height: 30, width: 5, backgroundColor: Colors.primary}}
            /> */}
          </View>
          <View style={{width: '90%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text>Delivered</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text>{moment(orderProducts.createdAt).format('lll')}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 30,
          backgroundColor: Colors.accent,
          paddingHorizontal: 10,
          marginTop: 5,
          justifyContent: 'center',
        }}>
        <Text>Delivery Address</Text>
      </View>
      <View
        style={{
          height: 50,
          backgroundColor: Colors.accent,
          paddingHorizontal: 10,
          marginTop: 5,
          justifyContent: 'center',
        }}>
        <Text>Store Name</Text>
        <Text>Customer Address</Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate('ProductsMain')}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Back to Home
        </Text>
      </Pressable>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
export default OrderDetails;
