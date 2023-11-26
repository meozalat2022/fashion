import React from 'react';
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
import {useDispatch} from 'react-redux';
import {getAuthUser} from '../../../redux/authUserSlice';
// import {Auth} from 'aws-amplify';
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignIn = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSignIn = async data => {
    dispatch(getAuthUser(data));

    // await auth()
    //   .signInWithEmailAndPassword(data.email, data.password)
    //   .then(userCredential => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // dispatch auth user
    //     console.log(user);
    //   })
    //   .catch(error => {
    //     const message = error.message;
    //     if (message === 'Firebase: Error (auth/user-not-found).') {
    //       Alert.alert('اميل غير موجود');
    //     }
    //     if (message === 'Firebase: Error (auth/wrong-password).') {
    //       Alert.alert('رقم سري خطأ');
    //     }
    //   });
  };

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 50}}>
        <Text style={{color: Colors.accent}}>Welcome to Tradly</Text>
      </View>
      <View style={{marginBottom: 50}}>
        <Text style={{color: Colors.accent}}>Log In To your account</Text>
      </View>
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

      <TouchableOpacity onPress={handleSubmit(onSignIn)} style={styles.SignIn}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 50}}>
        <Text style={{color: Colors.accent}}>Forgot Password</Text>
      </TouchableOpacity>
      <View style={{marginTop: 50, borderColor: 'red', flexDirection: 'row'}}>
        <Text style={{color: Colors.accent}}>Don't Have An Account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={{alignContent: 'center', marginLeft: 5}}>
          <Text
            style={{color: Colors.accent, fontSize: 15, fontWeight: 'bold'}}>
            SignUp
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

  signInText: {
    color: Colors.primary,
    fontSize: 15,
    textAlign: 'center',
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
});

export default SignIn;
