import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  ToastAndroid,
  View,
  Text,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { useSelector, useDispatch } from 'react-redux';

import { chatAPI, userAPI } from '../../apis';
import StyledScreen from '../../components/wrappers/StyledScreen';
import { useToken } from '../../hooks/useToken';
import { saveUser } from '../../store-redux/actions/user';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ProfileScreen({ navigation }) {
  const userRedux = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [token] = useToken();
  const [profileUser, setProfileUser] = useState({});
  const [dateOfBirth, setDateOfBirth] = useState();
  const [open, setOpen] = useState(false);

  const fixedData = [
    { name: 'email', disabled: true, displayName: 'Email' },
    { name: 'first_name', disabled: false, displayName: 'First name' },
    { name: 'last_name', disabled: false, displayName: 'Last name' },
    { name: 'address', disabled: false, displayName: 'Address' },
    { name: 'phone', disabled: false, displayName: 'Phone number' },
  ];

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      // const { data } = await userAPI.profileUser(token);
      // const { payload } = data;
      setProfileUser(userRedux);
      setDateOfBirth(userRedux.date_of_birth);
    } catch (error) {
      console.log(error);
    }
  };
  const putProfile = async () => {
    try {
      const payloadUpdate = {
        date_of_birth: moment(dateOfBirth).format('YYYY-MM-DD'),
        first_name: profileUser.first_name,
        last_name: profileUser.last_name,
        address: profileUser.address,
        phone: profileUser.phone,
        avatar_url: profileUser.avatar_url,
        id: profileUser.id,
      };
      // return
      const { data } = await userAPI.updateProfileUser(payloadUpdate, token);
      const { payload } = data;
      setProfileUser(payload);
      await chatAPI.updateUserInfoChat({ user: payload });
      // update AsyncStorage
      dispatch(saveUser(payload));

      const savedStudent = JSON.parse(await AsyncStorage.getItem('user'));
      savedStudent.first_name = payload.first_name;
      savedStudent.last_name = payload.last_name;
      savedStudent.address = payload.address;
      savedStudent.phone = payload.phone;
      savedStudent.date_of_birth = payload.date_of_birth;
      await AsyncStorage.setItem('user', JSON.stringify(savedStudent));

      ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  const changeProfile = (text, type) => {
    setProfileUser({ ...profileUser, [type]: text });
  };

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    (params) => {
      setOpen(false);
      setDateOfBirth(params.date);
    },
    [setOpen]
  );
  const initialName = (user) => {
    var initName = '';
    // if (user.first_name) initName = initName + user.first_name[0];
    if (user.last_name) initName = initName + user.last_name[0];
    return initName.toLocaleUpperCase();
  };
  return (
    <StyledScreen
      style={styles.container}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      scrollable
    >
      <View style={styles.wrapperImage}>
        {profileUser.avatar_url == null ? (
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: '#fd3667',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
              {initialName(profileUser)}
            </Text>
          </View>
        ) : (
          <Image
            style={styles.tinyLogo}
            source={{
              uri: profileUser.avatar_url,
            }}
          />
        )}
      </View>
      {fixedData.map((field, index) => {
        return (
          <TextInput
            key={index}
            error={false}
            style={styles.textInput}
            label={field.displayName}
            value={profileUser[field.name]}
            onChangeText={(e) => changeProfile(e, field.name)}
            autoCapitalize="none"
            disabled={field.disabled}
          />
        );
      })}

      <TextInput
        onFocus={() => setOpen(true)}
        error={false}
        style={styles.textInput}
        label="BirthDay"
        value={moment(dateOfBirth).format('DD/MM/YYYY')}
        autoCapitalize="none"
      />
      <View style={styles.wrapperButton}>
        <Button
          onPress={putProfile}
          mode="contained"
          uppercase={false}
          style={{
            borderRadius: 50,
            paddingVertical: 5,
            marginHorizontal: 20,
            marginBottom: 20,
          }}
        >
          Update
        </Button>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          uppercase={false}
          style={{
            borderRadius: 50,
            paddingVertical: 5,
            marginHorizontal: 20,
            marginBottom: 20,
          }}
        >
          Cancel
        </Button>
      </View>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismiss}
        date={new Date(dateOfBirth)}
        onConfirm={onConfirm}
      />
    </StyledScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  wrapperColumn: {
    display: 'flex',
    alignItems: 'center',
  },
  textInput: {
    width: SCREEN_WIDTH - 80,
    backgroundColor: '#fff',
  },
  wrapperImage: {
    marginBottom: 15,
  },
  wrapperButton: {
    marginTop: 40,
    width: '100%',
    marginBottom: 20,
  },
  btnStyle: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'red',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
