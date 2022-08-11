import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';

export default function StudentGradeItem({ student }) {
  const { colors } = useTheme();

  const backgroundColor =
    student.grade !== null ? colors.lightGrey : colors.lightBeige;
  const rippleColor =
    student.grade !== null ? colors.darkGrey : colors.darkBeige;

  const openGradeModal = () => {};

  return (
    <TouchableRipple
      onPress={openGradeModal}
      style={[styles.listItemContainer, { backgroundColor }]}
      rippleColor={rippleColor}
    >
      <View style={styles.listItem}>
        <Text>{student.name}</Text>
        <Text style={[styles.grade, { color: colors.secondary }]}>
          {student.grade ?? '-'} <Text style={styles.gradeSubtitle}>/10</Text>
        </Text>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    borderRadius: 12,
  },
  listItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
  },
  grade: {
    fontWeight: 'bold',
  },
  gradeSubtitle: {
    fontSize: 12,
    color: 'grey',
  },
});
