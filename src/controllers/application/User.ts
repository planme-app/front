import {
  checkEmail,
  checkName,
  checkPw,
  confirmPw
} from 'controllers/domain/User';
import { getSingup } from 'controllers/services/api';

enum MessageObj {
  email = '이메일을 확인해주세요.',
  pw = '비밀번호를 확인해주세요.',
  twoPw = '같은 비밀번호인지 확인해주세요.',
  name = '이름을 확인해주세요.'
}

export function signup(email: string, pw: string, twoPw: string, name: string) {
  if (!checkEmail(email)) {
    return { result: false, message: MessageObj.email };
  } else if (!checkPw(pw)) {
    return { result: false, message: MessageObj.pw };
  } else if (!confirmPw(pw, twoPw)) {
    return { result: false, message: MessageObj.twoPw };
  } else if (!checkName(name)) {
    return { result: false, message: MessageObj.name };
  } else {
    return getSingup(email, pw, twoPw, name);
  }
}
