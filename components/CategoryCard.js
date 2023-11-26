import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CATEGORY from '../data/Categories';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getCategory} from '../redux/categorySlice';

const CategoryCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const categoriesData = useSelector(state => state.category.data);

  useEffect(() => {
    dispatch(getCategory());
  }, []);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        // horizontal
        scrollEnabled={false}
        numColumns={4}
        data={categoriesData}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CategoryList', {
                  id: item.id,
                  title: item.title,
                });
              }}
              style={styles.card}>
              <ImageBackground
                style={styles.bgImage}
                source={{uri: item.image}}>
                <Text style={styles.title}>{item.title}</Text>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'space-evenly',
    margin: 2,
  },
  bgImage: {
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CategoryCard;
