import {Image, Modal as ReactNativeModal, Text, View} from 'react-native';
import {ModalProps} from './Modal.types';
import {deviceHeight, deviceWidth} from '../../constants/dimensions';
import {styles} from './Modal.styles';
import {NotchedButton} from '../NotchedButton/NotchedButton';
import {Colors} from '../../constants/colors';
import zIndex from '@mui/material/styles/zIndex';

export const Modal = ({user, setUserData}: ModalProps) => {
  return (
    <ReactNativeModal animationType="fade" transparent={true} visible={!!user}>
      <View
        style={{
          width: deviceWidth,
          height: deviceHeight,
          justifyContent: 'center',
          padding: 20,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            height: deviceHeight / 4,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.cutOffTopLeft} />
          <View style={styles.cutOffBottomRight} />
          <View
            style={{
              flexDirection: 'row',
              width: '95%',
              gap: 20,
              padding: 5,
            }}>
            <View>
              <Image
                source={
                  user?.avatar
                    ? {uri: user.avatar}
                    : require('../../assets/images/avatar/defaultAvatar.png')
                }
                style={{
                  height: 80,
                  width: 80,
                  objectFit: 'cover',
                  borderRadius: 40,
                }}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <View
                style={{
                  flexDirection: 'column',
                  gap: 10,
                }}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  First Name
                </Text>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  Last Name
                </Text>
                <Text style={{color: 'black', fontWeight: '500'}}>Email</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  gap: 10,
                }}>
                <Text style={{color: 'black'}}>{user?.first_name}</Text>
                <Text style={{color: 'black'}}>{user?.last_name}</Text>
                <Text style={{color: 'black'}}>{user?.email}</Text>
              </View>
            </View>
          </View>
          <Text style={{color: 'white'}}>Modal</Text>
          <NotchedButton
            text="Close"
            onPress={() => setUserData(undefined)}
            style={{
              backgroundColor: Colors.mainColor,
              paddingHorizontal: 30,
              paddingVertical: 10,
              width: '35%',
              zIndex: 100,
            }}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};
