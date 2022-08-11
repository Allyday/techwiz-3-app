import { useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import useTermExams from './hooks/useTermExams';

const allExams = [
  {
    name: 'Assignment',
    term: 1,
    grades: [
      {
        name: 'Nguyen Tien Duong',
        grade: Math.round(Math.random() * 10),
        examDate: new Date(),
      },
      {
        name: 'Tran Hien Anh',
        grade: null,
        examDate: new Date(),
      },
      {
        name: 'Giap Van Hien',
        grade: Math.round(Math.random() * 10),
        examDate: new Date(),
      },
      {
        name: 'Pham Huy Hoang',
        grade: Math.round(Math.random() * 10),
        examDate: new Date(),
      },
      {
        name: 'FPT Aptech',
        grade: Math.round(Math.random() * 10),
        examDate: new Date(),
      },
    ],
  },
  {
    name: 'Midterm',
    term: 1,
    grades: [
      {
        name: 'Nguyen Tien Duong',
        grade: Math.round(Math.random() * 10),
        examDate: new Date(),
      },
      {
        name: 'Tran Hien Anh',
        grade: Math.round(Math.random() * 10),
        examDate: new Date(),
      },
      {
        name: 'Giap Van Hien',
        grade: Math.round(Math.random() * 10),
        examDate: new Date(),
      },
      {
        name: 'Pham Huy Hoang',
        grade: null,
        examDate: new Date(),
      },
      {
        name: 'FPT Aptech',
        grade: Math.round(Math.random() * 10),
        examDate: new Date(),
      },
    ],
  },
  {
    name: 'Final',
    term: 1,
    grades: [
      {
        name: 'Nguyen Tien Duong',
        grade: Math.round(Math.random() * 10),
        examDate: new Date(),
      },
      {
        name: 'Tran Hien Anh',
        grade: null,
        examDate: new Date(),
      },
      {
        name: 'Giap Van Hien',
        grade: Math.round(Math.random() * 10),
        examDate: new Date(),
      },
      {
        name: 'Pham Huy Hoang',
        grade: Math.round(Math.random() * 10),
        examDate: new Date(),
      },
      {
        name: 'FPT Aptech',
        grade: null,
        examDate: new Date(),
      },
    ],
  },
  {
    name: 'Assignment',
    term: 2,
    grades: [
      {
        name: 'Nguyen Tien Duong',
        grade: null,
        examDate: new Date(),
      },
      {
        name: 'Tran Hien Anh',
        grade: Math.round(Math.random() * 10),
        examDate: new Date(),
      },
      {
        name: 'Giap Van Hien',
        grade: Math.round(Math.random() * 10),
        examDate: new Date(),
      },
      {
        name: 'Pham Huy Hoang',
        grade: Math.round(Math.random() * 10),
        examDate: new Date(),
      },
      {
        name: 'FPT Aptech',
        grade: Math.round(Math.random() * 10),
        examDate: new Date(),
      },
    ],
  },
  {
    name: 'Midterm',
    term: 2,
    grades: [
      {
        name: 'Nguyen Tien Duong',
        grade: null,
        examDate: new Date(),
      },
      {
        name: 'Tran Hien Anh',
        grade: null,
        examDate: new Date(),
      },
      {
        name: 'Giap Van Hien',
        grade: null,
        examDate: new Date(),
      },
      {
        name: 'Pham Huy Hoang',
        grade: null,
        examDate: new Date(),
      },
      {
        name: 'FPT Aptech',
        grade: null,
        examDate: new Date(),
      },
    ],
  },
  {
    name: 'Final',
    term: 2,
    grades: [
      {
        name: 'Nguyen Tien Duong',
        grade: null,
        examDate: new Date(),
      },
      {
        name: 'Tran Hien Anh',
        grade: null,
        examDate: new Date(),
      },
      {
        name: 'Giap Van Hien',
        grade: null,
        examDate: new Date(),
      },
      {
        name: 'Pham Huy Hoang',
        grade: null,
        examDate: new Date(),
      },
      {
        name: 'FPT Aptech',
        grade: null,
        examDate: new Date(),
      },
    ],
  },
];

export default function ClassDetailsScreen({ route, navigation }) {
  const { colors } = useTheme();
  const layout = useWindowDimensions();
  const { classData, subjectData } = route.params;
  const { TermOne, TermTwo } = useTermExams({ data: allExams });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'one', title: 'Term 1' },
    { key: 'two', title: 'Term 2' },
  ]);

  /* dynamic header */
  useLayoutEffect(() => {
    if (classData?.name)
      navigation.setOptions({
        title: `Exams - ${classData.name}`,
        // title: `${classData.name} - ${subjectData.name}`,
      });
  }, []);

  const renderScene = SceneMap({
    one: TermOne,
    two: TermTwo,
  });

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
