import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const NoteStyles = StyleSheet.create({
  bottom: {},
  containerNote: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: 60,
    height: 60,
    backgroundColor: colors.blue,
    position: 'absolute',
    bottom: 80,
    right: 24,
  },
  plusNote: {
    height: 24,
    width: 24,
    marginTop: -2,
    position: 'absolute',
  },
});

export default NoteStyles;
