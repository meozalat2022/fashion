//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import STORE from '../../../data/StoreList';
import PRODUCTS from '../../../data/ProductsList';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {getStoreToFOllow} from '../../../redux/storesFollowSlice';
import {getAuthUser} from '../../../redux/authUserSlice';
import {deleteProduct} from '../../../redux/productSlice';
import color from '../../../Constants/Colors';

// create a component
const Store = ({route}) => {
  // get store from databas and create one if you don't have any
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState(PRODUCTS);
  const [masterData, setMasterData] = useState(PRODUCTS);
  const [search, setSearch] = useState('');
  const loggedUser = useSelector(state => state.authUser.authenticated);
  console.log('loggedUser', loggedUser);
  const selectedStore = useSelector(state =>
    state.stores.data.filter(item => item.sellerId === loggedUser),
  );
  const storeProducts = useSelector(state => state.storesToFollow.data);
  console.log(storeProducts);
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

  useEffect(() => {
    dispatch(getStoreToFOllow(selectedStore[0]?.id));
  }, []);

  const deleteProduct = id => {
    console.log('product id', id);
  };

  // if (!selectedStore) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {selectedStore.length === 0 ? (
        <>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{width: 200, height: 150}}
              source={require('../../../assets/images/myStore.jpeg')}
            />
            <Text style={{marginTop: 30, fontSize: 18}}>
              You Don't Have a Store
            </Text>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate('CreateStore');
            }}
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: 75,
              backgroundColor: Colors.primary,
              paddingVertical: 10,
              borderRadius: 25,
              width: '50%',
              justifyContent: 'center',
            }}>
            <Text style={{color: Colors.accent, fontSize: 18}}>
              Create a Store
            </Text>
          </Pressable>
        </>
      ) : (
        <>
          <View
            style={[
              storeProducts.length === 0 ? styles.topViewNoPro : styles.topView,
            ]}>
            {/* Store name and store image */}
            <View
              style={{
                marginHorizontal: 20,
                // borderColor: 'red',
                // borderWidth: 2,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  overflow: 'hidden',
                  width: 150,
                  height: 150,
                  borderRadius: 150 / 2,
                  // marginBottom: 6,
                }}
                source={{uri: selectedStore[0]?.image}}
              />

              <Text style={{fontSize: 25, fontWeight: '800'}}>
                {selectedStore[0]?.title}
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{flexDirection: 'row', width: '80%'}}>
                {selectedStore[0].type.map(item => {
                  return <Text style={{padding: 15}}>{item}</Text>;
                })}
              </ScrollView>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                // borderWidth: 1,
                // borderColor: 'red',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('StoreToFollow', {
                    storeId: selectedStore[0]?.id,
                    storeTitle: selectedStore[0]?.title,
                  })
                }
                style={{
                  backgroundColor: color.primary,
                  padding: 5,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}>
                <Text>View Store</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CreateStore', {
                    action: 'edit',
                    storeId: selectedStore[0]?.id,
                    storeTitle: selectedStore[0]?.storeName,
                  });
                }}
                style={{
                  borderColor: color.primary,
                  borderWidth: 1,
                  padding: 5,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                <Text>Edit Store</Text>
              </TouchableOpacity>
            </View>
          </View>

          {storeProducts.length === 0 ? (
            <View
              style={{
                alignItems: 'center',
                // backgroundColor: '#F1F6F9',
                // paddingTop: 25,
                height: 250,
              }}>
              <View>
                <Text style={{fontSize: 20}}>You don't Have any Products</Text>
              </View>
              <Pressable
                onPress={() =>
                  navigation.navigate('AddProduct', {
                    action: 'addProducts',
                    storeId: selectedStore[0]?.id,
                  })
                }
                style={{
                  paddingHorizontal: 70,
                  paddingVertical: 15,
                  borderColor: Colors.primary,
                  borderWidth: 1,
                  borderRadius: 15,
                  marginTop: 30,
                }}>
                <Text style={{color: Colors.primary, fontSize: 16}}>
                  Add Product
                </Text>
              </Pressable>
            </View>
          ) : (
            <View
              style={{
                marginTop: 10,
                // borderColor: 'green',
                // borderWidth: 3,
                justifyContent: 'center',
                height: '60%',
              }}>
              <View
                style={{
                  backgroundColor: Colors.accent,
                  borderRadius: 25,
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
              <View style={{marginTop: 25, marginHorizontal: 20}}>
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>Products</Text>
              </View>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                <FlatList
                  scrollEnabled={false}
                  snapToAlignment={'center'}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={storeProducts}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{
                          height: 250,
                          width: 200,
                          marginVertical: 10,
                          marginHorizontal: 4,
                          backgroundColor: 'white',
                          borderColor: 'grey',
                          borderWidth: 0.5,
                          borderRadius: 20,
                          marginBottom: 30,
                          // borderColor: 'red',
                          // borderWidth: 2,
                        }}>
                        <View style={{height: '70%'}}>
                          <Image
                            resizeMode="contain"
                            style={{
                              width: '100%',
                              height: '100%',
                              borderTopLeftRadius: 20,
                              borderTopRightRadius: 20,
                              paddingTop: 5,
                              // borderWidth: 1,
                              // borderColor: 'red',
                            }}
                            source={{uri: item?.image[0]}}
                          />
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('AddProduct', {
                                action: 'edit',
                                productId: item.id,
                                storeId: selectedStore[0]?.id,
                              })
                            }
                            style={{
                              position: 'absolute',
                              top: 80,
                              right: 25,
                              width: 40,
                              height: 40,
                              borderRadius: 40 / 2,
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <AntDesign
                              name="edit"
                              size={25}
                              color={color.accent}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => deleteProduct(item.id)}
                            style={{
                              position: 'absolute',
                              top: 80,
                              left: 25,
                              width: 40,
                              height: 40,
                              borderRadius: 40 / 2,
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <AntDesign
                              name="delete"
                              size={25}
                              color={color.accent}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={{marginHorizontal: 5}}>
                          <Text>{item?.title}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 5,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              bottom: 100,
                              left: 20,
                            }}></View>
                          <View style={{alignItems: 'center'}}>
                            <Text
                              style={{
                                color: Colors.primary,
                                fontWeight: 'bold',
                              }}>
                              ${item.price}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
                <Pressable
                  onPress={() => {
                    navigation.navigate('AddProduct', {
                      action: 'addProduct',
                      storeId: selectedStore[0]?.id,
                    });
                  }}
                  style={{
                    height: 250,
                    width: 180,
                    marginVertical: 10,
                    marginHorizontal: 4,
                    borderStyle: 'dashed',
                    borderColor: 'grey',
                    borderWidth: 1.5,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{marginBottom: 20, fontSize: 40}}>+</Text>
                  <Text style={{fontSize: 20, fontWeight: '500'}}>
                    Add Product
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#D4D4D4',
  },
  topView: {
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
    height: '40%',
  },
  topViewNoPro: {
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
    height: '75%',
  },
});

//make this component available to the app
export default Store;
