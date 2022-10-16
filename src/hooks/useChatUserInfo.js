import { useMemo } from 'react';

import { ROLES } from '../utils/constants';

export default function useChatUserInfo(user) {
  const title = useMemo(
    () => [user.first_name.trim(), user.last_name.trim()].join(' '),
    [user]
  );
  const description = useMemo(() => {
    switch (user.role) {
      case ROLES.STUDENT:
        return `Class ${user.class_name}`;
      case ROLES.TEACHER:
        const subjects = user.details.map((subj) => subj.subject_name);
        return `Teaches ${subjects.join(', ')}`;
      case ROLES.PARENT:
        const children = user.details.map((child) => {
          const name = [
            child.student_first_name.trim(),
            child.student_last_name.trim(),
          ].join(' ');

          return `${name} (${child.class_name})`;
        });

        return `Parent of ${children.join(', ')}`;
    }
  }, [user]);

  return { title, description };
}
