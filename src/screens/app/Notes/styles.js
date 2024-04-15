import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noteView: {
    flex: 1,
    backgroundColor: colors.white,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7,
    alignItems: 'center',
    height: 170,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noteDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  backContainer: {
    padding: 24,
  },
  button: {
    margin: 24,
  },
  bottom: {
    marginBottom: 50,
  },
  readMore: {
    fontSize: 16,
    marginTop: 5,
    color: colors.grey,
  },
  marginBottom: {
    marginBottom: 120,
  },
  touchable: {
    position: 'absolute',
    top: '62%',
    left: '77%',
    zIndex: 2, // Higher zIndex than the image to capture touch events

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: 60,
    height: 60,
    backgroundColor: colors.blue,
  },
  plus: {
    fontSize: 32,
    marginTop: -2,
    color: colors.white,
    fontWeight: '600',
  },
});
export default styles;
