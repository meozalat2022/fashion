import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import Colors from '../Constants/Colors';

const Card = props => {
  const WIDTH = Dimensions.get('window').width;
  return (
    <View
      style={{
        height: 250,
        width: WIDTH / 2 - 10,
        marginVertical: 10,
        marginHorizontal: 4,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 20,
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
          source={{uri: props.image[0]}}
        />
      </View>
      <View style={{marginHorizontal: 5}}>
        <Text>{props.title}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 5,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{width: 40, height: 40, borderRadius: 40 / 2}}
            source={{uri: props.storeImage}}
          />
          <Text>{props.storeName}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: Colors.primary, fontWeight: 'bold'}}>
            ${props.price}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Card;
