//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import Card from '../../../components/Card';
import {useSelector, useDispatch} from 'react-redux';
import {Store, UserStore} from '../../models';
// import {DataStore} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';
import {getStoreToFOllow} from '../../../redux/storesFollowSlice';
import firestore from '@react-native-firebase/firestore';

// create a component
const StoreToFollow = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const storeId = route.params.storeId;
  const [storFollowers, setStoreFollowers] = useState(0);

  const storeProducts = useSelector(state => state.storesToFollow.data);
  // const loggedUser = useSelector(state => state.userLogged.data);

  const selectedStore = useSelector(state =>
    state.stores.data.filter(item => item.id === storeId),
  );
  useEffect(() => {
    const followers = async () => {
      const storesListData = [];
      try {
        await firestore()
          .collection('User')
          .where('storesList', 'array-contains', route.params.storeId)
          .get()
          .then(querySnapShot => {
            querySnapShot.forEach(doc => {
              const {title} = doc.data();
              storesListData.push({title});
            });
          });
        setStoreFollowers(storesListData.length);
      } catch (error) {
        console.log('Error', error);
      }
    };
    followers();
  }, []);
  useEffect(() => {
    dispatch(getStoreToFOllow(storeId));
    // const fetchStoreProducts = async () => {
    //   const store = await DataStore.query(Store, storeId);
    //   const products = await store.storeProducts.toArray();
    //   setStoreProducts(products);
    // };
    // fetchStoreProducts();
  }, []);

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

  if (!selectedStore && !storeProducts) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          height: '20%',
          backgroundColor: Colors.accent,
          borderRadius: 10,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              resizeMode="contain"
              style={{
                width: 75,
                height: 75,
                borderRadius: 75 / 2,
                overflow: 'hidden',
                marginRight: 20,
              }}
              source={{uri: selectedStore[0].image}}
            />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 15}}>{selectedStore[0].title}</Text>
              {/* <Text>{selectedStore[0].type}</Text> */}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              addToFollowingStores(selectedStore[0].id);
            }}
            style={{
              backgroundColor: Colors.primary,
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: Colors.accent}}>Follow</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{textAlign: 'center'}}>
            {selectedStore[0].description}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('OrderHistory');
        }}
        style={{
          backgroundColor: Colors.primary,
          paddingHorizontal: 15,
          paddingVertical: 5,
          borderRadius: 10,
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          marginBottom: 5,

          width: '50%',
        }}>
        <Text style={{color: Colors.accent}}>Store Orders</Text>
      </TouchableOpacity>
      <View
        style={{
          height: '10%',
          backgroundColor: Colors.accent,
          marginBottom: 10,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          //   alignItems: 'center'
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>Products</Text>
          <Text>{storeProducts?.length}</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>Followers</Text>
          <Text>{storFollowers}</Text>
        </View>
      </View>
      <View
        style={{
          height: '5%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingHorizontal: 10,
        }}>
        {selectedStore[0].type.map(item => {
          return (
            <View
              style={{
                backgroundColor: Colors.primary,
                paddingHorizontal: 5,
                paddingVertical: 5,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                // marginHorizontal: 2,
              }}>
              <Text style={{color: Colors.accent}}>{item}</Text>
            </View>
          );
        })}
      </View>
      <View
        style={{
          height: '65%',
          alignItems: 'center',
          marginBottom: 10,
          marginTop: 10,
          paddingBottom: 75,
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={storeProducts}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() =>
                  navigation.navigate('ProductDetails', {productId: item.id})
                }>
                <Card
                  title={item.title}
                  image={item.image}
                  storeImage={item.storeImage}
                  storeName={item.storeName}
                  price={item.price}
                />
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default StoreToFollow;
