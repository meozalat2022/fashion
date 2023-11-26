import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [index, setIndex] = useState(1);
  const navigation = useNavigation();
  const MiddleImage = () => {
    if (index === 1) {
      return (
        <Image
          style={styles.image}
          source={require('../../assets/images/woman-shopping-vector-1091497.jpg')}
        />
      );
    }
    if (index === 2) {
      return (
        <Image
          style={styles.image}
          source={require('../../assets/images/womanShopping2.jpg')}
        />
      );
    }
    if (index === 3) {
      return (
        <Image
          style={styles.image}
          source={require('../../assets/images/womanShopping3.png')}
        />
      );
    }
  };

  const MiddleText = () => {
    if (index === 1) {
      return (
        <Text numberOfLines={2} style={styles.text}>
          Best Shopping experince in our shop today
        </Text>
      );
    }
    if (index === 2) {
      return (
        <Text numberOfLines={2} style={styles.text}>
          Come to shopp here with your friends and get more discounts
        </Text>
      );
    }
    if (index === 3) {
      return (
        <Text numberOfLines={2} style={styles.text}>
          come with your husband and let him pay for all what you get
        </Text>
      );
    }
  };
  useEffect(() => {
    setIndex(1);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}></View>
      <View style={styles.middleview}>
        <MiddleImage />
      </View>
      <View style={styles.textView}>
        <MiddleText />
      </View>
      <View style={styles.dotView}>
        <View style={[styles.dots, {opacity: index === 1 ? 1 : 0.5}]} />
        <View style={[styles.dots, {opacity: index === 2 ? 1 : 0.5}]} />
        <View style={[styles.dots, {opacity: index === 3 ? 1 : 0.5}]} />
      </View>
      <TouchableOpacity
        onPress={() => {
          setIndex(index < 3 ? index + 1 : navigation.navigate('SignIn'));
        }}
        style={styles.nextView}>
        <Text style={styles.next}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    flex: 1,
  },
  topView: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: '40%',
  },
  middleview: {
    backgroundColor: Colors.accent,
    height: 400,
    position: 'absolute',
    left: 50,
    right: 50,
    top: 150,
    borderRadius: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    justifyContent: 'flex-end',
    width: '100%',
    // borderColor: 'red',
    // borderWidth: 1,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 150,
    padding: 10,
  },
  text: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  dotView: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    left: 150,
    right: 150,
    padding: 5,
    flexDirection: 'row',
  },
  dots: {
    backgroundColor: Colors.primary,
    height: 15,
    width: 15,
    borderRadius: 30,
  },
  nextView: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: 40,
    left: 80,
    right: 80,
    padding: 15,
    borderRadius: 20,
  },
  next: {
    textAlign: 'center',
    color: Colors.accent,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Home;
