import { useContext, useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import moment from 'moment';
import _ from 'lodash';

import { GradeContext } from '../contexts/grade.context';

export default function StudentGradeItem({
  student,
  exam,
  studentHasGradeCount,
  setStudentHasGradeCount,
  studentGrades,
  setStudentGrades,
}) {
  const { colors } = useTheme();
  const {
    setGradeModalVisible,
    setStudent,
    setExam,
    exam: examContext,
    student: studentContext,
  } = useContext(GradeContext);

  /* update list.accordion subtitle */
  useEffect(() => {
    if (
      examContext.studentHasGradeCount &&
      examContext.studentHasGradeCount !== studentHasGradeCount
    )
      setStudentHasGradeCount(examContext.studentHasGradeCount);
  }, [examContext.studentHasGradeCount]);

  /* update list.accordion subtitle */
  useEffect(() => {
    const remainingStudents = studentGrades.filter(
      (std) => std.id !== studentContext.id
    );
    setStudentGrades(_.sortBy([...remainingStudents, studentContext], 'name'));
  }, [studentContext]);

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
