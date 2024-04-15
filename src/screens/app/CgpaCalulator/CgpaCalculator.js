import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';
import Header from '../../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../constants/colors';
import Title from '../../../components/Title';
import MoreInfo from '../Home/moreInfo';

const CgpaCalculator = ({navigation}) => {
  const [courses, setCourses] = useState([
    {course: '', grade: '', credit: ''},
    {course: '', grade: '', credit: ''},
    {course: '', grade: '', credit: ''},
  ]);
  const [cgpa, setCGPA] = useState('');
  const [lastCgpa, setLastCgpa] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCourseChange = (text, index) => {
    const updatedCourses = [...courses];
    updatedCourses[index].course = text;
    setCourses(updatedCourses);
  };

  const handleGradeChange = (text, index) => {
    const updatedCourses = [...courses];
    updatedCourses[index].grade = text;
    setCourses(updatedCourses);
  };

  const handleCreditChange = (text, index) => {
    const updatedCourses = [...courses];
    updatedCourses[index].credit = text;
    setCourses(updatedCourses);
  };

  const addCourse = () => {
    setCourses([...courses, {course: '', grade: '', credit: ''}]);
  };

  const deleteCourse = index => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };

  const calculateCGPA = () => {
    let totalCreditPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (!course.grade || !course.credit || !course.course) {
        Alert.alert('Please fill in all the required fields.');
        return;
      }

      const credit = parseInt(course.credit);
      const grade = course.grade.toUpperCase();
      let gradePoint = 0;

      switch (grade) {
        case 'A':
          gradePoint = 5;
          break;
        case 'B':
          gradePoint = 4;
          break;
        case 'C':
          gradePoint = 3;
          break;
        case 'D':
          gradePoint = 2;
          break;
        case 'E':
          gradePoint = 1;
          break;
        case 'F':
          gradePoint = 0;
          break;
      }

      totalCreditPoints += credit * gradePoint;
      totalCredits += credit;
    });

    const calculatedCGPA = totalCreditPoints / totalCredits;
    setCGPA(calculatedCGPA.toFixed(2));
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      Alert.alert('CGPA stored successfully!');
    } catch (error) {
      console.log('Enter the required fields', error);
    }
  };

  const retrieveData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setLastCgpa(value);
      } else {
        Alert.alert('CGPA not found!');
      }
    } catch (error) {
      console.log('Error retrieving data: ', error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Pressable
          style={styles.backContainer}
          hitSlop={8}
          onPress={handleBack}>
          <Image
            style={styles.backIcon}
            source={require('../../../assets/back.png')}
          />
        </Pressable>

        <Title type="thin">CGPA Calculator</Title>

        <MoreInfo
          space="Nospace"
          title="How to use"
          desc="This is a 5 point CGPA Calculator. Here A=5, B=4, C=3, D=2, E=1, F=0. For Pharmacy and other medical students, The points for D,E,F is 0. So courses with those grades don't need to be filled in. "
        />
        <View style={styles.container}>
          {courses.map((course, index) => (
            <View key={index} style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Course Name"
                value={course.course}
                onChangeText={text => handleCourseChange(text, index)}
              />
              <TextInput
                style={styles.input}
                placeholder="Grade (A-F)"
                value={course.grade}
                onChangeText={text => handleGradeChange(text, index)}
              />
              <TextInput
                style={styles.input}
                placeholder="Credit"
                keyboardType="numeric"
                value={course.credit}
                onChangeText={text => handleCreditChange(text, index)}
              />
              {index >= 3 && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteCourse(index)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          <TouchableOpacity style={styles.addButton} onPress={addCourse}>
            <Text style={styles.addButtonText}>Add Course</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateCGPA}>
            <Text style={styles.calculateButtonText}>Calculate CGPA</Text>
          </TouchableOpacity>

          <Text style={styles.cgpaText}>CGPA: {cgpa}</Text>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => storeData('myKey', cgpa)}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.retrieveButton}
            onPress={() => retrieveData('myKey')}>
            <Text style={styles.retrieveButtonText}>Get Last CGPA</Text>
          </TouchableOpacity>

          <Text style={styles.cgpaText}>Last CGPA: {lastCgpa}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  calculateButton: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  calculateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  retrieveButton: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  retrieveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cgpaText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  backContainer: {
    padding: 24,
  },
});

export default CgpaCalculator;
