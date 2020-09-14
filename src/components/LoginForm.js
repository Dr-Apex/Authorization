import React, {useState} from 'react';
import {Text} from 'react-native';
import firebase from 'firebase';
import {Button, Card, CardSection, Input, Spinner} from './common';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onButtonPress = () => {
    setError('');
    setLoading(true);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(loginSuccess)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(loginSuccess)
          .catch(loginFail)
      });
  };

  const loginFail = () => {
    setError('Authentication Failed.');
    setLoading(false);
  };

  const loginSuccess = () => {
    setEmail('');
    setPassword('');
    setError('');
    setLoading(false);
  };

  return (
    <Card>
      <CardSection>
        <Input
          placeholder="user@gmail.com"
          label="Email"
          value={email}
          onChangeText={setEmail}
        />
      </CardSection>
      <CardSection>
      <Input
        secureTextEntry
        placeholder="password"
        label="Password"
        value={password}
        onChangeText={setPassword}
      />
      </CardSection>
      {error ? <Text style={styles.errorTextStyle}>{error}</Text> : null}
      <CardSection>
        {loading ? (
          <Spinner size="small" />
        ) : (
          <Button onClick={onButtonPress}>
            Log In
          </Button>
        )}
      </CardSection>
    </Card>
  );
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
