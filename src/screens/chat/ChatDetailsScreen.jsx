import React, { useCallback, useLayoutEffect, useMemo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { HeaderBackButton } from '@react-navigation/elements';

import { chatAPI } from '../../apis';
import { getChatUserInfo } from '../../utils/chat.utils';
import { useToken } from '../../hooks/useToken';
import useMessages from '../../hooks/useMessages';
import { ROLES } from '../../utils/constants';
import StyledScreen from '../../components/wrappers/StyledScreen';

export default function ChatScreen({ route, navigation }) {
  const { colors } = useTheme();
  const [token] = useToken();
  const { otherUser } = route.params;
  const userData = useSelector((state) => state.user.user);
  const details = useSelector((state) => state.user.details);
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
      // dont go back to search screen
      headerLeft: (props) => (
        <HeaderBackButton {...props} onPress={navigation.popToTop} />
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

  const onSend = useCallback(
    (messages = []) => {
      const { _id, text, user } = messages[0];
      if (details.length) user.details = details;

      chatAPI.createMessage(
        {
          _id,
          text,
          user,
          otherUser,
        },
        token
      );
    },
    [details]
  );

  return (
    <StyledScreen hasBottomInset>
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
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
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
