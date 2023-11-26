//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PRODUCTS from '../../../data/ProductsList';
import Card from '../../../components/Card';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../../../redux/productSlice';

// create a component
const Browse = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const {data} = useSelector(state => state.products);
  const [filteredData, setFilteredData] = useState(data);
  const [masterData, setMasterData] = useState(data);
  const [search, setSearch] = useState('');

  const seachFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(masterData);
      setSearch(text);
    }
  };
  return (
    <View>
      <View style={{height: 50, backgroundColor: Colors.primary}}>
        <View
          style={{
            backgroundColor: Colors.accent,
            borderRadius: 15,
            marginHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <EvilIcons name="search" size={25} color={Colors.primary} />
          <TextInput
            onChangeText={text => seachFilter(text)}
            value={search}
            style={{marginLeft: 5}}
            placeholder="Search Product"
            // autoFocus={true}
          />
        </View>
      </View>
      <View style={styles.sort}>
        {/* <View style={styles.sortitem}>
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
        </View> */}
      </View>
      <FlatList
        numColumns={2}
        data={filteredData}
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
export default Browse;
