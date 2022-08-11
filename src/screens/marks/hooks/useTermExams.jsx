import TermExams from '../components/TermExams';

const EXAM_PER_TERM = 3;

export default function useTermExams({ data }) {
  const TermOne = () => <TermExams exams={data.slice(0, EXAM_PER_TERM)} />;

  const TermTwo = () => <TermExams exams={data.slice(EXAM_PER_TERM)} />;

  return { TermOne, TermTwo };
}
