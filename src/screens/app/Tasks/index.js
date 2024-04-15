import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import Checkbox from '../../../components/Checkbox';
import Header from '../../../components/Header';
import PlusIcon from '../../../components/PlusIcon';
import Title from '../../../components/Title';
import styles from './styles';
import {setToUpdate} from '../../../store/tasks';
import Categories from '../../../components/Categories';
import {categories} from '../../../constants/categories';
import {useIsFocused} from '@react-navigation/native';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.data);
  const [category, setCategory] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      if (category && category !== 'all') {
        const filtered = tasks?.filter(task => task?.category === category);
        setFilteredTasks(filtered);
      } else {
        setFilteredTasks(tasks);
      }
    }
  }, [category, tasks, isFocused]);

  const onTaskUpdate = item => {
    firestore()
      .collection('Tasks')
      .doc(item?.uid)
      .update({
        checked: !item.checked,
      })
      .then(() => {
        dispatch(setToUpdate());
      });
  };

  const onTaskDelete = item => {
    firestore()
      .collection('Tasks')
      .doc(item?.uid)
      .delete()
      .then(() => {
        console.log('Task Deleted!');
        dispatch(setToUpdate());
      });
  };

  const renderTask = ({item}) => {
    const newString = item?.category?.replace(/_/g, ' ');

    const str2 = newString?.charAt(0).toUpperCase() + newString?.slice(1);

    const deadline = item?.deadline;
    const deadlineFormatted = deadline.toDate().toDateString().toLocaleString();

    return (
      <View>
        <View style={styles.row}>
          <Checkbox checked={item.checked} onPress={() => onTaskUpdate(item)} />
          <Text style={[styles.taskText, item?.checked ? styles.checked : {}]}>
            <Text style={styles.bold}>Task title:</Text> {item?.title}
            <Text style={styles.bold}> Category:</Text> {str2}
            {'\n'}
            <Text style={styles.bold}>Deadline:</Text> {deadlineFormatted}
            <Pressable
              style={styles.deletecontainer}
              onPress={() => onTaskDelete(item)}>
              <Image
                style={styles.delete}
                source={require('../../../assets/icons8-delete-48.png')}
              />
            </Pressable>
          </Text>
        </View>

        <View style={styles.rowDetail}>
          <Text style={styles.bold}> Details:</Text>
          <Text> {item?.taskDetail}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Tasks" />

      <FlatList
        ListHeaderComponent={
          <View style={{marginBottom: 24}}>
            <Title type="thin">To Do Tasks</Title>
            <Categories
              categories={[{label: 'All', value: 'all'}, ...categories]}
              selectedCategory={category}
              onCategoryPress={setCategory}
            />
          </View>
        }
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={item => String(item?.uid)}
      />

      <PlusIcon />
    </SafeAreaView>
  );
};

export default React.memo(Tasks);
