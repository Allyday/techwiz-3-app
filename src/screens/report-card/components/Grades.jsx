import { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text, useTheme } from "react-native-paper";
import _ from "lodash";
import ContentLoader from "react-native-easy-content-loader";

import { gradeAPI } from "../../../apis";
import { useToken } from "../../../hooks/useToken";

const SCREEN_WIDTH = Dimensions.get("window").width;
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

export default function Grades({ term, student }) {
  const { colors } = useTheme();
  const [token] = useToken();
  const [gpa, setGPA] = useState(0);
  const [subjectWithGrades, setSubjectWithGrade] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getGrades();
  }, []);

  const getGrades = async () => {
    try {
      const getGradesParams = student 
        ? {
            term,
            student_id: student.student_id,
          } 
        : { term };
      const { data } = await gradeAPI.getByStudent(token, getGradesParams);
      const { payload } = data;
      const grades = _.sortBy(payload, "subject_name");
      const [gradesWithAverage, GPA] = calculateAverageAndGPA(grades);
      setSubjectWithGrade(gradesWithAverage);
      setGPA(GPA);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageAndGPA = (subjects) => {
    let sum = 0;
    for (let subject of subjects) {
      subject.AVERAGE = calculateGradeAverage(subject);
      if (subject.AVERAGE) sum += subject.AVERAGE;
    }
    return [subjects, sum / subjects.length];
  };

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
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={{
            backgroundColor: "#fff",
            marginTop: 20,
          }}
        >
          <ContentLoader
            tHeight={8}
            pRows={16}
            pWidth={[SCREEN_WIDTH - 68]}
            tWidth={SCREEN_WIDTH - 68}
          />
        </View>
      ) : (
        <>
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
                      index % 2 == 0 ? colors.veryLightGrey : "transparent",
                  },
                ]}
              >
                <View style={styles.subjectCol}>
                  <Text style={[styles.boldText, { color: colors.secondary }]}>
                    {subject.subject_name}
                  </Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.grade}>{subject.ASSIGNMENT ?? "-"}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.grade}>{subject.MIDDLE ?? "-"}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.grade}>{subject.FINAL ?? "-"}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={[styles.grade, styles.boldText]}>
                    {subject.AVERAGE ? subject.AVERAGE.toFixed(1) : "-"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.gpaContainer}>
            <Text style={[styles.gpa, { color: colors.primary }]}>GPA</Text>
            <View style={styles.col}>
              <Text
                style={[styles.grade, styles.gpa, { color: colors.primary }]}
              >
                {gpa.toFixed(1)}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  card: {
    borderRadius: 16,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  subjectCol: { width: "40%" },
  boldText: { fontWeight: "bold" },
  col: { width: "15%" },
  grade: { textAlign: "center" },
  gpaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 16,
  },
  gpa: { fontWeight: "bold", fontSize: 18 },
});
