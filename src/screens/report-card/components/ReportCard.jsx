import { StyleSheet, View } from 'react-native';

import Grades from './Grades';

export default function ReportCard({ student, subjectWithGrades }) {
  return (
    <View style={styles.container}>
      <Grades subjectWithGrades={subjectWithGrades} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});
