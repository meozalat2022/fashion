import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  Button,
  Alert,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../../components/CustomInput';
import {useForm, Controller} from 'react-hook-form';
import PRODUCTS from '../../../data/ProductsList';
import InputeFiled from '../../../components/InputeFiled';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {getStoreToFOllow} from '../../../redux/storesFollowSlice';
import {getSingleProduct} from '../../../redux/productSlice';
import {getProducts} from '../../../redux/productSlice';

const AddProduct = ({route}) => {
  const storeId = route?.params?.storeId;
  const productId = route?.params?.productId;
  const action = route?.params?.action;

  const productToEdit = useSelector(state =>
    state.products.data.filter(item => item.id === productId),
  );
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues:
      action === 'edit'
        ? {
            productName: productToEdit[0].title,
            price: productToEdit[0].price.toString(),
            offerPrice: productToEdit[0].offerPrice.toString(),
            location: productToEdit[0].location,
            description: productToEdit[0].description,
            priceType: productToEdit[0].priceType,
            condition: productToEdit[0].condition,
          }
        : {},
  });
  const [isFocus, setIsFocus] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesUrls, setImagesUrls] = useState([]);
  const [categoryValue, setCategoryValue] = useState(
    action === 'edit' ? productToEdit[0].categoryID : null,
  );
  const [category, setCategory] = useState([
    {label: 'Women', value: 'MGLlTILjvRoQKIO42HYy'},
    {label: 'Accessories', value: 'QVzMI4MERUR9FtiUsaLp'},
    {label: 'Purse', value: 'SIPpnpVJPyiA2yX5fX0D'},
    {label: 'Babies', value: 'bw2xqCdYDfrthD75H6bw'},
    {label: 'Boys', value: 'iKMWDz1gBSRJLXIHASk0'},
    {label: 'Girls', value: 'ks7lNMuxRLejPwq7dxPI'},
    {label: 'Men', value: 't5NJb2OU2yOcZqZboWPn'},
  ]);

  // image picker
  const pickImages = () => {
    ImagePicker.openPicker({
      multiple: true,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      image.forEach(doc => {
        setImages(prev => [...prev, doc.path]);
      });
    });
  };

  const uploadImagesToStorage = async () => {
    // const uploadUri = images;
    images.forEach(uploadUri => {
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
      task.then(() => {
        storageRef.getDownloadURL().then(url => {
          console.log('Download URL: ', url);
          setImagesUrls(prev => [...prev, url]);
        });
      });
    });
    if (action === 'edit') {
      const allImages = imagesUrls.concat(productToEdit[0].image);
      setImages(allImages);
      setImagesUrls(allImages);
    }
    Alert.alert('Images uploaded');
    setUploaded(true);
  };

  const updateProduct = async data => {
    if (!uploaded) {
      Alert.alert('You must upload images first');
    }
    const {
      description,
      location,
      offerPrice,
      price,
      productName,
      priceType,
      condition,
    } = data;
    await firestore()
      .collection('Products')
      .doc(productId)
      .update({
        condition,
        description,
        categoryID: categoryValue,
        image: imagesUrls,
        location,
        offerPrice: Number(offerPrice),
        price: Number(price),
        priceType,
        title: productName,
      });
  };
  const addProduct = async data => {
    if (!uploaded) {
      Alert.alert('You must upload images first');
    }
    const {
      description,
      location,
      offerPrice,
      price,
      productName,
      priceType,
      condition,
    } = data;
    await firestore().collection('Products').add({
      condition,
      createdAt: firestore.FieldValue.serverTimestamp(),
      description,
      categoryID: categoryValue,
      image: imagesUrls,
      location,
      offerPrice,
      price,
      priceType,
      storeID: storeId,
      title: productName,
    });
    // dispatch(getStoreToFOllow(selectedStore[0]?.id));
  };
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: '#F1F6F9', height: '22%', marginTop: 10}}>
        <View
          style={{
            marginHorizontal: 10,
            flexDirection: 'row',
            height: '100%',
            alignItems: 'center',
            // justifyContent: 'space-evenly',
          }}>
          {images.length >= 3 ? null : (
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
          )}
          {images.length >= 0 ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={action === 'edit' ? productToEdit[0].image : images}
              renderItem={({item}) => {
                return (
                  <View style={{marginHorizontal: 10, paddingVertical: 5}}>
                    <Image
                      source={{uri: item}}
                      style={{
                        width: 175,
                        height: 150,
                        borderRadius: 20,
                        overflow: 'hidden',
                      }}
                    />
                  </View>
                );
              }}
            />
          ) : null}
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#F1F6F9',
          // height: '2%',
          paddingHorizontal: 10,
          // borderColor: 'red',
          // borderWidth: 2,
          // paddingVertical: 20
        }}>
        <Text>Max 4 Photos per product</Text>
      </View>
      <View style={{backgroundColor: '#F1F6F9', height: '5%', padding: 2}}>
        <Button
          onPress={uploadImagesToStorage}
          color={Colors.primary}
          disabled={images.length <= 0 ? true : false}
          title="Upload"
        />
      </View>

      <ScrollView
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 10,
          height: '70%',
        }}>
        <InputeFiled
          rules={{
            required: 'Product Name is required',
          }}
          control={control}
          name="productName"
          placeholder="Product Name"
        />
        <Text style={[styles.label, {marginVertical: 10}]}>
          Product Category
        </Text>
        <View style={styles.DropdownContainer}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={category}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Choose Category' : '...'}
            searchPlaceholder="Search..."
            value={categoryValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setCategoryValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%', marginRight: 5}}>
            <InputeFiled
              rules={{
                required: 'Price is required',
              }}
              control={control}
              name="price"
              placeholder="Price"
            />
          </View>
          <View style={{width: '50%', marginLeft: 5}}>
            <InputeFiled
              rules={{
                required: 'Offer Price is required',
              }}
              control={control}
              name="offerPrice"
              placeholder="Offer Price"
            />
          </View>
        </View>
        <InputeFiled
          rules={{
            required: 'Location is required',
          }}
          control={control}
          name="location"
          placeholder="Locatin Details"
        />
        <InputeFiled
          rules={{
            required: 'Description is required',
          }}
          control={control}
          name="description"
          placeholder="Product Description"
        />
        <InputeFiled
          rules={{
            required: 'Price Type is required',
          }}
          control={control}
          name="priceType"
          placeholder="Price Type"
        />
        <InputeFiled
          rules={{
            required: 'Condition is required',
          }}
          control={control}
          name="condition"
          placeholder="Condition"
        />
        {action === 'edit' ? (
          <Pressable
            onPress={handleSubmit(updateProduct)}
            style={styles.SignIn}>
            <Text style={styles.signInText}>Edit Product</Text>
          </Pressable>
        ) : (
          <Pressable onPress={handleSubmit(addProduct)} style={styles.SignIn}>
            <Text style={styles.signInText}>Add Product</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  DropdownContainer: {
    backgroundColor: 'white',
    // padding: 10,
    marginTop: 10,
  },

  signInText: {
    color: Colors.accent,
    fontSize: 15,
    textAlign: 'center',
  },
  SignIn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 15,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  label: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
});
export default AddProduct;
