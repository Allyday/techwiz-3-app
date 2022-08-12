import _ from 'lodash';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

import StudentGradeItem from './StudentGradeItem';

const examNameMap = {
  ASSIGNMENT: 'Assignment',
  MIDDLE: 'Midterm',
  FINAL: 'Final',
};

export default function TermExams({ exams, students }) {
  const renderExams = (exam) => {
    const studentsWithGrades = _.unionBy(exam.grades, students, 'id');
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
        {studentsWithGrades.map(renderStudentGrade)}
      </List.Accordion>
    );
  };

  return (
    <ScrollView>
      <List.AccordionGroup>{exams.map(renderExams)}</List.AccordionGroup>
    </ScrollView>
  );
}
