import { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';

import { useToken } from '../../hooks/useToken';
import { userAPI } from '../../apis';
import StyledScreen from '../../components/wrappers/StyledScreen';
import UserListItem from './components/UserListItem';

export default function UserListScreen({ navigation }) {
  const [userToken] = useToken();
  const [searchString, setSearchString] = useState('');
  const [users, setUsers] = useState([]);

  /* set header button */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <></>,
      headerRight: () => (
        <Button
          color="white"
          onPress={() => navigation.pop()}
          style={{ marginTop: 0, marginRight: -4 }}
          uppercase={false}
        >
          Cancel
        </Button>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(getUsers, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchString]);

  const getUsers = async () => {
    const { data } = await userAPI.searchUserChat(userToken, {
      limit: 10,
      name: searchString,
    });

    const formattedUsers = data.payload.map(({ user_id, ...data }) => ({
      id: user_id,
      ...data,
    }));

    setUsers(formattedUsers);
  };

  return (
    <StyledScreen hasBottomInset>
      <Searchbar
        placeholder="Search name, email"
        onChangeText={setSearchString}
        value={searchString}
      />
      <FlatList
        data={users}
        renderItem={({ item }) => <UserListItem user={item} />}
      />
    </StyledScreen>
  );
}
