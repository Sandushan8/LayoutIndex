import {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';

import {HomeScreenProps, UserProps} from './HomeScreen.types';
import {Colors} from '../../constants/colors';
import {color} from '@mui/system';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './HomeScreen.styles';

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const DummyData: UserProps[] = [
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Jane Doe',
    },
    {
      id: 3,
      name: 'John Smith',
    },
    {
      id: 4,
      name: 'Jane Smith',
    },
  ];
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'User Information',
      headerStyle: {
        backgroundColor: Colors.mainColor,
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerRight: () => (
        <Text
          style={{color: 'white', marginRight: 20}}
          onPress={() => navigation.navigate('Favorites')}>
          Favorites
        </Text>
      ),
      headerBack: () => null,
    });
  }, []);
  const renderItem = (item: UserProps) => {
    return (
      <View
        style={{
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
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 16,
              paddingLeft: 20,
              paddingTop: 20,
            }}>
            <View style={{flexDirection: 'column', gap: 10}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                ID
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Name
              </Text>
            </View>
            <View style={{flexDirection: 'column', gap: 10}}>
              <Text>{item.id}</Text>
              <Text>{item.name}</Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={{
                height: 90,
                width: 90,
                borderLeftColor: Colors.backgroundGray,
                borderLeftWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'green', fontWeight: 'bold'}}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View
        style={{
          height: 80,
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          elevation: 5,
          backgroundColor: 'white',
          width: '100%',
        }}>
        <TextInput
          placeholder="User ID"
          style={{
            backgroundColor: Colors.backgroundGray,
            borderWidth: 1,
            borderColor: Colors.mainColor,
            paddingHorizontal: 10,
            width: '60%',
            borderRadius: 4,
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: Colors.mainColor,
            paddingHorizontal: 30,
            paddingVertical: 10,
            width: '35%',
          }}>
          <View style={styles.cutOffBottomRight} />
          <Text
            style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 20,
          paddingBottom: 0,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 20,
            color: 'black',
          }}>
          AVAILABLE USERS
        </Text>
        <FlatList
          data={DummyData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderItem(item)}
        />
      </View>
    </SafeAreaView>
  );
};
