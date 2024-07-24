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
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../assets/images/back/back.png')}
            style={styles.backIcon}
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
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <View style={styles.textContainer}>
            <View style={styles.innerTextContainer}>
              <Text style={styles.boldText}>ID</Text>
              <Text style={styles.boldText}>Name</Text>
            </View>
            <View style={styles.innerTextContainer}>
              <Text style={styles.blackText}>{item.id}</Text>
              <Text style={styles.blackText}>{item.first_name}</Text>
            </View>
          </View>

          <View style={styles.removeButtonContainer}>
            <TouchableOpacity
              onPress={() => removeFavoriteUser(item)}
              style={styles.removeButton}>
              <Text style={styles.removeText}>Remove</Text>
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
          style={styles.searchText}
          value={searchText}
          onChangeText={e => setSearchText(e)}
        />

        <NotchedButton
          onPress={() => searchById(favorites, searchText)}
          style={styles.notchedButton}
          text="Search"
        />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.headerText}>FAVOURITE USERS</Text>
        {filteredFavorites.length > 0 ? (
          <FlatList
            data={filteredFavorites}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderItem(item)}
          />
        ) : (
          <Text style={styles.noDataText}>
            {searchText.length > 0
              ? 'No user found by ID'
              : 'No favourite users'}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};
