import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import {Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Onboarding from './screens/auth/Onboarding';
import Signin from './screens/auth/Signin';
import Signup from './screens/auth/Signup';
import Home from './screens/app/Home';
import Tasks from './screens/app/Tasks';
import AddTask from './screens/app/AddTask';
import DrawerContent from './components/DrawerContent';
import {setUser} from './store/user';
import CgpaCalculator from './screens/app/CgpaCalulator/CgpaCalculator';

import NotesAdd from './screens/app/Notes/NotesAdd';
import Details from './screens/app/Notes/Details';
import Notes from './screens/app/Notes';
import wordEditor from './screens/app/CgpaCalulator/wordEditor';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    dispatch(setUser(user));
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  const Tabs = () => (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false, headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.icon}
              source={
                focused
                  ? require('./assets/home_active.png')
                  : require('./assets/home_inactive.png')
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.icon}
              source={
                focused
                  ? require('./assets/calendar_active.png')
                  : require('./assets/calendar_inactive.png')
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cgpa"
        component={CgpaCalculator}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.icon}
              source={
                focused
                  ? require('./assets/calculator.png')
                  : require('./assets/calculator-inactve.png')
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="Notes"
        component={Notes}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.icon}
              source={
                focused
                  ? require('./assets/edit-text.png')
                  : require('./assets/edit-text-inactive.png')
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );

  if (user) {
    return (
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Tabs" component={Tabs} />
        <Drawer.Screen name="AddTask" component={AddTask} />
        <Drawer.Screen name="Cgpa" component={CgpaCalculator} />
        <Drawer.Screen name="Notes" component={Notes} />
        <Drawer.Screen name="NotesAdd" component={NotesAdd} />
        <Drawer.Screen name="Details" component={Details} />
        <Drawer.Screen name="Editor" component={wordEditor} />
      </Drawer.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default React.memo(Routes);
