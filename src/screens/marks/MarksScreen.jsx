import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Chip, List, Title, useTheme } from 'react-native-paper';

const subjects = [
  { id: 'all', name: 'All' },
  { id: 'Maths 6', name: 'Maths 6' },
  { id: 'Maths 7', name: 'Maths 7' },
  { id: 'Maths 8', name: 'Maths 8' },
  { id: 'Maths 9', name: 'Maths 9' },
];

const classesList = {
  'Maths 6': [
    { id: 'class 6a', name: 'Class 6A' },
    { id: 'class 6b', name: 'Class 6B' },
  ],
  'Maths 7': [
    { id: 'class 7a', name: 'Class 7A' },
    { id: 'class 7b', name: 'Class 7B' },
  ],
  'Maths 8': [
    { id: 'class 8c', name: 'Class 8C' },
    { id: 'class 8d', name: 'Class 8D' },
  ],
  'Maths 9': [
    { id: 'class 9c', name: 'Class 9C' },
    { id: 'class 9d', name: 'Class 9D' },
  ],
};

export default function MarksScreen({ navigation }) {
  const { colors } = useTheme();
  const [subject, setSubject] = useState(subjects[0]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (subject.id === 'all') {
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
        title={item.name}
        onPress={() =>
          navigation.navigate('ClassDetails', {
            classData: item,
            subjectData: subject,
          })
        }
        style={{ ...styles.classItem, backgroundColor: colors.lightBlue }}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
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
    backgroundColor: '#fff',
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
