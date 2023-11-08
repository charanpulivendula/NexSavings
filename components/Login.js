// Login.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,TouchableOpacity,Text } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Login = ({ }) => {
    const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   
  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      const profilePic = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
      navigation.navigate("Home",{profilePic})
      // You can navigate to another screen upon successful login
    } catch (error) {
      console.error('Login failed', error.message);
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
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.button}>Go to Register</Text>
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
  input: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderBottomWidth: 1,
  },
  button:{
    fontSize: 20,
    backgroundColor: '#344955',
    padding:5,
    borderRadius:10,
    margin:10,
    height:40,
    color:'white',
  }
});

export default Login;
