import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { useDispatch, useSelector } from 'react-redux';

import { userAPI } from '../../apis';
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
    { name: 'email', disabled: true },
    { name: 'first_name', disabled: false },
    { name: 'last_name', disabled: false },
    { name: 'address', disabled: false },
    { name: 'phone', disabled: false },
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
      profileUser.date_of_birth = moment(dateOfBirth).format('YYYY-MM-DD');
      const { data } = await userAPI.updateProfileUser(profileUser, token);
      const { payload } = data;
      setProfileUser(payload);
      dispatch(saveUser(payload));
      ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
    } catch (error) {
      console.log(JSON.stringify(error));
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

  return (
    <StyledScreen
      style={styles.container}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      scrollable
    >
      <View style={styles.wrapperImage}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: profileUser.avatar_url,
          }}
        />
      </View>
      {fixedData.map((field, index) => {
        return (
          <TextInput
            key={index}
            error={false}
            style={styles.textInput}
            label={field.name.toUpperCase()}
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
