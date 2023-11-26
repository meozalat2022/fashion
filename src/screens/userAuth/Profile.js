//import liraries
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import Colors from '../../../Constants/Colors';
// import {Auth} from 'aws-amplify';
import auth from '@react-native-firebase/auth';
import {signOutUser} from '../../../redux/authUserSlice';
import {getUser} from '../../../redux/userSlice';
import {useDispatch, useSelector} from 'react-redux';

// create a component
const Profile = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.authUser.authenticated);
  const user = useSelector(state => state.userLogged.data);
  useEffect(() => {
    dispatch(getUser(loggedUser));
  }, []);
  console.log('user data', user, 'logged in user id', loggedUser);
  const signOut = () => {
    dispatch(signOutUser());

    // try {
    //   auth()
    //     .signOut()
    //     .then(() => console.log('User signed out!'));
    // } catch (error) {
    //   console.log('error', error);
    // }
    // try {
    //   await Auth.signOut();
    // } catch (error) {
    //   console.log('error signing out: ', error);
    // }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: '40%',
          backgroundColor: Colors.primary,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: 75,
              height: 75,
              borderRadius: 75 / 2,
              overflow: 'hidden',
              marginRight: 20,
            }}
            source={require('../../../assets/images/myStore.jpeg')}
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: Colors.accent}}>{user[0]?.name}</Text>
            <Text style={{color: Colors.accent}}>{user[0]?.phone}</Text>
            <Text style={{color: Colors.accent}}>{user[0]?.email}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 120,
          left: 20,
          right: 20,
          backgroundColor: Colors.accent,
          height: 350,
          borderRadius: 10,
          padding: 15,
          paddingTop: 30,
        }}>
        <Pressable style={{marginBottom: 40}}>
          <Text>Edit Profile</Text>
        </Pressable>
        <Pressable style={{marginBottom: 40}}>
          <Text>Language & Currency</Text>
        </Pressable>
        <Pressable style={{marginBottom: 40}}>
          <Text>Feedback</Text>
        </Pressable>
        <Pressable style={{marginBottom: 40}}>
          <Text>Refer a Friend</Text>
        </Pressable>
        <Pressable>
          <Text>Terms & Conditions</Text>
        </Pressable>
        <Pressable onPress={signOut} style={{marginTop: 25}}>
          <Text style={{color: Colors.primary}}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default Profile;
