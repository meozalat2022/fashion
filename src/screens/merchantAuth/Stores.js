//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import StoreCard from '../../../components/StoreCard';

// create a component
const Stores = () => {
  const storeData = useSelector(state => state.stores.data);
  return (
    <View style={{marginTop: 10}}>
      <FlatList
        numColumns={2}
        data={storeData}
        renderItem={({item}) => {
          return (
            <View style={{margin: 5}}>
              <StoreCard id={item.id} title={item.title} image={item.image} />
            </View>
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
});

//make this component available to the app
export default Stores;
