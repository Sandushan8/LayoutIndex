import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  cutOffTopLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRightWidth: 20,
    borderTopWidth: 20,
    borderTopColor: 'rgba(0,0,0,0.5)',
    borderRightColor: 'transparent',
  },
  cutOffBottomRight: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderLeftWidth: 20,
    borderBottomWidth: 20,
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderLeftColor: 'transparent',
  },
});
