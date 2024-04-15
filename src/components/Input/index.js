import React from 'react';
import {TextInput} from 'react-native';
import styles from './styles';
import colors from '../../constants/colors';

const Input = ({outlined, textBox, ...props}) => {
  return (
    <TextInput
      placeholderTextColor={colors.midGrey}
      style={[
        styles.input,
        outlined ? styles.outlined : {},
        textBox ? styles.textBox : {},
      ]}
      {...props}
    />
  );
};

export default React.memo(Input);
