import { FlatList } from 'react-native';
import { List } from 'react-native-paper';

import StudentGradeItem from './StudentGradeItem';

export default function TermExams({ exams }) {
  const renderStudentGrade = ({ item }) => {
    return <StudentGradeItem key={item.name} student={item} />;
  };

  return (
    <List.AccordionGroup>
      {exams.map((exam) => {
        const studentCount = exam.grades.length;
        const studentHasGradeCount = exam.grades.filter(
          (student) => student.grade !== null
        ).length;

        return (
          <List.Accordion
            title={exam.name}
            description={`${studentHasGradeCount} / ${studentCount} completed`}
            id={exam.name}
          >
            <FlatList
              data={exam.grades}
              renderItem={renderStudentGrade}
              contentContainerStyle={{ paddingHorizontal: 12 }}
            />
          </List.Accordion>
        );
      })}
    </List.AccordionGroup>
  );
}
