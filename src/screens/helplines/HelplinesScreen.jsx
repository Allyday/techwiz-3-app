import React from "react";
import {
  StyleSheet,
  Linking,
  Alert,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { List } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useToken } from "../../hooks/useToken";

import StyledScreen from "../../components/wrappers/StyledScreen";
import helplinesAPI from "../../apis/helplinesAPI";

export default function HelplinesScreen({ navigation }) {
  const [dsHelpline, setHelpline] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [token] = useToken();

  React.useEffect(() => {
    const getData = async () => {
      const resHelpline = await helplinesAPI.getAll(token);
      if (resHelpline.data.data.length > 0) {
        const { data } = resHelpline.data;
        setHelpline(data);
        setIsLoading(true);
      } else {
        console.log("sai mật khẩu rồi mày ơi");
      }
    };
    getData();
  }, []);

  const callNumber = (phone) => {
    console.log("callNumber ----> ", phone);
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available !!!");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <StyledScreen scrollable style={styles.container}>
      <List.Accordion
        style={{ backgroundColor: '#fff' }}
        title="Teacher"
        titleStyle={{
          color: '#473f97',
        }}
        left={() => (
          <FontAwesome5
            style={{ marginHorizontal: 12 }}
            name="user-graduate"
            size={24}
            color="#473f97"
          />
        )}
      >
        {isLoading &&
          dsHelpline
            .filter((person) => person.type === 'TEACHER')
            .map((v, k) => (
              <List.Item
                style={{
                  marginLeft: 28,
                  backgroundColor: '#d4f5ff',
                  marginRight: 28,
                  borderRadius: 12,
                  marginBottom: 10,
                }}
                title={v.name}
                description={v.title + ' | ' + v.phone}
                right={() => (
                  <AntDesign
                    style={{ marginTop: 12, marginRight: 8 }}
                    name="phone"
                    size={24}
                    color="#473f97"
                  />
                )}
              />
            ))}
      </List.Accordion>
      <View style={{ marginBottom: 30, borderTopRightRadius: 30 }}>
        <List.Accordion
          style={{ backgroundColor: '#fff' }}
          title="Staff"
          titleStyle={{
            color: '#473f97',
          }}
          left={() => (
            <FontAwesome5
              style={{ marginHorizontal: 12 }}
              name="user-tie"
              size={24}
              color="#473f97"
            />
          )}
        >
          {isLoading &&
            dsHelpline
              .filter((person) => person.type === 'STAFF')
              .map(
                (v, k) =>
                  <List.Item
                    style={{
                      marginLeft: 28,
                      backgroundColor: '#ffd4d4',
                      marginRight: 28,
                      borderRadius: 12,
                      marginBottom: 10,
                    }}
                    title={v.name}
                    description={v.title + ' | ' + v.phone}
                    right={() => (
                      <TouchableOpacity onPress={() => callNumber(v.phone)}>
                        <AntDesign
                          style={{ marginTop: 12, marginRight: 8 }}
                          name="phone"
                          size={24}
                          color="#473f97"
                        />
                      </TouchableOpacity>
                    )}
                  />
              )}
        </List.Accordion>
      </View>
    </StyledScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    borderTopRightRadius: 30,
  },
  horizontalFlatlistContainer: {
    height: 40,
    marginHorizontal: -24,
  },
  horizontalFlatlist: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  subjectChip: {
    marginRight: 8,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 12,
  },
  flatlist: {
    flexGrow: 1,
    paddingBottom: 12,
  },
  classItem: {
    padding: 16,
    marginVertical: 6,
    borderRadius: 12,
  },
});
