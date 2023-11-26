//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import CustomInput from '../../../components/CustomInput';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

// create a component
const AddNewAddress = () => {
  const navigate = useNavigation();
  const loggedUser = useSelector(state => state.authUser.authenticated);
  const user = useSelector(state => state.userLogged.data);
  const userStreetAddress = user[0].address.StreetAddress;
  const userLandMark = user[0].address.LandMark;
  const userCity = user[0].address.City;
  const userState = user[0].address.State;
  const userZipCode = user[0].address.ZipCode;
  // console.log(userStreetAddress);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      streetAddress: !userStreetAddress ? '' : userStreetAddress,
      landMark: !userLandMark ? '' : userLandMark,
      city: !userCity ? '' : userCity,
      state: !userState ? '' : userCity,
      zipCode: !userZipCode ? '' : userZipCode,
    },
  });

  const addAddress = async data => {
    try {
      await firestore()
        .collection('User')
        .doc(loggedUser)
        .update({
          address: {
            StreetAddress: data.streetAddress,
            LandMark: data.landMark,
            City: data.city,
            State: data.state,
            ZipCode: data.zipCode,
          },
        })
        .then(() => {
          navigate.goBack();
        });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable
        style={{
          width: '100%',
          backgroundColor: Colors.accent,
          paddingVertical: 25,
          alignItems: 'center',
          marginBottom: 15,
          flexDirection: 'row',
          justifyContent: 'center',
          // marginBottom: 50,
          borderRadius: 25,
        }}>
        <MaterialIcons name="my-location" color={'#89CFF0'} size={25} />
        <Text style={{color: '#89CFF0', marginLeft: 10}}>
          Use Current Location
        </Text>
      </Pressable>
      <View style={{paddingHorizontal: 15}}>
        <CustomInput
          rules={{
            required: 'Street Adress is required',
          }}
          control={control}
          name="streetAddress"
          placeholder="Street Address"
        />
        <CustomInput
          control={control}
          name="landMark"
          placeholder="Land Mark"
        />
        <CustomInput
          rules={{
            required: 'City is required',
          }}
          control={control}
          name="city"
          placeholder="City"
        />
        <CustomInput
          rules={{
            required: 'State is required',
          }}
          control={control}
          name="state"
          placeholder="State"
        />
        <CustomInput
          rules={{
            required: 'Zip Code is required',
          }}
          control={control}
          name="zipCode"
          placeholder="Zip Code"
        />
        <Pressable
          onPress={handleSubmit(addAddress)}
          style={{
            width: '80%',
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 15,
            backgroundColor: Colors.accent,
            paddingVertical: 15,
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{fontSize: 16, color: Colors.primary}}>Save</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
  },
});

//make this component available to the app
export default AddNewAddress;
