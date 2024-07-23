import {Image, Text, View} from 'react-native';
import {Colors} from '../../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {deviceHeight, deviceWidth} from '../../constants/dimensions';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/Routes.types';

export const SplashScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }, []);
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
