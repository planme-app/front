import { atom, selector } from 'recoil';
import { routinesApi } from 'controllers/services/api';

const initialDate = () => {
  return `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;
};

export const routineDate = atom({
  key: 'routineDate',
  default: initialDate()
});

export const routinesState = selector({
  key: 'routinesState',
  get: async ({ get }) => {
    const date = get(routineDate);
    const result = await routinesApi(date);
    return result;
  }
});
