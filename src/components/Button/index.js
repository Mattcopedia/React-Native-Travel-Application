import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const Button = ({ onPress, style, type, del, children }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, type === 'blue' ? styles.blueBg : {},
      del === "red" ? styles.redBg : {}, style]}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(Button);
