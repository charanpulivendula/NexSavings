import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import CouponCard from './CouponCard'; // Import the CouponCard component
import couponsAPI from '../config/couponsAPI'; // Import your coupon data

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🛍️NexSavings 💸</Text>
      </View>
      <View style={styles.couponContainer}>
        <FlatList
          data={couponsAPI.data}
          keyExtractor={(item) => item.id}
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
    backgroundColor: '#246EE9',
  },
});
