import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import firestore from '@react-native-firebase/firestore';
import Input from '../../../components/Input';
import Title from '../../../components/Title';
import styles from './styles';
import Button from '../../../components/Button';
import {setToUpdate} from '../../../store/tasks';
import {useNavigation} from '@react-navigation/native';

const NotesAdd = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const user = useSelector(state => state.user.data);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAdd = () => {
    if (!title) {
      Alert.alert('Please enter the Note title');
      return;
    }

    if (!note) {
      Alert.alert('Please write a Note');
      return;
    }

    setLoading(true);
    firestore()
      .collection('Notes')
      .add({
        title,
        note,
        userId: user?.uid,
      })
      .then(() => {
        setLoading(false);
        dispatch(setToUpdate());
        navigation.navigate('Notes');
        setTitle('');
        setNote('');
        Keyboard.dismiss();
      })
      .catch(e => {
        console.log('error when adding Notes :>> ', e.message);
        setLoading(false);
        Alert.alert('Please try again later', e.message);
      });
  };

  return (
    <SafeAreaView>
      <View>
        <Pressable
          style={styles.backContainer}
          hitSlop={8}
          onPress={handleBack}>
          <Image
            style={styles.backIcon}
            source={require('../../../assets/back.png')}
          />
        </Pressable>
        <ScrollView>
          <Title type="thin">Add New Note</Title>

          <Input
            value={title}
            onChangeText={setTitle}
            outlined
            placeholder="Type here..."
          />
          <Input
            value={note}
            onChangeText={setNote}
            outlined
            placeholder="Type here..."
            multiline={true}
            numberOfLines={4}
            textBox
          />

          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button style={styles.button} type="blue" onPress={handleAdd}>
              Add Note
            </Button>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NotesAdd;
