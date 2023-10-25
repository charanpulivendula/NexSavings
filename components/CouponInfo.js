// CouponInfo.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import defaultLogo from '../assets/default.png';

const CouponInfo = ({ route }) => {
  const couponData = route.params.couponData;
  const logo = couponData.icon;
  return (
    <View style={styles.container}>
      <Image source={{ uri: logo }} style={styles.logo} />

      <View style={styles.content}>
        <Text style={styles.title}>{couponData.title}</Text>
        <Text style={styles.description}>{couponData.description}</Text>
        <Text style={styles.code}>Code: {couponData.code}</Text>
        <Text style={styles.validTill}>Valid until: {couponData.end_time}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Linking.openURL(couponData.url);
        }}
        underlayColor="#fff">
        <Text style={styles.buttonText}>Get Discount</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  code: {
    fontSize: 18,
    marginBottom: 10,
  },
  validTill: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    backgroundColor: '#246EE9',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CouponInfo;
