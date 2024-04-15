import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import {Linking, StyleSheet, Text} from 'react-native';
import colors from '../../constants/colors';
import {
  PRIVACY_POLICY_LINK,
  TERMS_CONDITIONS_LINK,
} from '../../constants/links';

function DrawerContent(props) {
  const {navigation} = props;
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <DrawerContentScrollView {...props}>
      <Text style={styles.link} onPress={() => navigation.navigate('Home')}>
        Home
      </Text>
      <Text style={styles.link} onPress={() => navigation.navigate('Tasks')}>
        Tasks
      </Text>
      <Text style={styles.link} onPress={() => navigation.navigate('Cgpa')}>
        CGPA Tool
      </Text>
      <Text style={styles.link} onPress={() => navigation.navigate('Notes')}>
        Notes
      </Text>
      {/* <Text style={styles.link} onPress={() => navigation.navigate('Editor')}>
        Editor
      </Text> */}
      <Text
        style={styles.link}
        onPress={() => Linking.openURL(PRIVACY_POLICY_LINK)}>
        Privacy Policy
      </Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL(TERMS_CONDITIONS_LINK)}>
        Terms and Conditions
      </Text>
      <Text style={styles.link} onPress={logout}>
        Log out
      </Text>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  link: {
    color: colors.black,
    fontWeight: '500',
    fontSize: 13,
    margin: 8,
    marginHorizontal: 16,
  },
});

export default React.memo(DrawerContent);
