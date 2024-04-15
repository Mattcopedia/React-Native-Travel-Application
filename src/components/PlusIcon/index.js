import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, Pressable, Image, View,} from 'react-native';
import styles from './styles';

const PlusIcon = () => {
  const navigation = useNavigation();

  const onPress = () => {
      navigation.navigate('AddTask');
    
  };

  return (
    <View>
    <Pressable style={styles.container} onPress={onPress} hitSlop={8}>
      <Text style={styles.plus}> + </Text>
    </Pressable>
        </View>
  
  );
};

export default React.memo(PlusIcon);
