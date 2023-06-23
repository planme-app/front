import { putRoutineUpdate } from 'controllers/services/api';
import Cookies from 'js-cookie';

export function usePutRoutine() {
  const putRoutine = (
    routineId: string,
    type: string,
    progress: number | boolean
  ) => {
    const userId = Cookies.get('userId');
    if (userId) {
      return putRoutineUpdate(userId, routineId, type, progress);
    }
    return Promise.reject('에러가 발생했습니다.');
  };

  return { putRoutine };
}
