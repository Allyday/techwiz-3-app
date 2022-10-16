import _ from 'lodash';
import { ROLES } from './constants';

export function getChatUserInfo(user) {
  const title = [user.first_name.trim(), user.last_name.trim()].join(' ');

  let description = '';
  switch (user.role) {
    case ROLES.STUDENT:
      description = `Class ${user.class_name}`;
      break;
    case ROLES.TEACHER:
      if (user.details?.length) {
        const subjects = _.uniqBy(
          user.details.map((subj) => subj.subject_name),
          (e) => e.subject_id
        );
        user.details.map((subj) => subj.subject_name);
        description = `Teaches ${subjects.join(', ')}`;
      }
      break;

    case ROLES.PARENT:
      if (user.details) {
        const children = user.details.map((child) => {
          const name = [
            child.student_first_name.trim(),
            child.student_last_name.trim(),
          ].join(' ');

          return `${name} (${child.class_name})`;
        });
        description = `Parent of ${children.join(', ')}`;
      }
      break;
  }

  return { title, description };
}
