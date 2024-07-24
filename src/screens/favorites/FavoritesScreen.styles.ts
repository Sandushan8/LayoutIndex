import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';

export const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.mainColor,
  },
  headerTitleStyle: {
    color: 'white',
  },
  backIcon: {
    tintColor: 'white',
  },
  itemContainer: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    marginBottom: 20,
    marginHorizontal: 1,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    borderRadius: 6,
    height: 90,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingLeft: 20,
    paddingTop: 20,
  },
  innerTextContainer: {flexDirection: 'column', gap: 10},
  boldText: {
    fontWeight: 'bold',
    color: 'black',
  },
  blackText: {
    color: 'black',
  },
  removeButtonContainer: {
    width: '25%',
  },
  removeButton: {
    height: 90,
    width: 90,
    borderLeftColor: Colors.backgroundGray,
    borderLeftWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: Colors.removeRedColor,
    fontWeight: 'bold',
  },
  searchContainer: {
    height: 80,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
    backgroundColor: 'white',
    width: '100%',
  },
  searchText: {
    backgroundColor: Colors.backgroundGray,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    paddingHorizontal: 10,
    width: '60%',
    borderRadius: 4,
    color: 'black',
  },
  notchedButton: {
    backgroundColor: Colors.mainColor,
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: '35%',
  },
  bodyContainer: {
    padding: 20,
    paddingBottom: 20,
    height: '91%',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  noDataText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
  },
});
