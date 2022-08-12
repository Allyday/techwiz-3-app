import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Chip, List, Title, useTheme } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
const subjects = [
  { id: "all", name: "All" },
  { id: "Maths 6", name: "Maths 6" },
  { id: "Maths 7", name: "Maths 7" },
  { id: "Maths 8", name: "Maths 8" },
  { id: "Maths 9", name: "Maths 9" },
];

const classesList = {
  "Maths 6": [
    {
      name_subject: "Maths 6",
      name_teacher: "Nguyễn Tiến Dương",
      time_table: {
        day_of_week: "Mon - Tue - Sat",
        time_start: "18.00",
        time_end: "20.00",
      },
    },

    {
      name_subject: "Maths 6",
      name_teacher: "Nguyễn Tiến Dương",
      time_table: {
        day_of_week: "Mon - Tue - Sat",
        time_start: "18.00",
        time_end: "20.00",
      },
    },
  ],
  "Maths 7": [
    {
      name_subject: "Maths 7",
      name_teacher: "Nguyễn Tiến Dương",
      time_table: {
        day_of_week: "Mon - Tue - Sat",
        time_start: "18.00",
        time_end: "20.00",
      },
    },
    {
      name_subject: "Maths 7",
      name_teacher: "Nguyễn Tiến Dương",
      time_table: {
        day_of_week: "Mon - Tue - Sat",
        time_start: "18.00",
        time_end: "20.00",
      },
    },
  ],
  "Maths 8": [
    {
      name_subject: "Maths 8",
      name_teacher: "Nguyễn Tiến Dương",
      time_table: {
        day_of_week: "Mon - Tue - Sat",
        time_start: "18.00",
        time_end: "20.00",
      },
    },
    {
      name_subject: "Maths 8",
      name_teacher: "Nguyễn Tiến Dương",
      time_table: {
        day_of_week: "Mon - Tue - Sat",
        time_start: "18.00",
        time_end: "20.00",
      },
    },
  ],
  "Maths 9": [
    {
      name_subject: "Maths 9",
      name_teacher: "Nguyễn Tiến Dương",
      time_table: {
        day_of_week: "Mon - Tue - Sat",
        time_start: "18.00",
        time_end: "20.00",
      },
    },
    {
      name_subject: "Maths 9",
      name_teacher: "Nguyễn Tiến Dương",
      time_table: {
        day_of_week: "Mon - Tue - Sat",
        time_start: "18.00",
        time_end: "20.00",
      },
    },
  ],
};

export default function RevisionScreen({ navigation }) {
  const { colors } = useTheme();
  const [subject, setSubject] = useState(subjects[0]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (subject.id === "all") {
      const allClasses = [];
      for (let key in classesList) {
        allClasses.push(...classesList[key]);
      }
      setClasses(allClasses);
    } else setClasses(classesList[subject.id]);
  }, [subject]);

  const renderSubjectItem = ({ item }) => {
    const selected = subject.id === item.id;
    return (
      <Chip
        key={item.id}
        onPress={() => setSubject(item)}
        selected={selected}
        style={{
          ...styles.subjectChip,
          backgroundColor: selected ? colors.lightPink : colors.lightGrey,
        }}
      >
        {item.name}
      </Chip>
    );
  };

  const renderClassItem = ({ item }) => {
    return (
      <List.Item
        key={item.id}
        title={item.name_teacher}
        description={`${item.time_table.time_start} - ${item.time_table.time_end}\n${item.time_table.day_of_week}`}
        onPress={() =>
          navigation.navigate("ClassDetails", {
            classData: item,
            subjectData: subject,
          })
        }
        style={{ ...styles.classItem, backgroundColor: colors.lightBlue }}
        right={(props) => (
          <Feather
            style={{ marginTop: 20 }}
            name="mail"
            size={24}
            color="black"
          />
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.horizontalFlatlistContainer}>
        <FlatList
          data={subjects}
          renderItem={renderSubjectItem}
          horizontal
          contentContainerStyle={styles.horizontalFlatlist}
        />
      </View>
      <Title style={styles.title}>Classes</Title>
      <FlatList
        contentContainerStyle={styles.flatlist}
        data={classes}
        renderItem={renderClassItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 18,
    paddingHorizontal: 24,
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
