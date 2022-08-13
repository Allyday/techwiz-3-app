import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { TabView, TabBar } from 'react-native-tab-view';

import { gradeAPI } from '../../apis';
import { useToken } from '../../hooks/useToken';
import ReportCard from './components/ReportCard';

export default function ReportCardScreen() {
  const { colors } = useTheme();
  const [token] = useToken();
  const [grades, setGrades] = useState({ term1: [], term2: [] });

  /* start tab view configs */
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'one', title: 'Term 1' },
    { key: 'two', title: 'Term 2' },
  ]);
  /* end tab view configs */
  const [student, setStudent] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    await Promise.all([getStudentData(), getGrades()]);
    setLoading(false);
  };

  const getStudentData = async () => {
    const savedStudent = await AsyncStorage.getItem('user');
    setStudent(JSON.parse(savedStudent));
  };

  const getGrades = async () => {
    try {
      const { data } = await gradeAPI.getByStudent(token);
      const { payload } = data;
      setGrades(payload);
    } catch (error) {
      console.log(error);
      // console.log(JSON.stringify(error));
    }
  };

  const renderScene = ({ route }) => {
    const term = route.key === 'one' ? 1 : 2;
    const termKey = route.key === 'one' ? 'term1' : 'term2';
    const subjectWithGrades = _.sortBy(grades[termKey], 'subject_name');

    return (
      <ReportCard
        student={student}
        subjectWithGrades={subjectWithGrades}
        term={term}
      />
    );
  };

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
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
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
