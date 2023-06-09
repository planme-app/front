import { atom } from 'recoil';

export const timerState = atom({
  key: 'timerState',
  default: false
});

export const timeStateRecoil = atom({
  key: 'timeStateRecoil',
  default: { goal: 150, progress: 0, time: `00:00`, percent: 0 }
});

export const countStateRecoil = atom({
  key: 'countStateRecoil',
  default: { goal: 150, progress: 0, percent: 0 }
});
