import {StyleSheet} from 'react-native';
import {deviceHeight, deviceWidth} from '../../constants/dimensions';
import {Colors} from '../../constants/colors';

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
  background: {
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: 'white',
    height: deviceHeight / 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    flexDirection: 'row',
    width: '95%',
    gap: 20,
    padding: 5,
  },
  avatar: {
    height: 80,
    width: 80,
    objectFit: 'cover',
    borderRadius: 40,
  },
  textContainer: {flexDirection: 'row', alignItems: 'center', gap: 10},
  innerTextContainer: {flexDirection: 'column', gap: 10},
  boldText: {color: 'black', fontWeight: '500'},
  blackText: {color: 'black'},
  emailText: {color: 'black', maxWidth: 145},
  notchedButton: {
    backgroundColor: Colors.mainColor,
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: '35%',
    marginTop: 20,
  },
});
