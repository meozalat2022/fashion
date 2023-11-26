import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import Colors from '../Constants/Colors';

const InputeFiled = ({
  control,
  rules = {},
  name,
  placeholder,
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
                <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>{placeholder}</Text>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor="#C0C9CC"
            />
            <View
          style={{
            width: '100%',
            backgroundColor: '#C5C5C5',
            height: 0.5,
            alignSelf: 'center',
          }}
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
    // borderColor: Colors.accent,
    // borderWidth: 1,
    // borderRadius: 15,
    // width: '100%',
    // padding: 10,
    marginTop: 20,
  },
  mail: {
    justifyContent: 'center',
    alignItems: 'center',
    // textAlign: 'center'
    fontSize: 15,
  },
});

export default InputeFiled;
