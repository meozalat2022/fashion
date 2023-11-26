import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import Colors from '../Constants/Colors';

const CustomInput = ({
  control,
  rules = {},
  name,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.signInView,
              {borderColor: error ? 'red' : Colors.accent},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor="white"
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>
              {error.message || 'error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default CustomInput;
