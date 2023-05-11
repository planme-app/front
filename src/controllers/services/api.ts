import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

const URL_SIGNUP = `${API_BASE_URL}/api/user/signup`;

enum MessageObj {
  success = '회원가입을 완료하였습니다.',
  error = 'error 입니다.'
}

export async function getSingup(
  email: string,
  pw: string,
  twoPw: string,
  name: string
) {
  try {
    const res = await axios.post(URL_SIGNUP, {
      email: email,
      passwd: pw,
      name: name
    });
    if (res.status === 201) {
      return { result: true, message: MessageObj.success };
    } else {
      return { result: false, message: res.data.error };
    }
  } catch (err) {
    return { result: false, message: MessageObj.error };
  }
}
