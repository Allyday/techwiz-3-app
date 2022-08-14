import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, TouchableRipple, Text } from 'react-native-paper';

export const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const DayOfWeekSelector = (props) => {
  return (
    <View style={styles.dowContainer}>
      {daysOfWeek.map((dow) => (
        <DayOfWeekBtn key={dow} dow={dow} {...props} />
      ))}
    </View>
  );
};

const DayOfWeekBtn = ({
  dow,
  lesson,
  selectedDay,
  setSelectedDay,
  subject,
}) => {
  const { colors } = useTheme();

  const isOtherLessonsDay = useMemo(
    () =>
      subject.lessons.some(
        (lsn) => lsn.day_of_week.trim() === dow && lsn.id !== lesson.id
      ),
    [subject]
  );

  if (dow === selectedDay)
    return (
      <View style={[styles.dow, { backgroundColor: colors.secondary }]}>
        <Text style={{ color: 'white' }}>{dow.slice(0, 3)}</Text>
      </View>
    );

  if (isOtherLessonsDay)
    return (
      <View style={[styles.dow, { backgroundColor: colors.lightGrey }]}>
        <Text style={{ color: colors.veryDarkGrey }}>{dow.slice(0, 3)}</Text>
      </View>
    );

  return (
    <TouchableRipple
      onPress={() => setSelectedDay(dow)}
      style={[styles.dow, { backgroundColor: colors.veryLightGrey }]}
    >
      <Text style={{ color: colors.secondary }}>{dow.slice(0, 3)}</Text>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  dowContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
  },
  dow: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DayOfWeekSelector;
