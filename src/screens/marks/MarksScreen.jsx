import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Chip, List, Title, useTheme } from 'react-native-paper';
import _ from 'lodash';

import { subjectAPI } from '../../apis';
import { useToken } from '../../hooks/useToken';
import StyledScreen from '../../components/wrappers/StyledScreen';

export default function MarksScreen({ navigation }) {
  const { colors } = useTheme();
  const [token] = useToken();
  const [subjects, setSubjects] = useState([{ id: 'all', name: 'All' }]);
  const [subject, setSubject] = useState(subjects[0]);
  const [classesList, setClassesList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    if (subject.id === 'all') setClasses(classesList);
    else {
      const classesOfCurrentSubject = classesList.filter(
        (cls) => cls.subjectId === subject.id
      );
      setClasses(classesOfCurrentSubject);
    }
  }, [subject, classesList]);

  const getSubjects = async () => {
    try {
      setLoading(true);
      const { data } = await subjectAPI.getClassSubject(token);
      const { payload } = data;

      /* unique subjects list */
      const subjectsData = _.uniqBy(
        payload.map((obj) => obj.subject),
        'id'
      );
      setSubjects([{ id: 'all', name: 'All' }, ...subjectsData]);

      /* flatten classes list */
      const classesData = payload.map((obj) => ({
        ...obj.class,
        subjectName: obj.subject.name,
        subjectId: obj.subject.id,
      }));
      setClassesList(classesData);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
        title={item.name}
        rippleColor={colors.darkBlue}
        onPress={() =>
          navigation.navigate('ClassDetails', { classSubject: item })
        }
        style={{ ...styles.classItem, backgroundColor: colors.lightBlue }}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
    );
  };

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
