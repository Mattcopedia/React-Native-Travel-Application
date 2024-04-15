import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert, SafeAreaView, Text} from 'react-native';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Title from '../../../components/Title'; 
import styles from './styles';  

const Signin = ({navigation}) => {
  const [values, setValues] = useState({});

  const onChange = (value, key) => {
    setValues(vals => ({
      ...vals,
      [key]: value, 
    }));
  };

  const onSubmit = () => {
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        console.log('User signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        } else {
          Alert.alert(error.message);
        }
      });
      // navigation.navigate('Home') 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title>Welcome back!</Title>

      <Input
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={val => onChange(val, 'email')}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={val => onChange(val, 'password')} 
      />

      <Button onPress={onSubmit}>Login</Button>

      <Text style={styles.footerText}>
        Not Registered?
        <Text
          onPress={() => navigation.navigate('Signup')}
          style={styles.footerLink}>
          {' '}
          Sign up!
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default React.memo(Signin);
