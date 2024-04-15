import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginHorizontal: 24,
    marginVertical: 8,
  },
  rowDetail: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft: 47,
    marginVertical: 8,
  },
  taskText: {
    color: colors.black,
    marginLeft: 8,
  }, 
  checked: {
    textDecorationLine: 'line-through',
  },  
  bold: {
    fontWeight: "500",
    fontSize: 15,
    color:colors.purple,
  },
  delete: {
    width: 24,
    height: 24,   
    marginLeft: 20,
    marginTop: 5
  }, 

 
});

export default styles;