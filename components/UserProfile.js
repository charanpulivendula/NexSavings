// UserProfile.js

import React from 'react';
import { View, Text, StyleSheet, Image , TouchableOpacity} from 'react-native';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.headerText}>Home</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }} style={styles.avatar} />
        <Text style={styles.username}>{auth.currentUser.email.replace("@gmail.com","")}</Text>
        <Text style={styles.email}>{auth.currentUser.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    height: 60,
    backgroundColor: '#344955',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
});

export default UserProfile;
