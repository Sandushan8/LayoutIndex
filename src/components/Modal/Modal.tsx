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
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.cutOffTopLeft} />
          <View style={styles.cutOffBottomRight} />
          <View style={styles.mainView}>
            <View>
              <Image
                source={
                  user?.avatar
                    ? {uri: user.avatar}
                    : require('../../assets/images/avatar/defaultAvatar.png')
                }
                style={styles.avatar}
              />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.innerTextContainer}>
                <Text style={styles.boldText}>First Name</Text>
                <Text style={styles.boldText}>Last Name</Text>
                <Text style={styles.boldText}>Email</Text>
              </View>
              <View style={styles.innerTextContainer}>
                <Text style={styles.blackText}>{user?.first_name}</Text>
                <Text style={styles.blackText}>{user?.last_name}</Text>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.emailText}>
                  {user?.email}
                </Text>
              </View>
            </View>
          </View>
          <NotchedButton
            text="Close"
            onPress={() => setUserData(undefined)}
            style={styles.notchedButton}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};
