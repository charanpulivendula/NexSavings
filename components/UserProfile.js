import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const UserProfile = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  const db = getFirestore();

  const [favoriteCoupons, setFavoriteCoupons] = useState([]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Navigate to the authentication screen or any other screen you prefer
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const fetchFavoriteCoupons = async () => {
      if (auth.currentUser) {
        try {
          const userDocRef = doc(db, 'users', auth.currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFavoriteCoupons(userData.favoriteCoupons || []);
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
        }
      }
    };

    fetchFavoriteCoupons();
  }, [auth.currentUser, db]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image source={require('../assets/profilepic.png')} style={styles.avatar} />
        <Text style={styles.username}>{auth.currentUser.email.replace('@gmail.com', '')}</Text>
        <Text style={styles.email}>{auth.currentUser.email}</Text>
      </View>
      <View style={styles.favoriteContainer}>
        <Text style={styles.favoriteHeader}>Favorite Coupons</Text>
        <FlatList
          data={favoriteCoupons}
          keyExtractor={(item) => item.id} // Assuming coupon IDs are unique
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <Text style={styles.favoriteText}>{item.info}</Text>
              <Text style={styles.favoriteText}>CODE: {item.code}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.tail}>
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={styles.headerText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.headerText}>Home</Text>
        </TouchableOpacity>
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
  tail: {
    height: 60,
    backgroundColor: '#344955',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteItem: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  favoriteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default UserProfile;
