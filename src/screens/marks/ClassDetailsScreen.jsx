import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { TabView, TabBar } from 'react-native-tab-view';

import AddGradeModal from './components/AddGradeModal';
import { GradeContextProvider } from './contexts/grade.context';
import { gradeAPI, studentAPI } from '../../apis';
import { useToken } from '../../hooks/useToken';
import TermExams from './components/TermExams';

export default function ClassDetailsScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { classSubject } = route.params;
  const [token] = useToken();
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  /* start tab view configs */
  const layout = useWindowDimensions();
  // const { TermOne, TermTwo } = useTermExams({ data: allExams, students });
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'one', title: 'Term 1' },
    { key: 'two', title: 'Term 2' },
  ]);
  /* end tab view configs */

  /* dynamic header */
  useLayoutEffect(() => {
    if (classSubject?.name)
      navigation.setOptions({
        title: `${classSubject.name} - ${classSubject.subjectName}`,
      });
  }, []);

  useEffect(() => {
    getExamGrades();
    getStudents();
  }, [getExamGrades, getStudents]);

  const getExamGrades = useCallback(async () => {
    const params = {
      class_id: classSubject.id,
      subject_id: classSubject.subjectId,
      term: index + 1,
    };
    const { data } = await gradeAPI.getAll(token, params);
    const { payload } = data;
    setExams(payload);
  }, [index]);

  const getStudents = async () => {
    try {
      const params = {
        class_id: classSubject.id,
        subject_id: classSubject.subjectId,
      };
      const { data } = await studentAPI.getAll(token, params);
      const { payload } = data;
      setStudents(payload);
    } catch (error) {
      console.log(error);
      // console.log(JSON.stringify(error));
    }
  };

  const renderScene = () => <TermExams exams={exams} students={students} />;

  const renderTabBar = (SceneRendererProps) => (
    <View style={{ backgroundColor: colors.secondary }}>
      <TabBar
        {...SceneRendererProps}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
        activeColor={colors.primary}
        inactiveColor={colors.secondary}
      />
    </View>
  );

  return (
    <GradeContextProvider>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      <AddGradeModal
        subject={{ id: classSubject.subjectId, name: classSubject.subjectName }}
      />
    </GradeContextProvider>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#fff',
    elevation: 0,
    borderTopEndRadius: 30,
  },
  tab: {
    width: Dimensions.get('window').width / 2,
  },
  indicator: {
    backgroundColor: '#fd3667',
  },
  label: {
    fontWeight: '600',
    textTransform: 'none',
  },
});
