import { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, ToastAndroid, View } from "react-native";
import {
  Button,
  List,
  Text,
  Title,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";

import StyledScreen from "../../components/wrappers/StyledScreen";
import { revisionAPI, systemAPI } from "../../apis";
import { useToken } from "../../hooks/useToken";
import UpdateScheduleModal from "./components/UpdateScheduleModal";
import ContentLoader from "react-native-easy-content-loader";

const formatLessonsIntoClasses = (lessons) => {
  const classes = [];
  for (let lesson of lessons) {
    const { name_teacher, name_subject, id_subject, time_table } = lesson;
    const currentClass = classes.find((cls) => cls.id_subject === id_subject);
    if (!currentClass) {
      classes.push({
        name_teacher,
        name_subject,
        id_subject,
        lessons: [time_table],
      });
    } else {
      currentClass.lessons.push(time_table);
    }
  }
  return classes;
};

/**
 *
 * @param {*} timeString format HH:mm:ss
 * @returns HH.mm
 */
const formatTimeString = (timeString) =>
  timeString?.split(":").slice(0, 2).join(".");

const getDurationString = ({ time_start, time_end }) => {
  const hourDiff = time_end?.slice(0, 2) - time_start?.slice(0, 2);
  const minuteDiff = time_end?.slice(3, 5) - time_start?.slice(3, 5);
  const durationInMinutes = hourDiff * 60 + minuteDiff;
  const hour = Math.floor(durationInMinutes / 60);
  const minute = durationInMinutes % 60;
  const hourString = hour ? hour + " hr " : "";
  const minuteString = minute ? minute + " min" : "";
  return hourString + minuteString;
};

export default function RevisionScreen({ navigation }) {
  const userRedux = useSelector((state) => state.user.user);
  const { colors } = useTheme();
  const [subjects, setSubjects] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [currentSubject, setCurrentSubject] = useState({ lessons: [] });
  const [currentLesson, setCurrentLesson] = useState({});
  const [isScheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [token] = useToken();

  /* set header button */
  useLayoutEffect(() => {
    Promise.all([getRevisionClasses(), getUserData()]).finally(() =>
      setLoading(false)
    );

    if (user.role === "STUDENT")
      navigation.setOptions({
        headerRight: () => (
          <Button
            compact
            uppercase={false}
            onPress={confirmSendEmail}
            style={{ marginRight: 8 }}
            color="white"
          >
            Save to email
          </Button>
        ),
      });
  }, [navigation]);

  const getRevisionClasses = async () => {
    const { data } = await revisionAPI.getAll(token);
    const revisionClasses = formatLessonsIntoClasses(data.revision_class);
    setSubjects(revisionClasses);
  };

  const getUserData = async () => {
    // const savedUser = await AsyncStorage.getItem("user");
    // setUser(JSON.parse(savedUser));
    setUser(userRedux);
  };

  const confirmSendEmail = () => {
    Alert.alert(
      "Confirm send",
      `Send revision class schedules to "${user.email}"?`,
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
    await systemAPI.sendInfoRevision(token);
    ToastAndroid.show("Email sent!", ToastAndroid.SHORT);
  };

  const openScheduleModal = ({ subject, lesson }) => {
    setCurrentSubject(subject);
    setCurrentLesson(lesson);
    setScheduleModalVisible(true);
  };

  const renderSubjectItem = (item) => {
    return (
      <>
        {isLoading ? (
          <View
            style={{
              paddingRight: 16,
              backgroundColor: "#fff",
              marginTop: 10,
              paddingVertical: 16,
            }}
          >
            <ContentLoader active pRows={0} pWidth={[100]} />
          </View>
        ) : (
          <List.Accordion
            key={item.id_subject}
            id={item.id_subject}
            title={item.name_subject}
          >
            <View style={styles.accordionContent}>
              <View style={styles.sectionTitleContainer}>
                <Title style={styles.title}>Teacher</Title>
              </View>
              <Text>{item.name_teacher}</Text>
              <View style={styles.sectionTitleContainer}>
                <Title style={styles.title}>Weekly Schedule</Title>
                {user.role === "TEACHER" && (
                  <Text>(Tap on lesson to edit)</Text>
                )}
              </View>
              {item.lessons.map((lesson) => (
                <TouchableRipple
                  key={`${item.id_subject}${lesson.id}`}
                  {...(user.role === "TEACHER" && {
                    onPress: () => openScheduleModal({ subject: item, lesson }),
                  })}
                  rippleColor={colors.darkGreen}
                  style={[
                    styles.lessonItemContainer,
                    { backgroundColor: colors.lightGreen },
                  ]}
                >
                  <View style={styles.lessonItem}>
                    <Title style={styles.lessonInfoContainer}>
                      {lesson.day_of_week}
                    </Title>
                    <View style={styles.verticalDivider} />
                    <View style={[styles.lessonInfoContainer, { flex: 3 }]}>
                      <Text style={styles.lessonTimes}>
                        {formatTimeString(lesson.time_start)} -{" "}
                        {formatTimeString(lesson.time_end)}
                      </Text>
                      <Text>{getDurationString(lesson)}</Text>
                    </View>
                  </View>
                </TouchableRipple>
              ))}
            </View>
          </List.Accordion>
        )}
      </>
    );
  };

  return (
    <StyledScreen scrollable>
      <List.AccordionGroup>
        {subjects.map(renderSubjectItem)}
      </List.AccordionGroup>
      <UpdateScheduleModal
        subject={currentSubject}
        lesson={currentLesson}
        isVisible={isScheduleModalVisible}
        setVisible={setScheduleModalVisible}
      />
    </StyledScreen>
  );
}

const styles = StyleSheet.create({
  accordionContent: {
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  sendEmailBtn: {
    position: "absolute",
    right: 24,
    top: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  flatlist: {
    flexGrow: 1,
    paddingBottom: 12,
  },
  sectionTitleContainer: {
    marginTop: 16,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lessonItemContainer: {
    borderRadius: 12,
    marginVertical: 8,
    overflow: "hidden",
  },
  lessonItem: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  lessonInfoContainer: {
    flex: 2,
    paddingVertical: 16,
  },
  lessonTimes: { fontWeight: "600", fontSize: 18, marginBottom: 8 },
  verticalDivider: {
    width: 2,
    backgroundColor: "white",
    height: "100%",
    marginHorizontal: 16,
  },
});
