import { useState } from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { TabView, TabBar } from 'react-native-tab-view';

import StyledScreen from '../../components/wrappers/StyledScreen';
import StudentInfo from './components/StudentInfo';
import Grades from './components/Grades';

export default function ReportCardScreen({ route }) {
  const { colors } = useTheme();
  const student = route?.params?.student;
  /* start tab view configs */
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'one', title: 'Term 1' },
    { key: 'two', title: 'Term 2' },
  ]);
  /* end tab view configs */

  const renderScene = ({ route }) => {
    const term = route.key === 'one' ? 1 : 2;
    return <Grades term={term} student={student} />;
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
    <StyledScreen style={styles.container}>
      <StudentInfo studentData={student} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </StyledScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  tabbar: {
    backgroundColor: '#fff',
    elevation: 0,
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
