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
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Favorites')}
          style={styles.favoriteButton}>
          <Image
            source={require('../../assets/images/star/star.png')}
            style={styles.favoriteIcon}
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
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => setUserData(item)}
            style={styles.textContainer}>
            <View style={styles.innerTextContainer}>
              <Text style={styles.boldText}>ID</Text>
              <Text style={styles.boldText}>Name</Text>
            </View>
            <View style={styles.innerTextContainer}>
              <Text style={styles.blackText}>{item.id}</Text>
              <Text style={styles.blackText}>{item.first_name}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.addButtonContainer}>
            <TouchableOpacity
              onPress={() => addFavoriteUser(item)}
              style={styles.addButton}>
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
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="User ID"
          placeholderTextColor={Colors.placeHolderColor}
          keyboardType="numeric"
          style={styles.searchTextBox}
          value={searchText}
          onChangeText={e => setSearchText(e)}
        />

        <NotchedButton
          onPress={() => searchById(users, searchText)}
          style={styles.notchButton}
          text="Search"
        />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.headerText}>AVAILABLE USERS</Text>
        {filteredUsers.length > 0 ? (
          <FlatList
            data={filteredUsers}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderItem(item)}
          />
        ) : (
          <Text style={styles.noDataText}>
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
