import { useContext, useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, TextInput, ToastAndroid } from 'react-native';
import {
  useTheme,
  Portal,
  Modal,
  Title,
  Caption,
  Button,
  HelperText,
} from 'react-native-paper';
import moment from 'moment';

import { GradeContext } from '../contexts/grade.context';
import { useToken } from '../../../hooks/useToken';
import { gradeAPI } from '../../../apis';

const getCurrentSchoolYear = () => {
  return { startYear: 2021, endYear: 2022 };
};

export default function AddGradeModal({ subject }) {
  const { colors } = useTheme();
  const {
    exam,
    setExam,
    isGradeModalVisible,
    setGradeModalVisible,
    student,
    setStudent,
  } = useContext(GradeContext);
  const [grade, setGrade] = useState('');
  const [gradeError, setGradeError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token] = useToken();

  const studentsWithNoGradeCount = useMemo(() => {
    const studentsWithNoGrade = exam.studentCount - exam.studentHasGradeCount;
    const hasGrade = !!student.grade;
    return studentsWithNoGrade - (hasGrade ? 0 : 1);
  }, [exam.studentCount, exam.studentHasGradeCount, student.grade]);

  useEffect(() => {
    setGrade(student.grade?.toString() ?? '');
    setGradeError(null);
    setIsLoading(false);
  }, [student, isGradeModalVisible]);

  const hideModal = () => setGradeModalVisible(false);

  const saveGrade = async () => {
    setGradeError(null);
    if (isLoading) return;
    const validGradeForSubmit = /^([0-9]{1,2}([.][0-9]{1})?|([.][0-9]{1})?)$/;
    if (!grade.match(validGradeForSubmit)) {
      setGradeError(
        'A valid grade is a number between 0 and 10, with maximum 1 decimal point.'
      );
      // stop subsequent events, like close modal
      throw new Error('Invalid grade');
    }

    const { startYear: start_year, endYear: end_year } = getCurrentSchoolYear();
    const payload = {
      grade_id: student.grade_id,
      mark: +grade,
      start_year,
      end_year,
      description: 'placeholder',
      type_exam: exam.exam_name,
      term: exam.term,
      exam_date: moment().format('YYYY-MM-DD'),
      subject_id: subject.id,
      student_id: student.id,
    };

    try {
      setIsLoading(true);
      const { data } = await gradeAPI.add(token, payload);
      // update list ui
      if (!student.grade)
        setExam({
          ...exam,
          studentHasGradeCount: exam.studentHasGradeCount + 1,
        });
      setStudent({
        ...student,
        grade: payload.mark,
        exam_date: payload.exam_date,
      });
      ToastAndroid.show('Grade updated successfully!', ToastAndroid.SHORT);
    } catch (error) {
      console.log(JSON.stringify(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const onSaveAndNext = async () => {
    await saveGrade();
    const nextStudent = exam.studentGrades.find(
      (stu) => !stu.grade && stu.id !== student.id // next student with no grade
    );
    setStudent(nextStudent);
  };

  const onSaveAndClose = async () => {
    await saveGrade();
    hideModal();
  };

  const onChangeGrade = (text) => {
    if (+text > 10 || text == '-') return;
    /*  */
    const validGradeForInput = /^([0-9]{1,2}[.]?([0-9]{1})?|[.]?([0-9]{1})?)$/;
    if (text.match(validGradeForInput)) setGrade(text);
  };

  return (
    <Portal>
      <Modal
        visible={isGradeModalVisible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContent}
      >
        <Title>{student.name}</Title>
        <Caption>
          {subject.name} | {exam.name}
        </Caption>
        <TextInput
          style={[styles.input, { backgroundColor: colors.lightGreen }]}
          value={String(grade)}
          onChangeText={onChangeGrade}
          autoFocus
          autoSelect
          keyboardType="numeric"
        />
        <HelperText type="error" visible={gradeError}>
          {gradeError}
        </HelperText>
        {studentsWithNoGradeCount > 0 ? (
          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              icon="close"
              onPress={onSaveAndClose}
              uppercase={false}
              loading={isLoading}
              labelStyle={{ color: colors.secondary }}
              style={styles.button}
              contentStyle={{ flexDirection: 'row-reverse' }}
            >
              Save & Close
            </Button>
            <View style={styles.nextButtonContainer}>
              <Button
                mode="contained"
                icon="chevron-right"
                onPress={onSaveAndNext}
                uppercase={false}
                loading={isLoading}
                style={[styles.button, { backgroundColor: colors.secondary }]}
                contentStyle={{ flexDirection: 'row-reverse' }}
              >
                Save & Next
              </Button>
              <Caption style={styles.note}>
                ({studentsWithNoGradeCount} student
                {studentsWithNoGradeCount > 1 ? 's' : ''} left)
              </Caption>
            </View>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              icon="check"
              onPress={onSaveAndClose}
              uppercase={false}
              loading={isLoading}
              style={[styles.button, { backgroundColor: colors.secondary }]}
              contentStyle={{ flexDirection: 'row-reverse' }}
            >
              Save & Close
            </Button>
          </View>
        )}
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
  },
  input: {
    width: 60,
    height: 60,
    padding: 12,
    margin: 12,
    borderRadius: 8,
    fontSize: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  nextButtonContainer: {
    alignItems: 'center',
  },
  button: {
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 50,
    flexDirection: 'row-reverse',
    height: 35,
    alignItems: 'center',
  },
  buttonWithRightIcon: {
    flexDirection: 'row-reverse',
  },
  note: {
    marginVertical: -4,
  },
});
