import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

const URL_SIGNUP = `${API_BASE_URL}/api/user/signup`;

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
    if (res.status == 201) {
      return { result: true, message: '회원가입을 완료하였습니다.' };
    } else {
      return { result: false, message: 'error 입니다.' };
    }
  } catch (err) {
    return { result: false, message: 'error 입니다.' };
  }
}
