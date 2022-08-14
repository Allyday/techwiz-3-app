import _ from 'lodash';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  useTheme,
  Portal,
  Modal,
  Title,
  Caption,
  Button,
  Text,
} from 'react-native-paper';

import { revisionAPI } from '../../../apis';
import { useToken } from '../../../hooks/useToken';
import DayOfWeekSelector, { daysOfWeek } from './DayOfWeekSelector';
import DurationSlider from './DurationSlider';
import TimePicker from './TimePicker';

const getDurationInHour = ({ time_start, time_end }) => {
  if (!time_start || !time_end) return 1;
  const hourDiff = time_end.slice(0, 2) - time_start.slice(0, 2);
  const minuteDiff = time_end.slice(3, 5) - time_start.slice(3, 5);
  const durationInMinutes = hourDiff * 60 + minuteDiff;
  return durationInMinutes / 60;
};

const getDurationString = (durationInHour) => {
  const durationInMinutes = durationInHour * 60;
  const hour = Math.floor(durationInMinutes / 60);
  const minute = durationInMinutes % 60;
  const hourString = hour ? hour + ' hr ' : '';
  const minuteString = minute ? minute + ' min' : '';
  return hourString + minuteString;
};

const getEndTimeString = ({ durationInHour, startTime }) => {
  const startTimeInMinutes =
    startTime.slice(0, 2) * 60 + +startTime.slice(3, 5);
  const durationInMinutes = durationInHour * 60;
  const endTimeInMinutes = startTimeInMinutes + durationInMinutes;
  const hour = Math.floor(endTimeInMinutes / 60);
  const minute = endTimeInMinutes % 60;
  const hourString = String(hour).padStart(2, '0');
  const minuteString = String(minute).padStart(2, '0');
  return `${hourString}:${minuteString}:00`;
};

export default function UpdateScheduleModal({
  subject,
  lesson,
  isVisible,
  setVisible,
}) {
  const { colors } = useTheme();
  const [selectedDay, setSelectedDay] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [duration, setDuration] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [token] = useToken();

  useEffect(() => {
    setSelectedDay((lesson.day_of_week ?? '').trim());
    setStartTime((lesson.time_start ?? '09:00').slice(0, 5));
    setDuration(getDurationInHour(lesson));
    setIsLoading(false);
  }, [subject, isVisible, lesson]);

  const hideModal = () => setVisible(false);

  const updateLesson = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const end_time = getEndTimeString({
        durationInHour: duration,
        startTime,
      });
      const payload = {
        id: lesson.id,
        day_of_week: selectedDay,
        start_time: startTime + ':00',
        end_time,
      };
      const { data } = await revisionAPI.updateLesson(token, payload);
      /* update revision list UI */
      lesson.day_of_week = payload.day_of_week;
      lesson.time_start = payload.start_time;
      lesson.time_end = payload.end_time;
      subject.lessons = _.sortBy(subject.lessons, [
        (lsn) => daysOfWeek.indexOf(lsn.day_of_week),
      ]);
      console.log({ data });
    } catch (error) {
      console.log(JSON.stringify(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const onSaveAndClose = async () => {
    await updateLesson();
    hideModal();
  };

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContent}
      >
        <Title style={{ textAlign: 'center' }}>
          Revision Class - {subject.name_subject}
        </Title>
        <Caption style={{ textAlign: 'center' }}>
          Update lesson schedule
        </Caption>
        <View style={styles.sectionTitleContainer}>
          <Title style={styles.subtitle}>Day of week</Title>
        </View>
        <DayOfWeekSelector
          subject={subject}
          lesson={lesson}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        <View style={styles.sectionTitleContainer}>
          <Title style={styles.subtitle}>Lesson time</Title>
          <TimePicker startTime={startTime} setStartTime={setStartTime} />
        </View>
        <View style={styles.sectionTitleContainer}>
          <Title style={styles.subtitle}>Lesson duration</Title>
          <Text>{getDurationString(duration)}</Text>
        </View>
        <DurationSlider duration={duration} setDuration={setDuration} />
        <View style={{ alignItems: 'center' }}>
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
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
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
