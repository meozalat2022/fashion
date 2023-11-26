//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Colors from '../../../Constants/Colors';

// create a component
const AddCard = () => {
  return (
    <View style={styles.container}>
      <View style={{marginTop: 50}}>
        <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>Card Number</Text>
        <TextInput keyboardType="number-pad" placeholder="Card Number" />
        <View
          style={{
            width: '100%',
            backgroundColor: '#C5C5C5',
            height: 0.5,
            alignSelf: 'center',
          }}
        />
      </View>
      <View style={{marginTop: 50}}>
        <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>Name</Text>
        <TextInput placeholder="Name" />
        <View
          style={{
            width: '100%',
            backgroundColor: '#C5C5C5',
            height: 0.5,
            alignSelf: 'center',
          }}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
      <View style={{marginTop: 50, width: '70%'}}>
        <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>Expiry Date</Text>
        <TextInput placeholder="Expiry Date" />
        <View
          style={{
            width: '70%',
            backgroundColor: '#C5C5C5',
            height: 0.5,
            alignSelf: 'center',
          }}
        />
      </View>
      <View style={{marginTop: 50}}>
        <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>Card Number</Text>
        <TextInput keyboardType="number-pad" placeholder="Card Number" />
        <View
          style={{
            width: '100%',
            backgroundColor: '#C5C5C5',
            height: 0.5,
            alignSelf: 'center',
          }}
        />
      </View>

      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Colors.accent,
  },
});

//make this component available to the app
export default AddCard;
