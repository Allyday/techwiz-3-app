import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, List, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { getChatUserInfo } from '../../../utils/chat.utils';
import { ROLES } from '../../../utils/constants';
import { getInitials } from './ChatListItem';

export default function UserListItem({ user }) {
  const { colors} = useTheme();
  const navigation = useNavigation();
  const { title, description } = getChatUserInfo(user);

  const onSelectUser = async () => {
    navigation.navigate('ChatDetails', { otherUser: user });
  };

  const avatarBackgroundColor = useMemo(() => {
    switch (user.role) {
      case ROLES.TEACHER:
        return colors.secondary;
      case ROLES.STUDENT:
        return colors.primary;
      case ROLES.PARENT:
        return colors.darkBlue;
    }
  }, [user.role]);

  return (
    <List.Item
      id={user.id}
      title={title}
      description={description}
      onPress={onSelectUser}
      style={styles.userItem}
      left={(props) => {
        if (user.avatar_url)
          return (
            <Avatar.Image
              {...props}
              size={44}
              source={{ uri: user.avatar_url }}
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
    />
  );
}

const styles = StyleSheet.create({
  userItem: {
    paddingHorizontal: 12,
  },
  avatar: {
    marginTop: 4,
    marginLeft: 8,
    marginRight: 4,
  },
});
