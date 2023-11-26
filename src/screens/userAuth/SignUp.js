import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../../components/CustomInput';
import {useForm, Controller} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {signOutUser} from '../../../redux/authUserSlice';
import {useDispatch} from 'react-redux';

// import {Auth, DataStore, Hub} from 'aws-amplify';
// import {User} from '../../models';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const createNewUser = async (
    userdId,
    username,
    name,
    email,
    phone_number,
  ) => {
    await firestore()
      .collection('User')
      .doc(userdId)
      .set({
        username: username,
        name: name,
        email: email,
        phone: phone_number,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  const signUpNewUser = async data => {
    const {username, password, email, phone_number, name} = data;
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('new signed up user id', user.uid);
        createNewUser(user.uid, username, name, email, phone_number);
        dispatch(signOutUser());
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 50}}>
        <Text style={{color: Colors.accent}}>Sin Up to your account</Text>
      </View>
      <CustomInput
        rules={{required: 'username is required'}}
        control={control}
        name="username"
        placeholder="Username"
      />
      <CustomInput
        rules={{required: 'name is required'}}
        control={control}
        name="name"
        placeholder="Name"
      />
      <CustomInput
        rules={{required: 'phone is required'}}
        control={control}
        name="phone_number"
        placeholder="Phone"
      />
      <CustomInput
        rules={{
          required: 'mail is required',
          pattern: {value: EMAIL_REGEX, message: 'incorrect mail'},
        }}
        control={control}
        name="email"
        placeholder="Mail"
      />
      <CustomInput
        rules={{
          required: 'passowrd is required',
          minLength: {value: 6, message: 'password minimum 6 charecters'},
        }}
        secureTextEntry
        control={control}
        name="password"
        placeholder="Password"
      />

      <TouchableOpacity
        onPress={handleSubmit(signUpNewUser)}
        style={styles.SignIn}>
        <Text style={styles.signInText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={{marginTop: 50, borderColor: 'red', flexDirection: 'row'}}>
        <Text style={{color: Colors.accent}}>Have An Account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={{alignContent: 'center', marginLeft: 5}}>
          <Text
            style={{color: Colors.accent, fontSize: 15, fontWeight: 'bold'}}>
            SignIn
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  signInView: {
    borderColor: Colors.accent,
    borderWidth: 1,
    borderRadius: 15,
    width: '100%',
    padding: 10,
    marginTop: 10,
  },
  mail: {
    justifyContent: 'center',
    alignItems: 'center',
    // textAlign: 'center'
    fontSize: 15,
  },
  SignIn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: Colors.accent,
    padding: 12,
    borderRadius: 15,
  },
  signInText: {
    color: Colors.primary,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default SignIn;
