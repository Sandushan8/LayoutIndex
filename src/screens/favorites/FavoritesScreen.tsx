import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
  Image,
} from 'react-native';

import {FavoritesScreenProps} from './FavoritesScreen.types';
import {Colors} from '../../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './FavoritesScreen.styles';
import {UserProps} from '../../services/APIService.types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store.types';
import {removeFavorite} from '../../redux/reducers/FavoritesReducer/FavoritesReducer';
import {NotchedButton} from '../../components/NotchedButton/NotchedButton';

export const FavoritesScreen = ({navigation}: FavoritesScreenProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredFavorites, setFilteredFavorites] = useState<UserProps[]>([]);

  const dispatch = useDispatch();

  const {favorites} = useSelector((state: RootState) => state.favorites);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Favourites',
      headerStyle: {
        backgroundColor: Colors.mainColor,
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../assets/images/back/back.png')}
            style={{
              tintColor: 'white',
            }}
          />
        </TouchableOpacity>
      ),
    });
    searchById(favorites, searchText);
  }, []);

  useEffect(() => {
    if (searchText.length === 0) {
      setFilteredFavorites(favorites);
    }
  }, [searchText]);

  const searchById = (favorites: UserProps[], searchText: string) => {
    if (searchText === '') {
      setFilteredFavorites(favorites);
    } else {
      const filterBySearch = favorites.filter(user =>
        user.id.toString().includes(searchText),
      );
      setFilteredFavorites(filterBySearch);
    }
  };

  const removeFavoriteUser = (user: UserProps) => {
    dispatch(removeFavorite(user));
    Alert.alert('Success', 'User removed from favourites');
    setFilteredFavorites(favorites.filter(favorite => favorite.id !== user.id));
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
          </View>

          <View>
            <TouchableOpacity
              onPress={() => removeFavoriteUser(item)}
              style={{
                height: 90,
                width: 90,
                borderLeftColor: Colors.backgroundGray,
                borderLeftWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: Colors.removeRedColor, fontWeight: 'bold'}}>
                Remove
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
          onPress={() => searchById(favorites, searchText)}
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
          paddingBottom: 0,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 20,
            color: 'black',
          }}>
          FAVOURITE USERS
        </Text>
        {filteredFavorites.length > 0 ? (
          <FlatList
            data={filteredFavorites}
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
              ? 'No user found by ID'
              : 'No favourite users'}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};
