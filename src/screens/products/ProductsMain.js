import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../../Constants/Colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Carasoul from '../../../components/Carasoul';
import CategoryCard from '../../../components/CategoryCard';
import ProductCard from '../../../components/ProductCard';
import StoreCard from '../../../components/StoreCard';
import PRODUCTS from '../../../data/ProductsList';
import {useNavigation} from '@react-navigation/native';
import {getUser} from '../../../redux/userSlice';
import {getStores} from '../../../redux/storesSlice';
import {getProducts} from '../../../redux/productSlice';
import {getNewProducts} from '../../../redux/newProductsSlice';
import notifee from '@notifee/react-native';
import RNBootSplash from 'react-native-bootsplash';

// import {API, graphqlOperation} from 'aws-amplify';
// import {productByDate} from '../../graphql/queries';
const ProductsMain = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Products = useSelector(state => state.products.data);
  const newProductData = useSelector(state => state.newProducts.data);
  const loggedUser = useSelector(state => state.authUser.authenticated);
  const stores = useSelector(state => state.stores.data);
  RNBootSplash.hide();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getNewProducts());
    dispatch(getUser(loggedUser));
    dispatch(getStores());
  }, []);

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  // if (!Products) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{height: 75, backgroundColor: Colors.primary}}>
        <Pressable
          onPress={() => {
            onDisplayNotification();
            // navigation.navigate('Browse');
          }}
          style={{
            backgroundColor: Colors.accent,
            borderRadius: 15,
            marginHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <EvilIcons name="search" size={25} color={Colors.primary} />
          <Text style={{marginLeft: 5, paddingVertical: 15}}>
            Search Product
          </Text>
        </Pressable>
      </View>
      <Carasoul />
      <CategoryCard />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 5,
          padding: 10,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>New Procusts</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('NewProducts');
          }}
          style={{
            backgroundColor: Colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 2,
            borderRadius: 15,
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
            View All
          </Text>
        </Pressable>
      </View>
      <ProductCard listProducts={newProductData} />

      <View style={{justifyContent: 'space-evenly', height: 450}}>
        <View
          style={{
            backgroundColor: Colors.primary,
            height: '50%',
            // borderColor: 'yellow',
            // borderWidth: 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 5,
              marginTop: 20,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
              Store to Follow
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('Stores');
              }}
              style={{
                backgroundColor: Colors.accent,
                paddingHorizontal: 20,
                paddingVertical: 2,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: Colors.primary,
                }}>
                View All
              </Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            // borderColor: 'red',
            // borderWidth: 2,
            position: 'absolute',
            bottom: 15,
          }}>
          <FlatList
            data={stores}
            horizontal
            renderItem={({item}) => {
              return (
                <StoreCard id={item.id} title={item.title} image={item.image} />
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ProductsMain;
