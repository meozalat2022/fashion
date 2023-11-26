import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import InputeFiled from '../../../components/InputeFiled';
import {useSelector} from 'react-redux';
import {MultiSelect} from 'react-native-element-dropdown';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

const CreateStore = ({route}) => {
  const navigation = useNavigation();
  const storeId = route?.params?.storeId;
  const action = route?.params?.action;

  const loggedUser = useSelector(state => state.authUser.authenticated);
  const selectedStore = useSelector(state =>
    state.stores.data.filter(item => item.id === storeId),
  );
  console.log('loggedUser 2', loggedUser);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues:
      action === 'edit'
        ? {
            storeName: selectedStore[0].title,
            storeDescription: selectedStore[0].description,
            storeAddress: selectedStore[0].address,
            city: selectedStore[0].city,
            country: selectedStore[0].country,
            courier: selectedStore[0].courier,
          }
        : {},
  });

  const data = [
    {label: 'Women', value: 'Women'},
    {label: 'Accessories', value: 'Accessories'},
    {label: 'Purse', value: 'Purse'},
    {label: 'Babies', value: 'Babies'},
    {label: 'Boys', value: 'Boys'},
    {label: 'Girls', value: 'Girls'},
    {label: 'Men', value: 'Men'},
  ];

  const [selected, setSelected] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesUrls, setImagesUrls] = useState([]);
  const [transferred, setTransferred] = useState(0);

  const ref = useRef(null);

  const onSelectAll = (isSelectAll = true) => {
    const selectItem = [];
    if (isSelectAll) {
      data.map(item => {
        selectItem.push(item.value);
      });
    }
    setSelected(selectItem);
  };

  const renderSelectAllIcon = () => {
    const isSelectAll = selected.length === data.length;
    return (
      <TouchableOpacity
        style={styles.wrapSelectAll}
        onPress={() => onSelectAll(!isSelectAll)}>
        <Text style={styles.txtSelectAll}>
          {isSelectAll ? `UnSelect All` : 'Select All'}
        </Text>
      </TouchableOpacity>
    );
  };

  // image picker
  const pickImages = () => {
    ImagePicker.openPicker({
      // multiple: true,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setImages(image.path);
    });
  };

  const uploadImagesToStorage = async () => {
    if (!images) {
      return;
    } else {
      const uploadUri = images;
      let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      setTransferred(0);
      const storageRef = storage().ref('Fashion/' + fileName);
      const task = storageRef.putFile(uploadUri);
      // Set transferred state
      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );

        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100,
        );
      });
      try {
        await task;
        const url = await storageRef.getDownloadURL();
        // setImages(null);
        console.log('url', url);
        setImagesUrls(url);
      } catch (error) {
        console.log('error', error);
      }
    }
    Alert.alert('Images uploaded');
    setUploaded(true);
  };

  const createMyStore = async data => {
    if (!uploaded) {
      Alert.alert('Please upload Store Image');
      return;
    }
    const {storeName, storeDescription, storeAddress, city, country, courier} =
      data;
    await firestore().collection('Stores').add({
      address: storeAddress,
      city,
      country,
      courier,
      description: storeDescription,
      image: imagesUrls,
      sellerId: loggedUser,
      title: storeName,
      type: selected,
    });
    navigation.navigate('Store');
  };

  const editStore = async data => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      {action === 'edit' ? (
        <View
          style={{
            width: '100%',
            height: '40%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#D4D4D4',
          }}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{uri: selectedStore[0].image}}
          />
        </View>
      ) : (
        <>
          <TouchableOpacity
            onPress={pickImages}
            style={{
              width: 175,
              height: 150,
              borderColor: 'grey',
              borderWidth: 1,
              borderStyle: 'dotted',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 25, marginBottom: 3}}>+</Text>
            <Text style={{fontSize: 20, marginBottom: 3}}>Add Photo</Text>
            <Text style={{fontSize: 16}}>1620 x 1200 for hi res</Text>
          </TouchableOpacity>
          <View style={{backgroundColor: '#F1F6F9', height: '5%', padding: 2}}>
            <Button
              onPress={uploadImagesToStorage}
              color={Colors.primary}
              disabled={images.length <= 0 ? true : false}
              title="Upload"
            />
          </View>
          <Text
            numberOfLines={2}
            style={{marginTop: 30, fontSize: 22, textAlign: 'center'}}>
            This Information is Used to Setup Your Shop
          </Text>
        </>
      )}

      <ScrollView
        style={{
          height: '100%',
          paddingHorizontal: 10,
          backgroundColor: Colors.accent,
        }}>
        <InputeFiled
          rules={{
            required: 'Store Name is required',
          }}
          control={control}
          name="storeName"
          placeholder="Store Name"
        />
        <InputeFiled
          rules={{
            required: 'Store Description is required',
          }}
          control={control}
          name="storeDescription"
          placeholder="Store Description"
        />
        {action === 'edit' ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 5,
            }}>
            {selectedStore[0].type.map(item => {
              return <Text>{item}</Text>;
            })}
          </View>
        ) : null}

        <View style={styles.DropdownContainer}>
          <MultiSelect
            inside
            ref={ref}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            backgroundColor={'rgba(0,0,0,0.2)'}
            search
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Store Type"
            searchPlaceholder="Search..."
            value={selected}
            onChange={item => {
              setSelected(item);
            }}
            selectedStyle={styles.selectedStyle}
            flatListProps={{ListHeaderComponent: renderSelectAllIcon}}
          />
        </View>
        <InputeFiled
          rules={{
            required: 'Store Address is required',
          }}
          control={control}
          name="storeAddress"
          placeholder="Store Address"
        />
        <InputeFiled
          rules={{
            required: 'City is required',
          }}
          control={control}
          name="city"
          placeholder="City"
        />
        <InputeFiled
          rules={{
            required: 'Country is required',
          }}
          control={control}
          name="country"
          placeholder="Country"
        />
        <InputeFiled
          rules={{
            required: 'Courier is required',
          }}
          control={control}
          name="courier"
          placeholder="Courier"
        />
      </ScrollView>
      {action === 'edit' ? (
        <TouchableOpacity
          onPress={handleSubmit(editStore)}
          style={styles.SignIn}>
          <Text style={styles.signInText}>Edit Store</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleSubmit(createMyStore)}
          style={styles.SignIn}>
          <Text style={styles.signInText}>Create Store</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // // justifyContent: 'center',
    // padding: 20,
    backgroundColor: Colors.accent,
  },

  signInText: {
    color: Colors.accent,
    fontSize: 18,
    textAlign: 'center',
  },
  SignIn: {
    width: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 15,
  },
  DropdownContainer: {
    padding: 16,
  },
  dropdown: {
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  wrapSelectAll: {
    alignItems: 'flex-end',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  txtSelectAll: {
    color: 'blue',
  },
});
export default CreateStore;
