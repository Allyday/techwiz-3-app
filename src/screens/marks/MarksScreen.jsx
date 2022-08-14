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
  const [studentCount, setStudentCount] = useState(0);
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
      /* get student count */
      const totalStudentCount = payload.reduce(
        (prev, obj) => prev + obj.total_student,
        0
      );
      setStudentCount(totalStudentCount);
      setClassesList(classesData);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await gradeAPI.getDashboardTeacher(token);
      const { payload } = data;
      setRecentExams(payload.recentExams);
      /* unique subjects list */
    } catch (error) {
      console.log(error.response);
    }
  };

  const renderRecentExamItem = ({ item }) => {
    const term = item.term === 'TERM1' ? 1 : 2;
    const classSubject = {
      subjectName: item.subject.name,
      subjectId: item.subject.id,
      ...item.class,
    };
    return (
      <TouchableRipple
        onPress={() =>
          navigation.navigate('ClassDetails', {
            classSubject,
            term,
          })
        }
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
            Class {item.class.name}'s Term {term} {examNameMap[item.exam]}
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

  const renderClassItem = (item) => {
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

  const StatisticsSection = () => {
    const itemWidth = 95;
    const itemHeight = 80;
    const loaderContainerStyle = {
      width: itemWidth,
      marginBottom: -8,
      paddingBottom: 0,
      paddingLeft: 0,
    };
    return (
      <>
        {isLoading ? (
          <ContentLoader
            tHeight={18}
            tWidth={200}
            pRows={0}
            titleStyles={{ borderRadius: 12 }}
            containerStyles={{
              marginTop: 9,
              paddingLeft: 0,
              paddingBottom: 6,
            }}
          />
        ) : (
          <Title style={[styles.title, { marginTop: 0 }]}>
            You are teaching
          </Title>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 12,
          }}
        >
          {isLoading ? (
            <>
              <ContentLoader
                tHeight={itemHeight}
                tWidth={itemWidth}
                pRows={0}
                titleStyles={{ borderRadius: 12 }}
                containerStyles={loaderContainerStyle}
              />
              <ContentLoader
                tHeight={itemHeight}
                tWidth={itemWidth}
                pRows={0}
                titleStyles={{ borderRadius: 12 }}
                containerStyles={loaderContainerStyle}
              />
              <ContentLoader
                tHeight={itemHeight}
                tWidth={itemWidth}
                pRows={0}
                titleStyles={{ borderRadius: 12 }}
                containerStyles={loaderContainerStyle}
              />
            </>
          ) : (
            <>
              <View
                style={[
                  styles.statisticsItem,
                  { backgroundColor: colors.veryLightGrey },
                ]}
              >
                <Title
                  style={[styles.statisticsTitle, { color: colors.primary }]}
                >
                  {subjects.length - 1}
                </Title>
                <Title style={styles.statisticsSubtitle}>
                  Subject{subjects.length > 2 ? 's' : ''}
                </Title>
              </View>
              <View
                style={[
                  styles.statisticsItem,
                  { backgroundColor: colors.veryLightGrey },
                ]}
              >
                <Title
                  style={[styles.statisticsTitle, { color: colors.secondary }]}
                >
                  {classes.length}
                </Title>
                <Title style={styles.statisticsSubtitle}>
                  Class{classes.length > 1 ? 'es' : ''}
                </Title>
              </View>
              <View
                style={[
                  styles.statisticsItem,
                  { backgroundColor: colors.veryLightGrey },
                ]}
              >
                <Title
                  style={[
                    styles.statisticsTitle,
                    { color: colors.veryDarkBlue },
                  ]}
                >
                  {studentCount}
                </Title>
                <Title style={styles.statisticsSubtitle}>
                  Student{studentCount > 1 ? 's' : ''}
                </Title>
              </View>
            </>
          )}
        </View>
      </>
    );
  };

  const RecentExamsSection = () => {
    if (isLoading)
      return (
        <>
          <ContentLoader
            tHeight={18}
            tWidth={140}
            pRows={0}
            titleStyles={{ borderRadius: 12 }}
            containerStyles={{ marginTop: 20, paddingLeft: 0 }}
          />
          <ContentLoader
            tHeight={10}
            tWidth={170}
            pRows={0}
            titleStyles={{ borderRadius: 12 }}
            containerStyles={{ paddingLeft: 0, paddingBottom: 0 }}
          />

          <View
            style={{
              flexDirection: 'row',
              marginLeft: -12,
              marginRight: -24,
              marginBottom: -10,
            }}
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
          <ContentLoader
            tHeight={18}
            tWidth={300}
            pRows={0}
            titleStyles={{ borderRadius: 12 }}
            containerStyles={{
              marginTop: 20,
              paddingLeft: 0,
              paddingBottom: 6,
            }}
          />
        </>
      );

    if (!recentExams.length)
      return <Title style={styles.title}>Select a class to add grades</Title>;

    return (
      <>
        <Title style={[styles.title, { marginBottom: 0 }]}>Recent exams</Title>
        <Caption style={{ marginBottom: 4 }}>
          Continue where you left off
        </Caption>
        <View style={[styles.horizontalFlatlistContainer, { height: 100 }]}>
          <FlatList
            data={recentExams}
            renderItem={renderRecentExamItem}
            horizontal
            contentContainerStyle={styles.horizontalFlatlist}
          />
        </View>
        <Title style={styles.title}>Or select a class to add grades</Title>
      </>
    );
  };

  return (
    <StyledScreen
      scrollable
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      style={styles.container}
    >
      <StatisticsSection />
      <RecentExamsSection />
      {isLoading ? (
        <View
          style={{
            flexDirection: 'row',
            marginLeft: -12,
            marginRight: -24,
            marginBottom: -11,
          }}
        >
          <ContentLoader
            tHeight={40}
            tWidth={65}
            pRows={0}
            titleStyles={{ borderRadius: 16 }}
            containerStyles={{ width: 75 }}
          />
          <ContentLoader
            tHeight={40}
            tWidth={70}
            pRows={0}
            titleStyles={{ borderRadius: 16 }}
            containerStyles={{ width: 80 }}
          />
          <ContentLoader
            tHeight={40}
            tWidth={70}
            pRows={0}
            titleStyles={{ borderRadius: 16 }}
            containerStyles={{ width: 80 }}
          />
          <ContentLoader
            tHeight={40}
            tWidth={70}
            pRows={0}
            titleStyles={{ borderRadius: 16 }}
            containerStyles={{ width: 80 }}
          />
          <ContentLoader
            tHeight={40}
            tWidth={70}
            pRows={0}
            titleStyles={{ borderRadius: 16 }}
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

      {isLoading ? (
        <ContentLoader
          tHeight={18}
          tWidth={80}
          pRows={0}
          titleStyles={{ borderRadius: 12 }}
          containerStyles={{
            marginTop: 20,
            paddingLeft: 0,
            paddingBottom: 6,
          }}
        />
      ) : (
        <Title style={[styles.title, { fontSize: 18, fontWeight: '500' }]}>
          Classes
        </Title>
      )}
      {isLoading ? (
        <View style={{ marginLeft: -9, paddingTop: 6 }}>
          <ContentLoader
            tHeight={72}
            tWidth={SCREEN_WIDTH - 48}
            pRows={0}
            titleStyles={{ borderRadius: 12 }}
          />

          <ContentLoader
            tHeight={72}
            tWidth={SCREEN_WIDTH - 48}
            pRows={0}
            titleStyles={{ borderRadius: 12 }}
          />
          <ContentLoader
            tHeight={72}
            tWidth={SCREEN_WIDTH - 48}
            pRows={0}
            titleStyles={{ borderRadius: 12 }}
          />
          <ContentLoader
            tHeight={72}
            tWidth={SCREEN_WIDTH - 48}
            pRows={0}
            titleStyles={{ borderRadius: 12 }}
          />
          <ContentLoader
            tHeight={72}
            tWidth={SCREEN_WIDTH - 48}
            pRows={0}
            titleStyles={{ borderRadius: 12 }}
          />
        </View>
      ) : (
        classes.map(renderClassItem)
      )}
    </StyledScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingHorizontal: 24,
  },
  statisticsItem: {
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 95,
  },
  statisticsTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 0 },
  statisticsSubtitle: { fontSize: 16, fontWeight: 'normal' },
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
