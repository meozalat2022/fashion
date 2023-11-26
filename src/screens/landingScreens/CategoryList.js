//import liraries
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import Colors from '../../../Constants/Colors';
import PRODUCTS from '../../../data/ProductsList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Card from '../../../components/Card';
import {useSelector, useDispatch} from 'react-redux';
import {getProducts} from '../../../redux/productSlice';
import {useNavigation} from '@react-navigation/native';
// create a component
const CategoryList = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const id = route.params.id;
  const Products = useSelector(state =>
    state.products.data.filter(item => item.categoryID === id),
  );

  // const products = PRODUCTS.filter(item => item.categoryId === id);

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <View style={styles.container}>
      {/* <View style={styles.sort}>
        <View style={styles.sortitem}>
          <FontAwesome name="sort-amount-asc" size={25} color={Colors.accent} />
          <Text style={styles.sortText}>Sort</Text>
        </View>
        <View style={styles.sortitem}>
          <EvilIcons name="location" size={20} color={Colors.accent} />
          <Text style={styles.sortText}>Location</Text>
        </View>
        <View style={styles.sortitem}>
          <FontAwesome name="list" size={20} color={Colors.accent} />
          <Text style={styles.sortText}>Categories</Text>
        </View>
      </View> */}
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={Products}
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
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
export default CategoryList;
