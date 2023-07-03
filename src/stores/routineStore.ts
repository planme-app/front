import { atom } from 'recoil';
import dayjs from 'dayjs';

export interface RoutineType {
  routine_instance_id: string;
  title: string;
  type: string;
  days_of_week: string[];
  created_at: Date;
  goal: number | boolean;
  progress: number | boolean;
}

export interface EditType {
  editSlide: boolean;
  deleteSlide: boolean;
}
export const routineDate = atom({
  key: 'routineDate',
  default: dayjs().format('YYYY-MM-DD')
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

export const routineEditState = atom<EditType>({
  key: 'routineEditState',
  default: { editSlide: false, deleteSlide: false }
});
