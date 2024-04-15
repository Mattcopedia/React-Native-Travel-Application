import React from 'react';
import {Image, Text, View} from 'react-native';
import Button from '../../../components/Button';
import styles from './styles';

const Onboarding = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Image
          style={styles.image}
          source={require('../../../assets/task.png')}
        />

        <View style={styles.footer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Best task management app</Text>
        <Text style={styles.subtitle}>
          Get organized by sorting out all your tasks and boost your
          productivity.
        </Text>

        <Button onPress={() => navigation.navigate('Signin')}>Log in</Button>
        <Button onPress={() => navigation.navigate('Signup')} type={'blue'}>
          Get started
        </Button>
      </View>
    </View>
  );
};

export default React.memo(Onboarding);
