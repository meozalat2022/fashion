//import liraries
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Colors from '../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {addToStoresList} from '../redux/followingStores';
import {useSelector} from 'react-redux';

// create a component
const StoreCard = props => {
  const navigation = useNavigation();
  const loggedUser = useSelector(state => state.authUser.authenticated);
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('StoreToFollow', {
          storeId: props.id,
          storeTitle: props.title,
        })
      }
      style={{
        height: 250,
        width: 185,
        //   justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 0.5,
        marginHorizontal: 10,
        borderRadius: 15,
      }}>
      <View style={{width: '100%', height: '40%'}}>
        <Image
          resizeMode="stretch"
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
          source={{uri: props.image}}
        />
      </View>

      <View
        style={{
          height: '60%',
          width: '100%',
          backgroundColor: Colors.accent,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          // borderColor: 'red',
          // borderWidth: 2,
        }}>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <View style={{marginBottom: 5, marginTop: 30}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: 'grey',
                fontWeight: 'bold',
              }}>
              {props.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              addToStoresList(loggedUser, props.id);
            }}
            style={{
              marginTop: 10,
              marginBottom: 10,
              backgroundColor: Colors.primary,
              paddingHorizontal: 20,
              paddingVertical: 2,
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: Colors.accent,
              }}>
              Follow
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 100,
            //   top: 40,
            right: 25,
            left: 25,
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 70,
              height: 70,
              borderRadius: 70 / 2,
              borderColor: 'grey',
              borderWidth: 1,
            }}
            source={{uri: props.image}}
          />
        </View>
      </View>
    </Pressable>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default StoreCard;
