import { createContext, useState } from 'react';

export const GradeContext = createContext();

export const GradeContextProvider = ({ children }) => {
  const [isGradeModalVisible, setGradeModalVisible] = useState(false);
  const [exam, setExam] = useState({});
  const [student, setStudent] = useState({});

  return (
    <GradeContext.Provider
      value={{
        exam,
        setExam,
        isGradeModalVisible,
        setGradeModalVisible,
        student,
        setStudent,
      }}
    >
      {children}
    </GradeContext.Provider>
  );
};
