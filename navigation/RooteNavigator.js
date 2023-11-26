import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Home from '../src/screens/Home';
// import SignIn from '../src/screens/userAuth/SignIn';
// import SignUp from '../src/screens/userAuth/SignUp';
import ConfirmSignUp from '../src/screens/userAuth/ConfirmSignUp';
import CreateStore from '../src/screens/merchantAuth/CreateStore';
import ProductsMain from '../src/screens/products/ProductsMain';
// import {NavigationContainer} from '@react-navigation/native';
import {Text, View, StyleSheet, TextInput, Pressable} from 'react-native';
import Colors from '../Constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Browse from '../src/screens/products/Browse';
import Store from '../src/screens/merchantAuth/Store';
import OrderHistory from '../src/screens/userAuth/OrderHistory';
import Profile from '../src/screens/userAuth/Profile';
import CategoryList from '../src/screens/landingScreens/CategoryList';
import ProductDetails from '../src/screens/products/ProductDetails';
import NewProducts from '../src/screens/products/NewProducts';
import StoreToFollow from '../src/screens/userAuth/StoreToFollow';
import WishList from '../src/screens/userAuth/WishList';
import Cart from '../src/screens/userAuth/Cart';
import Stores from '../src/screens/merchantAuth/Stores';
import Payment from '../src/screens/userAuth/Payment';
import AddNewAddress from '../src/screens/userAuth/AddNewAddress';
import AddCard from '../src/screens/userAuth/AddCard';
import OrderDetails from '../src/screens/userAuth/OrderDetails';
import AddProduct from '../src/screens/products/AddProduct';
import {Auth, Hub} from 'aws-amplify';
import {ActivityIndicator} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {getAuthUser} from '../redux/authUserSlice';
import {getUser} from '../redux/userSlice';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'ProductsMain') {
            iconName = focused ? 'home' : 'home-outline';
          }
          if (route.name === 'Browse') {
            iconName = focused ? 'search' : 'search-outline';
          }
          if (route.name === 'Store') {
            iconName = focused ? 'basket' : 'basket-outline';
          }
          if (route.name === 'OrderHistory') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          }
          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#888',
      })}>
      <Tab.Screen
        name="ProductsMain"
        component={ProductsMain}
        options={({navigation}) => ({
          headerRight: () => (
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <Pressable
                onPress={() => {
                  navigation.navigate('WishList');
                }}>
                <FontAwesome
                  style={styles.cartIcon}
                  name="heart"
                  size={25}
                  color={Colors.accent}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate('Cart');
                }}>
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.accent}
                />
              </Pressable>
            </View>
          ),
          title: 'Home',
          headerTitleAlign: 'left',
          headerTintColor: Colors.accent,
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        })}
      />
      <Tab.Screen
        name="Browse"
        component={Browse}
        options={({navigation}) => ({
          headerRight: () => (
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <Pressable
                onPress={() => {
                  navigation.navigate('WishList');
                }}>
                <FontAwesome
                  style={styles.cartIcon}
                  name="heart"
                  size={25}
                  color={Colors.accent}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate('Cart');
                }}>
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.accent}
                />
              </Pressable>
            </View>
          ),
          title: 'Browse',
          headerTitleAlign: 'left',
          headerTintColor: Colors.accent,
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        })}
      />
      <Tab.Screen
        name="Store"
        component={Store}
        options={({navigation}) => ({
          headerRight: () => (
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <Pressable
                onPress={() => {
                  navigation.navigate('WishList');
                }}>
                <FontAwesome
                  style={styles.cartIcon}
                  name="heart"
                  size={25}
                  color={Colors.accent}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate('Cart');
                }}>
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.accent}
                />
              </Pressable>
            </View>
          ),
          title: 'My Store',
          headerTitleAlign: 'center',
          headerTintColor: Colors.accent,
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        })}
      />

      <Tab.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={({navigation}) => ({
          headerRight: () => (
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <Pressable
                onPress={() => {
                  navigation.navigate('WishList');
                }}>
                <FontAwesome
                  style={styles.cartIcon}
                  name="heart"
                  size={25}
                  color={Colors.accent}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate('Cart');
                }}>
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.accent}
                />
              </Pressable>
            </View>
          ),
          title: 'My Orders',
          headerTitleAlign: 'left',
          headerTintColor: Colors.accent,
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({navigation}) => ({
          headerRight: () => (
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <Pressable
                onPress={() => {
                  navigation.navigate('WishList');
                }}>
                <FontAwesome
                  style={styles.cartIcon}
                  name="heart"
                  size={25}
                  color={Colors.accent}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate('Cart');
                }}>
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.accent}
                />
              </Pressable>
            </View>
          ),
          title: 'Profile',
          headerTitleAlign: 'left',
          headerTintColor: Colors.accent,
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        })}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

function RooteNavigator() {
  // const dispatch = useDispatch();
  // const user = useSelector(state => state.authUser.authenticated);
  // console.log('00000000', user);

  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="StoreToFollow"
        component={StoreToFollow}
        options={({route, navigation: {goBack}}) => ({
          title: route.params.storeTitle,
          headerTintColor: Colors.accent,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 25,
          },
          header: ({navigation}) => (
            <View
              style={{
                height: 50,
                backgroundColor: Colors.primary,
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingTop: 10,
                paddingLeft: 5,
                paddingRight: 5,
              }}>
              <Pressable onPress={() => goBack()}>
                <Ionicons name="arrow-back" size={25} color="white" />
              </Pressable>
              <Text
                style={{
                  color: Colors.accent,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                {route.params.storeTitle}
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('Browse');
                }}>
                <Ionicons name="search" size={25} color="white" />
              </Pressable>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={({route}) => ({
          title: route.params.title,
          headerTitleAlign: 'center',
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        })}
      />
      <Stack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WishList"
        component={WishList}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="AddNewAddress"
        component={AddNewAddress}
        options={{
          title: 'Add New Address',
          headerTitleAlign: 'center',
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="Stores"
        component={Stores}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: 'My Cart',
          headerTitleAlign: 'center',
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="CreateStore"
        component={CreateStore}
        options={{
          title: 'My Store',
          headerTitleAlign: 'center',
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          title: 'Payment Options',
          headerTitleAlign: 'center',
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="NewProducts"
        component={NewProducts}
        options={({navigation}) => ({
          headerRight: () => (
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <Pressable
                onPress={() => {
                  navigation.navigate('WishList');
                }}>
                <FontAwesome
                  style={styles.cartIcon}
                  name="heart"
                  size={25}
                  color={Colors.accent}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate('Cart');
                }}>
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.accent}
                />
              </Pressable>
            </View>
          ),
          title: 'New Products',
          headerTitleAlign: 'left',
          headerTintColor: Colors.accent,
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        })}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        /> */}
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          title: 'Order Details',
          headerTitleAlign: 'center',
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={{
          title: 'Add Card',
          headerTitleAlign: 'center',
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        options={({route}) => ({
          title: route.params.title,
          headerTintColor: Colors.accent,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        })}
        name="CategoryList"
        component={CategoryList}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  cartIcon: {
    paddingRight: 20,
  },
});
export default RooteNavigator;
