import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.lightGrey,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 10,
    color: colors.black,
    marginVertical: 12,
    fontSize: 15,
  },
  outlined: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grey,
    marginHorizontal: 24,
  },
  textBox: {
    height: 100,
  }
});

export default styles;
