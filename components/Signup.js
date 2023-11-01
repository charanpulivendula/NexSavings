// Registration.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { collection, addDoc ,getFirestore } from 'firebase/firestore';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Access the newly created user via userCredential.user
      const user = userCredential.user;

      // Get a reference to the 'users' collection
      const usersCollection = collection(getFirestore(), 'users');

      // Add user data to the 'users' collection
      await addDoc(usersCollection, {
        uid: user.uid,
        email: user.email,
      });

      navigation.navigate("Login");
      // You can navigate to another screen upon successful registration
    } catch (error) {
      console.error('Registration failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Register" onPress={handleRegistration} />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default Signup;
