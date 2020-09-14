import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import {Header, Button, Spinner, CardSection} from './components/common';
import LoginForm from './components/LoginForm';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    firebase.initializeApp({
      apiKey: 'AIzaSyD2iH_BLAlyKYRT7MYCtIx-XVxjedPPYzc',
      authDomain: 'authentication-a7069.firebaseapp.com',
      databaseURL: 'https://authentication-a7069.firebaseio.com',
      projectId: 'authentication-a7069',
      storageBucket: 'authentication-a7069.appspot.com',
      messagingSenderId: '294312810281',
      appId: '1:294312810281:web:4a3661aa23f111a7908938'
    });

    firebase.auth().onAuthStateChanged(user => {
      user ? setLoggedIn(true) : setLoggedIn(false);
    });
  }, []);

  const showContent = () => {
    switch (loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onClick={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  };

  return (
    <View>
      <Header headerText="Authentication" />
      {showContent()}
    </View>
  );
};

export default App;
