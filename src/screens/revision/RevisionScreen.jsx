import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Chip, List, Title, useTheme } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

import StyledScreen from '../../components/wrappers/StyledScreen';
import { revisionAPI, subjectAPI } from '../../apis';
import { useToken } from '../../hooks/useToken';

const classesList = {
  "Maths 6": [
    {
      name_subject: 'Maths 6',
      name_teacher: 'Nguyễn Tiến Dương',
      time_table: {
        day_of_week: 'Mon - Tue - Sat',
        time_start: '18.00',
        time_end: '20.00',
      },
    },

    {
      name_subject: 'Maths 6',
      name_teacher: 'Nguyễn Tiến Dương',
      time_table: {
        day_of_week: 'Mon - Tue - Sat',
        time_start: '18.00',
        time_end: '20.00',
      },
    },
  ],
  'Maths 7': [
    {
      name_subject: 'Maths 7',
      name_teacher: 'Nguyễn Tiến Dương',
      time_table: {
        day_of_week: 'Mon - Tue - Sat',
        time_start: '18.00',
        time_end: '20.00',
      },
    },
    {
      name_subject: 'Maths 7',
      name_teacher: 'Nguyễn Tiến Dương',
      time_table: {
        day_of_week: 'Mon - Tue - Sat',
        time_start: '18.00',
        time_end: '20.00',
      },
    },
  ],
  'Maths 8': [
    {
      name_subject: 'Maths 8',
      name_teacher: 'Nguyễn Tiến Dương',
      time_table: {
        day_of_week: 'Mon - Tue - Sat',
        time_start: '18.00',
        time_end: '20.00',
      },
    },
    {
      name_subject: 'Maths 8',
      name_teacher: 'Nguyễn Tiến Dương',
      time_table: {
        day_of_week: 'Mon - Tue - Sat',
        time_start: '18.00',
        time_end: '20.00',
      },
    },
  ],
  'Maths 9': [
    {
      name_subject: 'Maths 9',
      name_teacher: 'Nguyễn Tiến Dương',
      time_table: {
        day_of_week: 'Mon - Tue - Sat',
        time_start: '18.00',
        time_end: '20.00',
      },
    },
    {
      name_subject: 'Maths 9',
      name_teacher: 'Nguyễn Tiến Dương',
      time_table: {
        day_of_week: 'Mon - Tue - Sat',
        time_start: '18.00',
        time_end: '20.00',
      },
    },
  ],
};

export default function RevisionScreen({ navigation }) {
  const { colors } = useTheme();
  const [subjects, setSubjects] = useState([{ id: 'all', name: 'All' }]);
  const [subject, setSubject] = useState(subjects[0]);
  const [classes, setClasses] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [token] = useToken();

  useEffect(() => {
    Promise.all([getSubject(), getRevisionClasses()]).finally(() =>
      setLoading(false)
    );
  }, []);

  useEffect(() => {
    if (subject.id === 'all') {
      const allClasses = [];
      for (let key in classesList) {
        allClasses.push(...classesList[key]);
      }
      setClasses(allClasses);
    } else setClasses(classesList[subject.id]);
  }, [subject]);

  const getSubject = async () => {
    const { data } = await subjectAPI.getSubject(token);
    setSubjects([{ id: 'all', name: 'All' }, ...data.payload]);
  };

  const getRevisionClasses = async () => {
    const { data } = await revisionAPI.getAll(token);

    const res = []
    for (let lesson of data.revision_class) {
      const {name_teacher, name_subject,time_table } = lesson;
      const currentClass = res.find(
        (cls) => cls.name_subject === lesson.name_subject
      );
      if (!currentClass) {
          res.push({name_teacher,name_subject, lessons: [time_table]})
      } else {
currentClass.lessons.push(time_table)
      }
    }
    console.log({res})
    setClasses(data.revision_class);
  };

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
          navigation.navigate('ClassDetails', {
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


  /**
   * let res = []
   * for (buoihoc of array) {
   * 
   * if (!res.some(class => class.subject_id === buoihoc.id))
   * res.push({
   *       "name_subject": "Geography 6",
      "name_teacher": "Duong Tung",
      "lessons": [
        Object {
        "day_of_week": "Sunday ",
        "id": 10,
        "time_end": "20:30:00",
        "time_start": "19:30:00",
      }
      ],

   * 
   * }) else {
   * const currentClass = res.find(class => class.subject_id === buoihoc.id)
   * currentClass.lessons.push({})
   * }
   * }
   * 
   * })
   */

  return (
    <StyledScreen style={styles.container}>
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
    </StyledScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingHorizontal: 24,
  },
  horizontalFlatlistContainer: {
    height: 40,
    marginHorizontal: -24,
    borderTopEndRadius: 9,
    overflow: 'hidden',
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
    fontWeight: 'bold',
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
