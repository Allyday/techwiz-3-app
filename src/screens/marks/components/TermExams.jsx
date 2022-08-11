import { FlatList } from 'react-native';
import { List, Text } from 'react-native-paper';

export default function TermExams({ exams }) {
  const renderStudentGrade = ({ item }) => {
    return (
      <Text>
        {item.name}: {item.grade}
      </Text>
    );
  };

  return (
    <List.AccordionGroup>
      {exams.map((exam) => {
        const studentCount = exam.grades.length;
        const studentHasGradeCount = exam.grades.filter(
          (student) => !!student.grade
        ).length;

        return (
          <List.Accordion
            title={exam.name}
            description={`${studentHasGradeCount} / ${studentCount} completed`}
            id={exam.name}
          >
            <FlatList data={exam.grades} renderItem={renderStudentGrade} />
          </List.Accordion>
        );
      })}
    </List.AccordionGroup>
  );
}
