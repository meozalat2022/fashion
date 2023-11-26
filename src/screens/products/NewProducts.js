//import liraries
import React, {useEffect} from 'react';
//import liraries
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useSelector, useDispatch} from 'react-redux';
import Card from '../../../components/Card';
import {useNavigation} from '@react-navigation/native';
import {getNewProducts} from '../../../redux/newProductsSlice';
// create a component
const NewProducts = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Products = useSelector(state => state.newProducts.data);

  useEffect(() => {
    dispatch(getNewProducts());
  }, []);

  if (!Products) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View>
      <View style={{height: 65, backgroundColor: Colors.primary}}>
        <View
          style={{
            backgroundColor: Colors.accent,
            borderRadius: 15,
            marginHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <EvilIcons name="search" size={25} color={Colors.primary} />
          <TextInput style={{marginLeft: 5}} placeholder="Search Product" />
        </View>
      </View>

      <FlatList
        numColumns={2}
        data={Products}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProductDetails', {productId: item.id});
              }}
              style={{flex: 1, alignItems: 'center'}}>
              <Card
                title={item.title}
                image={item.image}
                storeImage={item.storeImage}
                storeName={item.storeName}
                price={item.price}
              />
            </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  sort: {
    backgroundColor: Colors.primary,
    paddingVertical: 25,
    flexDirection: 'row',
    width: '100%',
    // marginHorizontal: 10,
    justifyContent: 'center',
  },
  sortText: {
    // textAlign: 'center',
    color: Colors.accent,
    marginHorizontal: 10,
  },
  sortitem: {
    flexDirection: 'row',
    flex: 1,
    borderColor: Colors.accent,
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
});

//make this component available to the app
export default NewProducts;
