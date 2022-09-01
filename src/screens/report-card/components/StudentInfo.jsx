import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ToastAndroid } from "react-native";
import {
  Avatar,
  Text,
  IconButton,
  Title,
  useTheme,
} from "react-native-paper";
import { useSelector } from "react-redux";
import ContentLoader from "react-native-easy-content-loader";

import { systemAPI } from "../../../apis";
import { useToken } from "../../../hooks/useToken";

export default function StudentInfo({ studentData }) {
  const userRedux = useSelector((state) => state.user.user);
  const { colors } = useTheme();
  const [token] = useToken();
  const [student, setStudent] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!studentData) getStudentData(); // role === 'STUDENT'
    else setStudent(studentData); // role === 'PARENT'
  }, []);

  const getStudentData = async () => {
    setLoading(true);
    // const savedStudent = await AsyncStorage.getItem('user');
    // setStudent(JSON.parse(savedStudent));
    setStudent(userRedux);
    setLoading(false);
  };

  const confirmSendEmail = async () => {
    // const savedUser = await AsyncStorage.getItem('user');
    // const user = JSON.parse(savedUser);
    const user = userRedux;
    const studentName =
      student.full_name ?? `${student.first_name} ${student.last_name}`;

    Alert.alert(
      "Confirm send",
      `Send ${studentName}'s report card to "${user.email}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Send",
          onPress: () => sendEmail(),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const sendEmail = async () => {
    try {
      await systemAPI.sendReportCard(token, { student_id: student.id });
      ToastAndroid.show("Email sent!", ToastAndroid.SHORT);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  const initialName = (user) => {
    var initName = "";
    if (user.first_name) initName = initName + user.first_name[0];
    if (user.last_name) initName = initName + user.last_name[0];
    return initName.toLocaleUpperCase();
  };
  return (
    <>
      {isLoading ? (
        <>
          <View
            style={{
              paddingLeft: 16,
              backgroundColor: "#fff",
              marginTop: 10,
            }}
          >
            <ContentLoader
              active
              avatar
              aSize={48}
              pRows={1}
              pWidth={[100]}
              aShape={"circle"}
            />
          </View>
          {/* <View
            style={{
              paddingLeft: 16,
              backgroundColor: "#fff",
              marginTop: 20,
              // paddingVertical: 16,
            }}
          >
            <ContentLoader
              tHeight={8}
              pRows={3}
              pWidth={[SCREEN_WIDTH - 35]}
              tWidth={SCREEN_WIDTH - 35}
            />
          </View> */}
        </>
      ) : (
        <View style={styles.container}>
          <View style={[styles.row, { marginBottom: 16 }]}>
            {userRedux.avatar_url != "" ? (
              <View style={{ width: 48, height: 48, borderRadius: 25, backgroundColor: "#fd3667", justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: '#fff' }}>{initialName(userRedux)}</Text>
              </View>
            ) : (
              <Avatar.Image
                size={48}
                source={{ uri: userRedux.avatar_url }}
                style={styles.avatar}
              />
            )}
            <View style={{ flex: 1 }}>
              <Title>
                {student.full_name ??
                  `${userRedux.first_name} ${userRedux.last_name}`}
              </Title>
              <Text>Class {student.class_name}</Text>
            </View>
            <IconButton
              icon="email-fast-outline"
              color={colors.primary}
              size={32}
              onPress={confirmSendEmail}
            />
          </View>
          {/* <View style={[styles.row, styles.infoContainer]}>
            <Text style={styles.infoTitle}>Date of Birth</Text>
            <Text style={{ color: colors.secondary }}>
              {moment(student.date_of_birth).format("D MMM YYYY")}
            </Text>
          </View>
          <View style={[styles.row, styles.infoContainer]}>
            <Text style={styles.infoTitle}>Email</Text>
            <Text style={{ color: colors.secondary }}>{student.email}</Text>
          </View>
          <View style={[styles.row, styles.infoContainer]}>
            <Text style={styles.infoTitle}>Phone</Text>
            <Text style={{ color: colors.secondary }}>{student.phone}</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={styles.infoTitle}>Parent/Guardian</Text>
            <Text style={{ color: colors.secondary }}>
              {student.parent_name}
            </Text>
          </View> */}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24 },
  row: { flexDirection: "row", alignItems: "center" },
  avatar: { marginRight: 16 },
  infoContainer: { borderBottomWidth: 1, borderBottomColor: "#e8eaec" },
  infoTitle: { fontWeight: "600", width: "50%", paddingVertical: 8 },
});
