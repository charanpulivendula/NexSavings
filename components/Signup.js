// Registration.js

import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Text } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { collection, addDoc, getFirestore,doc,setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import RNFetchBlob from 'react-native-fetch-blob';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false)

  const handleImagePicker = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    })
    const ref = firebase.storage().ref().child(`Pictures/Image1`)
    const snapshot = ref.put(blob)
    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        setUploading(true)
      },
      (error) => {
        setUploading(false)
        console.log(error)
        blob.close()
        return 
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false)
          console.log("Download URL: ", url)
          setProfileImage(url)
          blob.close()
          return url
        })
      }
      )
  }

  const handleRegistration = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const usersCollection = doc(getFirestore(), 'users',user.uid);

      await setDoc(usersCollection, {
        uid: user.uid,
        email: user.email,
        imageUrl: profileImage,
        favoriteCoupons:[]
      });

      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration failed', error.message); 
    }
  };

  return (
    <View style={styles.container}>
      {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}
      <TouchableOpacity onPress={handleImagePicker}>
        <Text style={styles.button}>Pick Profile picture</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleRegistration}>
        <Text style={styles.button}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style onPress={() => navigation.navigate('Login')}>
        <Text style={styles.button}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
    backgroundColor:"#344955"
  },
  input: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderBottomWidth: 1,
  },
  button:{
    fontSize: 20,
    backgroundColor: '#344955',
    padding:10,
    margin:10,
    padding:5,
    borderRadius:10,
    height:40,
    color:'white',
  }
});

export default Signup;
