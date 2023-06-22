import { atom } from 'recoil';

export interface RoutineType {
  routine_instance_id: string;
  title: string;
  type: string;
  days_of_week: string[];
  created_at: Date;
  goal: number | boolean;
  progress: number | boolean;
}

const initialDate = () => {
  return `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;
};

export const routineDate = atom({
  key: 'routineDate',
  default: { date: initialDate(), prevDate: -1, nextDate: 1 }
});

export const routineList = atom<RoutineType[]>({
  key: 'routineList',
  default: []
});

export const timerState = atom({
  key: 'timerState',
  default: false
});

export const mypageState = atom({
  key: 'mypageState',
  default: false
});
