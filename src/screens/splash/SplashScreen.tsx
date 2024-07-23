import {Alert, Image, Text, View} from 'react-native';
import {Colors} from '../../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {deviceHeight, deviceWidth} from '../../constants/dimensions';
import {useEffect} from 'react';
import {getAllUsers} from '../../services/APIService';
import {SplashScreenProps} from './SplashScreen.types';
import {useDispatch} from 'react-redux';
import {setUsers} from '../../redux/reducers/UsersReducer/UserReducer';

export const SplashScreen = ({navigation}: SplashScreenProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUsersAction();
  }, []);

  const getAllUsersAction = async () => {
    try {
      const response = await getAllUsers();
      dispatch(setUsers(response.data));
      setTimeout(() => {
        navigation.navigate('Home');
      }, 3000);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch users');
      setTimeout(() => {
        navigation.navigate('Home');
      }, 3000);
    }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.mainColor,
        height: deviceHeight,
        width: deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../assets/images/logo/logo.png')}
        style={{width: 200, height: 235, marginBottom: 20}}
      />
      <Text style={{color: 'white', fontSize: 26}}>LAYOUTindex Demo</Text>
    </SafeAreaView>
  );
};
