// GoogleSignIn.js

import { useState } from 'react';
import { Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCredential } from 'firebase/auth';

export default function Login() {
  const [accessToken, setAccessToken] = useState();

  const signInAsync = async () => {
    // Initialize Firebase
    const firebaseConfig = {
      // your config 
    };

    const app = initializeApp(firebaseConfig);

    // Get Google login result
    const { type, accessToken, user } = await Google.logInAsync({
      webClientId: '524734164331-p0i30eph91k28qlsvt6liovki60s4cp7.apps.googleusercontent.com',
    });

    if (type === 'success') {
      // Build Firebase credential with the Google access token
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(accessToken);

      // Sign-in the user with the credential  
      const userCredential = await signInWithCredential(auth, credential);

      // Do something with userCredential  
    }
  };

  return (
    <Button 
      title="Login with Google"
      onPress={signInAsync} 
    />
  );
}