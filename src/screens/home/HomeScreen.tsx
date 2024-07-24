import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
  BackHandler,
  Image,
} from 'react-native';

import {HomeScreenProps} from './HomeScreen.types';
import {Colors} from '../../constants/colors';
import {color} from '@mui/system';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './HomeScreen.styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store.types';
import {UserProps} from '../../services/APIService.types';
import {addFavorite} from '../../redux/reducers/FavoritesReducer/FavoritesReducer';
import {Modal} from '../../components/Modal/Modal';
import {NotchedButton} from '../../components/NotchedButton/NotchedButton';
import {getSingleUser} from '../../services/APIService';
import {addUser} from '../../redux/reducers/UsersReducer/UserReducer';

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([]);
  const [userData, setUserData] = useState<UserProps>();

  const dispatch = useDispatch();

  const {users} = useSelector((state: RootState) => state.users);
  const {favorites} = useSelector((state: RootState) => state.favorites);

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
        <TouchableOpacity
          onPress={() => navigation.navigate('Favorites')}
          style={{
            marginRight: 5,
            borderWidth: 1,
            borderColor: Colors.starContainerColor,
            padding: 8,
          }}>
          <Image
            source={require('../../assets/images/star/star.png')}
            style={{width: 12, height: 12, tintColor: Colors.starColor}}
          />
        </TouchableOpacity>
      ),
      headerBack: () => null,
      headerLeft: () => null,
    });
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
    searchById(users, searchText);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return true;
      });
    };
  }, []);

  useEffect(() => {
    if (searchText.length === 0) {
      setFilteredUsers(users);
    }
  }, [searchText]);

  const searchById = async (users: UserProps[], searchText: string) => {
    if (searchText === '') {
      setFilteredUsers(users);
    } else {
      const filterBySearch = users.filter(user =>
        user.id.toString().includes(searchText),
      );
      setFilteredUsers(filterBySearch);
      try {
        const res = await getSingleUser(searchText);
        if (res.data.id) {
          setUserData(res.data);
          if (!filterBySearch.find(item => item.id === res.data.id)) {
            dispatch(addUser(res.data));
            setFilteredUsers(
              [...filterBySearch, res.data].sort((a, b) => a.id - b.id),
            );
          }
        }
      } catch (error) {
        if (filterBySearch.length !== 0) {
          setUserData(filterBySearch[0]);
        }
        console.log('error', error);
      }
    }
  };

  const addFavoriteUser = (user: UserProps) => {
    if (favorites.find(item => item.id === user.id)) {
      return Alert.alert('Error', 'This user is already added');
    }
    dispatch(addFavorite(user));
    Alert.alert('Success', 'User added to favorites');
  };

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
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => setUserData(item)}
            style={{
              flexDirection: 'row',
              gap: 16,
              paddingLeft: 20,
              paddingTop: 20,
              width: '75%',
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
              <Text
                style={{
                  color: 'black',
                }}>
                {item.id}
              </Text>
              <Text
                style={{
                  color: 'black',
                }}>
                {item.first_name}
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: '25%',
            }}>
            <TouchableOpacity
              onPress={() => addFavoriteUser(item)}
              style={{
                height: 90,
                width: '100%',
                borderLeftColor: Colors.backgroundGray,
                borderLeftWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: Colors.addGreenColor, fontWeight: 'bold'}}>
                Add
              </Text>
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
          placeholderTextColor={Colors.placeHolderColor}
          keyboardType="numeric"
          style={{
            backgroundColor: Colors.backgroundGray,
            borderWidth: 1,
            borderColor: Colors.borderColor,
            paddingHorizontal: 10,
            width: '60%',
            borderRadius: 4,
            color: 'black',
          }}
          value={searchText}
          onChangeText={e => setSearchText(e)}
        />

        <NotchedButton
          onPress={() => searchById(users, searchText)}
          style={{
            backgroundColor: Colors.mainColor,
            paddingHorizontal: 30,
            paddingVertical: 10,
            width: '35%',
          }}
          text="Search"
        />
      </View>
      <View
        style={{
          padding: 20,
          paddingBottom: 20,
          height: '91%',
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
        {filteredUsers.length > 0 ? (
          <FlatList
            data={filteredUsers}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderItem(item)}
          />
        ) : (
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              textAlign: 'center',
              justifyContent: 'center',
            }}>
            {searchText.length > 0
              ? 'No users found by ID'
              : 'No users available'}
          </Text>
        )}
      </View>
      <Modal user={userData} setUserData={setUserData} />
    </SafeAreaView>
  );
};
