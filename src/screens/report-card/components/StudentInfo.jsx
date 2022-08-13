import { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Avatar, Text, Title, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import ContentLoader from "react-native-easy-content-loader";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
export default function StudentInfo() {
  const { colors } = useTheme();
  const [student, setStudent] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getStudentData();
  }, []);

  const getStudentData = async () => {
    setLoading(true);
    const savedStudent = await AsyncStorage.getItem("user");
    setStudent(JSON.parse(savedStudent));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
              // paddingVertical: 16,
            }}
          >
            <ContentLoader
              active
              avatar
              aSize={40}
              pRows={1}
              pWidth={[100]}
              aShape={"circle"}
            />
          </View>
          <View
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
          </View>
        </>
      ) : (
        <View style={styles.container}>
          <View style={[styles.row, { marginBottom: 16 }]}>
            <Avatar.Image
              size={40}
              source={{ uri: student.avatar_url }}
              style={styles.avatar}
            />
            <View>
              <Title>
                {student.first_name} {student.last_name}
              </Title>
              <Text>Class {student.class_name}</Text>
            </View>
          </View>
          <View style={[styles.row, styles.infoContainer]}>
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
          </View>
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
