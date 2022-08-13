import _ from 'lodash';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

import { gradeAPI } from '../../../apis';
import { useToken } from '../../../hooks/useToken';
import StudentGradeItem from './StudentGradeItem';

const examNameMap = {
  ASSIGNMENT: 'Assignment',
  MIDDLE: 'Midterm',
  FINAL: 'Final',
};

export default function TermExams({ classSubject, students, term }) {
  const [exams, setExams] = useState([]);
  const [token] = useToken();

  useEffect(() => {
    getExamGrades();
  }, [getExamGrades]);

  const getExamGrades = async () => {
    const params = {
      class_id: classSubject.id,
      subject_id: classSubject.subjectId,
      term,
    };
    const { data } = await gradeAPI.getAll(token, params);
    const { payload } = data;
    setExams(payload);
  };

  const renderExams = (exam) => {
    const mergedStudents = _.merge(
      _.keyBy(exam.grades, 'id'),
      _.keyBy(students, 'id')
    );
    const studentsWithGrades = _.sortBy(_.values(mergedStudents), 'name');

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
      <List.AccordionGroup>{exams.map(renderExams)}</List.AccordionGroup>
    </ScrollView>
  );
}
