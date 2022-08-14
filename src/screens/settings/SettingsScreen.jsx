import { useEffect, useLayoutEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  FlatList,
  Alert,
  Linking,
  View,
  Clipboard,
} from 'react-native';
import { Avatar, Title, List, useTheme, Button } from 'react-native-paper';
import ContentLoader from 'react-native-easy-content-loader';

import StyledScreen from '../../components/wrappers/StyledScreen';
import { useToken } from '../../hooks/useToken';

const EMAIL = `giaphiendev@gmail.com`;

export default function SettingsScreen({ navigation }) {
  const { colors } = useTheme();
  const [token, setToken] = useToken();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const tabs = [
    {
      id: 1,
      title: 'Edit Profile',
      leftIcon: 'account-cog-outline',
      rightIcon: 'chevron-right',
      handelPress: () => navigation.navigate('Profile'),
    },
    {
      id: 2,
      title: 'FeedBack',
      leftIcon: 'message-alert',
      rightIcon: 'chevron-right',
      handelPress: () => navigation.navigate('Feedback'),
    },
    {
      id: 3,
      title: 'Get Support',
      leftIcon: 'account-question-outline',
      rightIcon: 'chevron-right',
      handelPress: () => {
        showAlert('hello');
      },
    },
  ];

  useLayoutEffect(() => {
    console.log('aba');
    getUserData();
  }, []);

  const getUserData = async () => {
    setIsLoading(true);
    const savedStudent = await AsyncStorage.getItem('user');
    setUser(JSON.parse(savedStudent));
    setIsLoading(false);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('access');
    await AsyncStorage.removeItem('user');
    setToken(null);
    navigation.replace('Login');
  };

  const copyEmail = () => {
    Clipboard.setString(EMAIL);
    Alert.alert(
      'Copy Successfully',
      EMAIL,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const showAlert = (message) => {
    Alert.alert(
      'Get Support',
      message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Copy Email',
          onPress: copyEmail,
        },
        {
          text: 'Send Email',
          onPress: () => {
            Linking.openURL(`mailto:${EMAIL}`);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const renderClassItem = ({ item }) => {
    return (
      <List.Item
        key={item.id}
        title={item.title}
        onPress={item.handelPress}
        style={{ ...styles.classItem }}
        left={(props) => <List.Icon {...props} icon={item.leftIcon} />}
        right={(props) => <List.Icon {...props} icon={item.rightIcon} />}
      />
    );
  };

  return (
    <>
      {isLoading ? (
        <>
          <View
            style={{
              paddingLeft: 16,
              backgroundColor: '#fff',
              marginTop: 10,
            }}
          >
            <ContentLoader
              active
              avatar
              aSize={40}
              pRows={1}
              pWidth={[100]}
              aShape={'circle'}
            />
          </View>
        </>
      ) : (
        <StyledScreen style={styles.container}>
          <View>
            <View style={[styles.row, { marginBottom: 16 }]}>
              <Avatar.Image
                size={40}
                source={{ uri: user.avatar_url }}
                style={styles.avatar}
              />
              <View>
                <Title>
                  {user.first_name} {user.last_name}
                </Title>
                <Text>{user.email}</Text>
              </View>
            </View>
            <View>
              <FlatList
                data={tabs}
                renderItem={renderClassItem}
                contentContainerStyle={styles.horizontalFlatlist}
              />
            </View>
          </View>
          <View style={{ marginTop: 'auto', paddingBottom: 20 }}>
            <Button
              style={styles.btnLogOut}
              color={colors.primary}
              onPress={logout}
            >
              Log out
            </Button>
          </View>
        </StyledScreen>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    borderTopRightRadius: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  avatar: { marginRight: 16 },
  horizontalFlatlistContainer: {
    height: 50,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  horizontalFlatlist: {
    marginBottom: 5,
  },
  classItem: {
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 5,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  btnLogOut: {
    marginTop: 10,
  },
});
