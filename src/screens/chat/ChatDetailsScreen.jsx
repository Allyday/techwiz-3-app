import React, { useCallback, useLayoutEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { chatAPI } from '../../apis';
import { getChatUserInfo } from '../../utils/chat.utils';
import useMessages from '../../hooks/useMessages';
import { ROLES } from '../../utils/constants';
import StyledScreen from '../../components/wrappers/StyledScreen';

export default function ChatScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { otherUser } = route.params;
  const userData = useSelector((state) => state.user.user);
  const messages = useSelector((state) => state.chat.messages);
  useMessages(otherUser);

  /* dynamic header */
  useLayoutEffect(() => {
    const { title, description } = getChatUserInfo(otherUser);

    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubtitle}>{description}</Text>
        </View>
      ),
    });
  }, []);

  const textBubbleBackgroundColor = useMemo(() => {
    switch (otherUser.role) {
      case ROLES.TEACHER:
        return colors.secondary;
      case ROLES.STUDENT:
        return colors.primary;
      case ROLES.PARENT:
        return colors.darkBlue;
    }
  }, [otherUser.role]);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: textBubbleBackgroundColor,
          },
        }}
      />
    );
  };

  const onSend = useCallback((messages = []) => {
    const { _id, text, user } = messages[0];

    chatAPI.createMessage({
      _id,
      text,
      user,
      otherUser,
    });
  }, []);

  return (
    <StyledScreen>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userData.id, ...userData }}
        renderAvatar={null}
        renderBubble={renderBubble}
        wrapInSafeArea={false}
      />
    </StyledScreen>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'white',
  },
});
