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
import {Auth} from 'aws-amplify';

const ConfirmSignUp = ({route}) => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: {username: route?.params?.name}});
  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      Alert.alert('Oooops', error.message);
    }
    navigation.navigate('SignIn');
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
        rules={{required: 'username is required'}}
        control={control}
        name="username"
      />
      <CustomInput
        rules={{
          required: 'code is required',
        }}
        secureTextEntry
        control={control}
        name="code"
        placeholder="Code"
      />

      <TouchableOpacity
        onPress={handleSubmit(confirmSignUp)}
        style={styles.SignIn}>
        <Text style={styles.signInText}>Submit</Text>
      </TouchableOpacity>
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

export default ConfirmSignUp;
