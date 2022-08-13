import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const examGradeWeight = {
  ASSIGNMENT: 0.2,
  MIDDLE: 0.3,
  FINAL: 0.5,
};

const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

export default function Grades({ subjectWithGrades }) {
  const { colors } = useTheme();
  const [gpa, setGPA] = useState(0);

  useEffect(() => {
    calculateGPA();
  }, [calculateGPA]);

  const calculateGPA = useCallback(() => {
    let sum = 0;
    for (let subject of subjectWithGrades) {
      subject.AVERAGE = calculateGradeAverage(subject);
      if (subject.AVERAGE) sum += subject.AVERAGE;
    }
    setGPA(sum / subjectWithGrades.length);
  }, [subjectWithGrades]);

  const calculateGradeAverage = (subject) => {
    const gradeValues = [];
    const gradeWeights = [];
    if (subject.ASSIGNMENT) {
      gradeValues.push(subject.ASSIGNMENT);
      gradeWeights.push(examGradeWeight.ASSIGNMENT);
    }
    if (subject.MIDDLE) {
      gradeValues.push(subject.MIDDLE);
      gradeWeights.push(examGradeWeight.MIDDLE);
    }
    if (subject.FINAL) {
      gradeValues.push(subject.FINAL);
      gradeWeights.push(examGradeWeight.FINAL);
    }
    if (gradeValues.length === 0) return undefined;
    return weightedAverage(gradeValues, gradeWeights);
  };

  return (
    <View>
      <View style={[styles.card, { backgroundColor: colors.lightGrey }]}>
        <View style={styles.row}>
          <View style={styles.subjectCol}>
            <Text>Subject</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.grade}>Asm.</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.grade}>Mid.</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.grade}>Fin.</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.grade}>Avg.</Text>
          </View>
        </View>

        {subjectWithGrades.map((subject, index) => (
          <View
            key={subject.subject_id}
            style={[
              styles.row,
              {
                backgroundColor:
                  index % 2 == 0 ? colors.veryLightGrey : 'transparent',
              },
            ]}
          >
            <View style={styles.subjectCol}>
              <Text style={[styles.boldText, { color: colors.secondary }]}>
                {subject.subject_name}
              </Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.grade}>{subject.ASSIGNMENT ?? '-'}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.grade}>{subject.MIDDLE ?? '-'}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.grade}>{subject.FINAL ?? '-'}</Text>
            </View>
            <View style={styles.col}>
              <Text style={[styles.grade, styles.boldText]}>
                {subject.AVERAGE ?? '-'}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.gpaContainer}>
        <Text style={[styles.gpa, { color: colors.primary }]}>GPA</Text>
        <View style={styles.col}>
          <Text style={[styles.grade, styles.gpa, { color: colors.primary }]}>
            {gpa.toFixed(1)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  subjectCol: { width: '40%' },
  boldText: { fontWeight: 'bold' },
  col: { width: '15%' },
  grade: { textAlign: 'center' },
  gpaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  gpa: { fontWeight: 'bold', fontSize: 18 },
});
