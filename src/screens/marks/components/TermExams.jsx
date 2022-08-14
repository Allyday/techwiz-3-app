import _ from "lodash";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import { gradeAPI } from "../../../apis";
import { useToken } from "../../../hooks/useToken";
import StudentGradeItem from "./StudentGradeItem";
import ContentLoader from "react-native-easy-content-loader";

export const examNameMap = {
  ASSIGNMENT: "Assignment",
  MIDDLE: "Midterm",
  FINAL: "Final",
};

export default function TermExams({ classSubject, students, term }) {
  const [exams, setExams] = useState([]);
  const [token] = useToken();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getExamGrades();
  }, [getExamGrades]);

  const getExamGrades = async () => {
    const params = {
      class_id: classSubject.id,
      subject_id: classSubject.subjectId,
      term,
    };
    const { data } = await gradeAPI.getByClassSubject(token, params);
    const { payload } = data;
    setExams(payload);
    setLoading(false);
  };

  const renderExams = (exam) => {
    const mergedStudents = _.merge(
      _.keyBy(exam.grades, "id"),
      _.keyBy(students, "id")
    );
    const studentsWithGrades = _.sortBy(_.values(mergedStudents), "name");

    exam.studentGrades = studentsWithGrades;
    exam.studentCount = studentsWithGrades.length;
    exam.studentHasGradeCount = exam.grades.length;
    exam.name = examNameMap[exam.exam_name];

    const renderStudentGrade = (student) => (
      <StudentGradeItem key={student.id} student={student} exam={exam} />
    );

    return (
      <List.Accordion
        id={exam.name}
        key={exam.name}
        title={exam.name}
        description={`${exam.studentHasGradeCount} / ${exam.studentCount} completed`}
      >
        {exam.studentGrades.map(renderStudentGrade)}
      </List.Accordion>
    );
  };

  return (
    <ScrollView>
      {isLoading ? (
        <View
          style={{
            paddingRight: 16,
            backgroundColor: "#fff",
            marginTop: 10,
            paddingVertical: 16,
          }}
        >
          <ContentLoader
            tHeight={72}
            tWidth={SCREEN_WIDTH - 48}
            pRows={0}
            titleStyles={{ borderRadius: 12 }}
          />
        </View>
      ) : (
        <List.AccordionGroup>{exams.map(renderExams)}</List.AccordionGroup>
      )}
    </ScrollView>
  );
}
