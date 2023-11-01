import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CouponCard from './CouponCard';
import couponsAPI from '../config/couponsAPI';
import storeAPI from '../config/storeAPI';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebase from '../config/firebaseConfig';
import { getAuth } from 'firebase/auth';

export default function Home({route}) {
  const [couponData, setCouponData] = useState([]);
  const db = getFirestore(firebase);
  const navigation = useNavigation();
  const [userProfilePic, setUserProfilePic] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    if (route.params && route.params.profilePic) {
      setUserProfilePic(route.params.profilePic);
    }
  }, [route.params]);

  console.log(route.params);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const couponsCollection = collection(db, 'coupons');
        const querySnapshot = await getDocs(couponsCollection);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setCouponData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [auth.currentUser, db]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🛍️NexSavings 💸</Text>
        {userProfilePic && (
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
            <Image source={{ uri:  userProfilePic}} style={styles.profilePic} />
          </TouchableOpacity>
        )}
        {!userProfilePic && (
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.headerText}>Sign In</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
            <Text style={styles.headerText}>Contact</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.couponContainer}>
        <FlatList
          data={couponData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CouponCard couponData={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    flexDirection:'row',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap:50
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    borderRadius:20
  },
  couponContainer: {
    flex: 8,
    backgroundColor: '#f9f9f9',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  signInText: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
  },
});
