import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CouponCard from './CouponCard'; // Import the CouponCard component
import couponsAPI from '../config/couponsAPI';
import { useState } from 'react';
import "firebase/firestore" // Import your coupon data
import storeAPI from '../config/storeAPI';
import { getFirestore, addDoc, collection, getDocs } from 'firebase/firestore';
import firebase from '../config/firebaseConfig';
import addCouponsToFirestore from './CouponPusher';


export default function Home() {
  const [couponData,setCouponData] = useState([]);
  const db = getFirestore(firebase)
 
  // Merge data based on index
  const mergedData = couponsAPI.data.map((coupon, index) => {
    const matchingStore = storeAPI[index];
    // Check if matchingStore exists and has the icon property
    const icon = matchingStore && matchingStore.icon ? matchingStore.icon : null;
    return { ...coupon, icon };
  });
 
  // addCouponsToFirestore(mergedData)

  useFocusEffect(
    React.useCallback(() => {
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
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🛍️NexSavings 💸</Text>
      </View>
      <View style={styles.couponContainer}>
        <FlatList
          data={couponData}
          keyExtractor={(item) => item.id.toString()} // Convert id to string for keyExtractor
          renderItem={({ item }) => {
            return <CouponCard couponData={item} />;
          }}
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
    height: 20,
    backgroundColor: '#344955',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
  },
  couponContainer: {
    flex: 8,
    backgroundColor: '#f9f9f9',
  },
});
