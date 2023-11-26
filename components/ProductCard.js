import React from 'react';
import {View, Text, Image, FlatList, StyleSheet, Pressable} from 'react-native';
import Colors from '../Constants/Colors';
import Card from './Card';
import {useNavigation} from '@react-navigation/native';

const ProductCard = props => {
  // const cardProducts = route.params.listProducts;
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={props.listProducts}
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

const styles = StyleSheet.create({});

export default ProductCard;
