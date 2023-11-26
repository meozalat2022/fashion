import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Colors from '../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getPromotionProducts} from '../redux/promotionProductsSlice';

const Carasoul = () => {
  const navigation = useNavigation();
  // const dispatch = useDispatch();
  const WINDTH = Dimensions.get('window').width;

  const discountProducts = useSelector(state =>
    state.products.data.filter(item => item.offerPrice),
  );

  // useEffect(() => {
  //   dispatch(getPromotionProducts());
  // }, []);

  if (!discountProducts) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToAlignment={'center'}
      snapToInterval={WINDTH - 15}
      data={discountProducts}
      renderItem={({item}) => {
        return (
          <Pressable
            onPress={() => {
              navigation.navigate('ProductDetails', {productId: item.id});
            }}
            style={{width: WINDTH - 20, height: 200, padding: 10}}>
            <ImageBackground
              resizeMode="stretch"
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              imageStyle={{borderRadius: 15}}
              source={{uri: item.image[0]}}></ImageBackground>
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.accent,
                borderRadius: 25,
                position: 'absolute',
                top: 20,
                left: 30,
              }}>
              <Text
                style={{
                  color: Colors.accent,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Discount {item.discountRate} %
              </Text>
            </View>
            <View style={{position: 'absolute', top: 100, left: 30}}>
              <Text
                style={{
                  color: Colors.accent,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {item.description}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.accent,
                borderRadius: 25,
                position: 'absolute',
                top: 130,
                left: 30,
                paddingHorizontal: 20,
              }}>
              <Text
                numberOfLines={2}
                style={{
                  color: Colors.accent,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {item.title}
              </Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default Carasoul;
