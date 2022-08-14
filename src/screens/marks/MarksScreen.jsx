import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Dimensions } from 'react-native';
import {
  Chip,
  List,
  Text,
  Title,
  TouchableRipple,
  useTheme,
  Caption,
} from 'react-native-paper';
import _ from 'lodash';
import ContentLoader from 'react-native-easy-content-loader';

import { gradeAPI, subjectAPI } from '../../apis';
import { useToken } from '../../hooks/useToken';
import StyledScreen from '../../components/wrappers/StyledScreen';
import { examNameMap } from './components/TermExams';
import moment from 'moment';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function MarksScreen({ navigation }) {
  const { colors } = useTheme();
  const [token] = useToken();
  /* START dashboard */
  const [recentExams, setRecentExams] = useState([]);
  /* END dashboard */
  const [subjects, setSubjects] = useState([{ id: 'all', name: 'All' }]);
  const [subject, setSubject] = useState(subjects[0]);
  const [classesList, setClassesList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([getDashboardData(), getSubjects()]).finally(() =>
      setLoading(false)
    );
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
  };

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await gradeAPI.getDashboardTeacher(token);
      const { payload } = data;
      console.log({ payload });
      setRecentExams(payload.recentExams);
      /* unique subjects list */
    } catch (error) {
      console.log(error);
    }
  };

  const renderRecentExamItem = ({ item }) => {
    const classSubject = {
      subjectName: item.subject.name,
      subjectId: item.subject.id,
      ...item.class,
    };
    return (
      <TouchableRipple
        onPress={() => navigation.navigate('ClassDetails', { classSubject })}
        rippleColor={colors.darkGreen}
        style={{
          backgroundColor: colors.lightGreen,
          marginRight: 12,
          borderRadius: 12,
        }}
      >
        <View style={{ padding: 12, width: 300 }}>
          <Title>{item.subject.name}</Title>
          <Text>
            Class {item.class.name}'s {examNameMap[item.exam]}
          </Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Caption>
              {item.has_grade_student}/{item.total_student} completed
            </Caption>
            <Caption>
              on {moment(item.last_update).format('D MMM - HH:mm')}
            </Caption>
          </View>
        </View>
      </TouchableRipple>
    );
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

  const RecentExamsSection = () => {
    if (!recentExams.length) return null;
    return (
      <>
        <Title style={[styles.title, { marginVertical: 0 }]}>
          Recent exams
        </Title>
        <Caption style={{ marginBottom: 4 }}>
          Continue where you left off
        </Caption>
        {isLoading ? (
          <View
            style={{ flexDirection: 'row', marginLeft: -12, marginRight: -24 }}
          >
            <ContentLoader
              tHeight={100}
              tWidth={300}
              pRows={0}
              titleStyles={{ borderRadius: 12 }}
              containerStyles={{ width: 312 }}
            />
            <ContentLoader
              tHeight={100}
              tWidth={300}
              pRows={0}
              titleStyles={{ borderRadius: 12 }}
              containerStyles={{ width: 312 }}
            />
            <ContentLoader
              tHeight={100}
              tWidth={300}
              pRows={0}
              titleStyles={{ borderRadius: 12 }}
              containerStyles={{ width: 312 }}
            />
          </View>
        ) : (
          <View style={[styles.horizontalFlatlistContainer, { height: 100 }]}>
            <FlatList
              data={recentExams}
              renderItem={renderRecentExamItem}
              horizontal
              contentContainerStyle={styles.horizontalFlatlist}
            />
          </View>
        )}
        <Title style={styles.title}>Or select a class to add grades</Title>
      </>
    );
  };

  return (
    <StyledScreen style={styles.container}>
      <RecentExamsSection />
      {isLoading ? (
        <View
          style={{ flexDirection: 'row', marginLeft: -12, marginRight: -24 }}
        >
          <ContentLoader
            tHeight={40}
            tWidth={70}
            pRows={0}
            titleStyles={{ borderRadius: 15 }}
            containerStyles={{ width: 80 }}
          />
          <ContentLoader
            tHeight={40}
            tWidth={70}
            pRows={0}
            titleStyles={{ borderRadius: 15 }}
            containerStyles={{ width: 80 }}
          />
          <ContentLoader
            tHeight={40}
            tWidth={70}
            pRows={0}
            titleStyles={{ borderRadius: 15 }}
            containerStyles={{ width: 80 }}
          />
          <ContentLoader
            tHeight={40}
            tWidth={70}
            pRows={0}
            titleStyles={{ borderRadius: 15 }}
            containerStyles={{ width: 80 }}
          />
          <ContentLoader
            tHeight={40}
            tWidth={70}
            pRows={0}
            titleStyles={{ borderRadius: 15 }}
            containerStyles={{ width: 80 }}
          />
        </View>
      ) : (
        <View style={styles.horizontalFlatlistContainer}>
          <FlatList
            data={subjects}
            renderItem={renderSubjectItem}
            horizontal
            contentContainerStyle={styles.horizontalFlatlist}
          />
        </View>
      )}

      <Title style={[styles.title, { fontSize: 18, fontWeight: '500' }]}>
        Classes
      </Title>
      {isLoading ? (
        <>
          <View
            style={{
              backgroundColor: '#fff',
            }}
          >
            <ContentLoader
              tHeight={70}
              tWidth={SCREEN_WIDTH - 68}
              pRows={0}
              titleStyles={{ borderRadius: 10 }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
            }}
          >
            <ContentLoader
              tHeight={70}
              tWidth={SCREEN_WIDTH - 68}
              pRows={0}
              titleStyles={{ borderRadius: 10 }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
            }}
          >
            <ContentLoader
              tHeight={70}
              tWidth={SCREEN_WIDTH - 68}
              pRows={0}
              titleStyles={{ borderRadius: 10 }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
            }}
          >
            <ContentLoader
              tHeight={70}
              tWidth={SCREEN_WIDTH - 68}
              pRows={0}
              titleStyles={{ borderRadius: 10 }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              marginTop: 20,
            }}
          >
            <ContentLoader
              tHeight={70}
              tWidth={SCREEN_WIDTH - 68}
              pRows={0}
              titleStyles={{ borderRadius: 10 }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              marginTop: 20,
            }}
          >
            <ContentLoader
              tHeight={70}
              tWidth={SCREEN_WIDTH - 68}
              pRows={0}
              titleStyles={{ borderRadius: 10 }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              marginTop: 20,
            }}
          >
            <ContentLoader
              tHeight={70}
              tWidth={SCREEN_WIDTH - 68}
              pRows={0}
              titleStyles={{ borderRadius: 10 }}
            />
          </View>
        </>
      ) : (
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={classes}
          renderItem={renderClassItem}
        />
      )}
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
