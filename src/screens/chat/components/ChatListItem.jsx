import { useCallback, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Avatar, List, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import { getChatUserInfo } from '../../../utils/chat.utils';
import { ROLES } from '../../../utils/constants';

export default function ChatListItem({ conversation }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const otherUser = useMemo(
    () => conversation.members.find((u) => u.id !== user.id),
    [conversation, user.id]
  );
  const { title } = getChatUserInfo(otherUser);

  const lastMessageAt = moment(conversation.lastMessageAt);
  let lastMessageAtString;
  switch (true) {
    case lastMessageAt.isAfter(moment().startOf('minute')):
      lastMessageAtString = 'Just now';
      break;
    case lastMessageAt.isAfter(moment().startOf('day')):
      lastMessageAtString = lastMessageAt.format('hh:mm A');
      break;
    case lastMessageAt.isAfter(moment().startOf('week')):
      lastMessageAtString = lastMessageAt.format('ddd');
      break;
    case lastMessageAt.isAfter(moment().startOf('year')):
      lastMessageAtString = lastMessageAt.format('MMM DD');
      break;
    default:
      lastMessageAtString = lastMessageAt.format('DD/MM/YYYY');
      break;
  }

  const avatarBackgroundColor = useMemo(() => {
    switch (otherUser.role) {
      case ROLES.TEACHER:
        return colors.secondary;
      case ROLES.STUDENT:
        return colors.primary;
      case ROLES.PARENT:
        return colors.darkBlue;
    }
  }, [otherUser.role]);

  const onClickConversation = useCallback(() => {
    navigation.navigate('ChatDetails', { otherUser });
  }, [navigation, otherUser]);

  return (
    <List.Item
      id={user.id}
      title={title}
      onPress={onClickConversation}
      description={(props) => (
        <Text {...props} style={styles.lastMessage} numberOfLines={1}>
          {conversation.lastMessage}
        </Text>
      )}
      style={styles.chatItem}
      left={(props) => {
        if (otherUser.avatar_url)
          return (
            <Avatar.Image
              {...props}
              size={44}
              source={{ uri: otherUser.avatar_url }}
              style={styles.avatar}
            />
          );
        return (
          <Avatar.Text
            {...props}
            size={44}
            label={getInitials(title)}
            color="white"
            style={[styles.avatar, { backgroundColor: avatarBackgroundColor }]}
          />
        );
      }}
      right={(props) => (
        <Text {...props} style={styles.lastMessageAt}>
          {lastMessageAtString}
        </Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  chatItem: {
    paddingHorizontal: 12,
  },
  avatar: {
    marginTop: 4,
    marginLeft: 8,
    marginRight: 4,
  },
  lastMessage: {
    marginTop: 4,
    fontSize: 16,
    color: 'grey',
  },
  lastMessageAt: {
    marginLeft: 4,
    marginTop: 24,
    color: 'grey',
  },
});

const getInitials = (fullName) =>
  fullName
    .split(' ')
    .map((name) => name[0])
    .join('');
