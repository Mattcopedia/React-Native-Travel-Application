import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 16,
    color: colors.purple,
    fontWeight: '500',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default styles;
