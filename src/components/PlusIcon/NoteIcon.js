import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Image, View, Text} from 'react-native';
import NoteStyles from './NoteStyles';
import colors from '../../constants/colors';

const NoteIcon = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('NotesAdd');
  };
  return (
    <Image
      source={require('../../assets/edit-text.png')}
      style={{
        position: 'absolute',
        top: '60%',
        left: '80%',
        bottom: 0,
        zIndex: 1,
        backgroundColor: colors.blue,
        padding: 20,
        borderRadius: 100,
      }}
    />
  );
};

export default React.memo(NoteIcon);
