import { useLayoutEffect } from 'react';
import { FlatList } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';

import StyledScreen from '../../components/wrappers/StyledScreen';
import ChatListItem from './components/ChatListItem';

export default function ChatListScreen({ navigation }) {
  const conversations = useSelector((state) => state.chat.conversations);

  /* set header button */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="magnify"
          color="white"
          size={28}
          onPress={() => navigation.navigate('UserList')}
          style={{ marginTop: 0, marginRight: -4 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <StyledScreen>
      <FlatList
        data={conversations}
        renderItem={({ item }) => <ChatListItem conversation={item} />}
      />
    </StyledScreen>
  );
}
