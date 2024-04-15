import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

const moreInfo = ({title, desc, onPress, space}) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.box, space === 'Nospace' ? styles.nospacebox : {}]}
        onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{desc}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(moreInfo);
