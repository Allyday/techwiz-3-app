import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  useTheme,
  Portal,
  Modal,
  Title,
  Caption,
  Button,
  HelperText,
} from 'react-native-paper';

import { useToken } from '../../../hooks/useToken';
import { gradeAPI } from '../../../apis';
import DayOfWeekSelector from './DayOfWeekSelector';

export default function UpdateScheduleModal({
  subject,
  lesson,
  isVisible,
  setVisible,
}) {
  const { colors } = useTheme();
  const [selectedDay, setSelectedDay] = useState('');
  const [gradeError, setGradeError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token] = useToken();

  useEffect(() => {
    setSelectedDay((lesson.day_of_week ?? '').trim());
    setGradeError(null);
    setIsLoading(false);
  }, [subject, isVisible, lesson]);

  const hideModal = () => setVisible(false);

  const saveGrade = async () => {
    setGradeError(null);
    if (isLoading) return;
    try {
      setIsLoading(true);
    } catch (error) {
      console.log(JSON.stringify(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const onSaveAndClose = async () => {
    await saveGrade();
    hideModal();
  };

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContent}
      >
        <Title>Revision Class - {subject.name_subject}</Title>
        <Caption>Update lesson schedule</Caption>
        <Title style={styles.subtitle}>Day of week</Title>
        <DayOfWeekSelector
          subject={subject}
          lesson={lesson}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        {/* <TextInput
          style={[styles.input, { backgroundColor: colors.lightGreen }]}
          value={String(grade)}
          onChangeText={onChangeGrade}
          autoFocus
          autoSelect
          keyboardType="numeric"
        /> */}

        <HelperText type="error" visible={gradeError}>
          {gradeError}
        </HelperText>
        <Button
          mode="contained"
          icon="check"
          onPress={onSaveAndClose}
          uppercase={false}
          loading={isLoading}
          style={[styles.button, { backgroundColor: colors.secondary }]}
          contentStyle={{ flexDirection: 'row-reverse' }}
        >
          Save
        </Button>
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
  subtitle: {
    fontSize: 16,
    width: '100%',
    marginTop: 12,
    marginBottom: 8,
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
  button: {
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 50,
    flexDirection: 'row-reverse',
    height: 35,
    alignItems: 'center',
  },
});
