import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { List } from 'react-native-paper';
import ContentLoader from 'react-native-easy-content-loader';

import { gradeAPI } from '../../../apis';
import { useToken } from '../../../hooks/useToken';
import StudentGradeItem from './StudentGradeItem';

export const examNameMap = {
  ASSIGNMENT: 'Assignment',
  MIDDLE: 'Midterm',
  FINAL: 'Final',
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
    return <ExamItem exam={exam} students={students} />;
  };

  return (
    <ScrollView>
      {isLoading ? (
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 16,
          }}
        >
          <View style={{ height: 70 }}>
            <ContentLoader
              tHeight={18}
              tWidth={100}
              pRows={0}
              titleStyles={{ borderRadius: 12 }}
            />
            <ContentLoader
              tHeight={10}
              tWidth={130}
              pRows={0}
              titleStyles={{ borderRadius: 12 }}
            />
          </View>
          <View style={{ height: 70 }}>
            <ContentLoader
              tHeight={18}
              tWidth={80}
              pRows={0}
              titleStyles={{ borderRadius: 12 }}
            />
            <ContentLoader
              tHeight={10}
              tWidth={130}
              pRows={0}
              titleStyles={{ borderRadius: 12 }}
            />
          </View>
          <View style={{ height: 70 }}>
            <ContentLoader
              tHeight={18}
              tWidth={50}
              pRows={0}
              titleStyles={{ borderRadius: 12 }}
            />
            <ContentLoader
              tHeight={10}
              tWidth={130}
              pRows={0}
              titleStyles={{ borderRadius: 12 }}
            />
          </View>
        </View>
      ) : (
        <List.AccordionGroup>{exams.map(renderExams)}</List.AccordionGroup>
      )}
    </ScrollView>
  );
}

const ExamItem = ({ exam, students }) => {
  const [studentHasGradeCount, setStudentHasGradeCount] = useState(
    exam.grades.length
  );
  const [studentGrades, setStudentGrades] = useState([]);

  useEffect(() => {
    const mergedStudents = _.merge(
      _.keyBy(exam.grades, 'id'),
      _.keyBy(students, 'id')
    );
    const studentsWithGrades = _.sortBy(_.values(mergedStudents), 'name');
    setStudentGrades(studentsWithGrades);
  }, [exam.grades, students]);

  const mergedStudents = _.merge(
    _.keyBy(exam.grades, 'id'),
    _.keyBy(students, 'id')
  );
  const studentsWithGrades = _.sortBy(_.values(mergedStudents), 'name');

  exam.studentGrades = useMemo(() => studentGrades, [studentGrades]);
  exam.studentCount = useMemo(
    () => studentsWithGrades.length,
    [studentsWithGrades.length]
  );
  exam.studentHasGradeCount = studentHasGradeCount;
  exam.name = examNameMap[exam.exam_name];

  const renderStudentGrade = (student) => (
    <StudentGradeItem
      key={student.id}
      student={student}
      exam={exam}
      studentHasGradeCount={studentHasGradeCount}
      setStudentHasGradeCount={setStudentHasGradeCount}
      studentGrades={studentGrades}
      setStudentGrades={setStudentGrades}
    />
  );

  return (
    <List.Accordion
      id={exam.name}
      key={exam.name}
      title={exam.name}
      description={`${studentHasGradeCount} / ${exam.studentCount} completed`}
    >
      {exam.studentGrades.map(renderStudentGrade)}
    </List.Accordion>
  );
};
