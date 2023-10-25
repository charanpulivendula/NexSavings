import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import CouponCard from './CouponCard'; // Import the CouponCard component
import couponsAPI from '../config/couponsAPI'; // Import your coupon data
import storeAPI from '../config/storeAPI';

export default function Home() {
  // Merge data based on index
  const mergedData = couponsAPI.data.map((coupon, index) => {
    const matchingStore = storeAPI[index];
    // Check if matchingStore exists and has the icon property
    const icon = matchingStore && matchingStore.icon ? matchingStore.icon : null;
    return { ...coupon, icon };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🛍️NexSavings 💸</Text>
      </View>
      <View style={styles.couponContainer}>
        <FlatList
          data={mergedData}
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
