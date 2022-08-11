import { FlatList } from 'react-native';
import { List } from 'react-native-paper';

import StudentGradeItem from './StudentGradeItem';

export default function TermExams({ exams }) {
  return (
    <List.AccordionGroup>
      {exams.map((exam) => {
        exam.studentCount = exam.grades.length;
        exam.studentHasGradeCount = exam.grades.filter(
          (student) => student.grade !== null
        ).length;

          const renderStudentGrade = ({ item }) => {
            return <StudentGradeItem key={item.name} student={item} exam={exam}/>;
          };

        return (
          <List.Accordion
            title={exam.name}
            description={`${exam.studentHasGradeCount} / ${exam.studentCount} completed`}
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
