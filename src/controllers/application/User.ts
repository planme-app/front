import {
  checkEmail,
  checkName,
  checkPw,
  confirmPw
} from 'controllers/domain/User';
import { getSingup } from 'controllers/services/api';

export function signup(email: string, pw: string, twoPw: string, name: string) {
  if (!checkEmail(email)) {
    return { result: false, message: '이메일을 확인해주세요.' };
  } else if (!checkPw(pw)) {
    return { result: false, message: '비밀번호를 확인해주세요.' };
  } else if (!confirmPw(pw, twoPw)) {
    return { result: false, message: '같은 비밀번호인지 확인해주세요.' };
  } else if (!checkName(name)) {
    return { result: false, message: '이름을 확인해주세요.' };
  } else {
    return getSingup(email, pw, twoPw, name);
  }
}
