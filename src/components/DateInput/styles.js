import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  outlined: {
    marginVertical: 12,
    paddingHorizontal: 24,
    paddingVertical: 13,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grey,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.grey,
    fontSize: 15,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
});

export default styles;
