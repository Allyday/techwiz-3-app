import { useContext, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import moment from 'moment';

import { GradeContext } from '../contexts/grade.context';

export default function StudentGradeItem({ student, exam }) {
  const { colors } = useTheme();
  const { setGradeModalVisible, setStudent, setExam } =
    useContext(GradeContext);

  const studentHasGrade = useMemo(
    () => student.grade !== null && student.grade !== undefined,
    [student.grade]
  );
  const backgroundColor = studentHasGrade
    ? colors.lightGrey
    : colors.lightBeige;
  const rippleColor = studentHasGrade ? colors.darkGrey : colors.darkBeige;

  const openGradeModal = () => {
    setStudent(student);
    setExam(exam);
    setGradeModalVisible(true);
  };

  return (
    <TouchableRipple
      onPress={openGradeModal}
      style={[styles.listItemContainer, { backgroundColor }]}
      rippleColor={rippleColor}
    >
      <View style={styles.listItem}>
        <Text>{student.name}</Text>
        <View style={styles.gradeInfoContainer}>
          <Text style={styles.examDate}>
            {student.exam_date
              ? moment(student.exam_date).format('DD/MM/YYYY')
              : ''}
          </Text>
          <Text style={[styles.grade, { color: colors.secondary }]}>
            {student.grade ?? '-'} <Text style={styles.gradeSubtitle}>/10</Text>
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    marginHorizontal: 12,
    borderRadius: 12,
  },
  listItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
  },
  gradeInfoContainer: {
    minWidth: 140,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  examDate: {
    width: 80,
    fontStyle: 'italic',
    color: 'grey',
  },
  grade: {
    fontWeight: 'bold',
  },
  gradeSubtitle: {
    fontSize: 12,
    color: 'grey',
  },
});
