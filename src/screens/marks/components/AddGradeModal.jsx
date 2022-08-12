import { useContext, useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import {
  useTheme,
  Portal,
  Modal,
  Title,
  Caption,
  Button,
} from 'react-native-paper';

import { GradeContext } from '../contexts/grade.context';

export default function AddGradeModal({ subject }) {
  const { colors } = useTheme();
  const {
    exam,
    isGradeModalVisible,
    setGradeModalVisible,
    student,
    setStudent,
  } = useContext(GradeContext);
  const [grade, setGrade] = useState('');

  const studentsWithNoGradeCount = useMemo(() => {
    const studentsWithNoGrade = exam.studentCount - exam.studentHasGradeCount;
    const hasGrade = !!student.grade;
    return studentsWithNoGrade - (hasGrade ? 0 : 1);
  }, [exam.studentCount, exam.studentHasGradeCount, student.grade]);

  useEffect(() => {
    setGrade(student.grade ?? '');
  }, [student]);

  const hideModal = () => setGradeModalVisible(false);

  const saveGrade = async () => {
    console.log('Save grade');
  };

  const onSaveAndNext = async () => {
    await saveGrade();
    const nextStudent = exam.grades.find(
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
    const validGradeRegex = /^([0-9]{1,2}[.]?([0-9]{1})?|[.]?([0-9]{1})?)$/;
    if (text.match(validGradeRegex)) setGrade(text);
  };

  return (
    <Portal>
      <Modal
        visible={isGradeModalVisible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContent}
      >
        <Title>{student.student_name}</Title>
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
        {studentsWithNoGradeCount > 0 ? (
          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              icon="close"
              onPress={onSaveAndClose}
              uppercase={false}
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
