import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  cutOffTopLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderTopColor: 'white',
    borderRightColor: 'transparent',
  },
  cutOffTopRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderLeftWidth: 10,
    borderTopWidth: 10,
    borderTopColor: 'white',
    borderLeftColor: 'transparent',
  },
  cutOffBottomLeft: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderBottomColor: 'white',
    borderRightColor: 'transparent',
  },
  cutOffBottomRight: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderLeftWidth: 10,
    borderBottomWidth: 10,
    borderBottomColor: 'white',
    borderLeftColor: 'transparent',
  },
});
