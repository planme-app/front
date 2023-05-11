import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

const URL_SIGNUP = `${API_BASE_URL}/api/user/signup`;

const URL_LOGIN = `${API_BASE_URL}/api/user/signin`;

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
      return { result: false, message: res.data.error };
    }
  } catch (err) {
    return { result: false, message: 'error 입니다.' };
  }
}

export const loginApi = async (email: string, passwd: string) => {
  try {
    const res = await axios.post(URL_LOGIN, {
      email,
      passwd
    });
    if (res.status == 200) {
      const accessToken = res.data.accessToken;
      localStorage.setItem('Authorization', `Bearer ${accessToken}`);
      return res.data;
    } else {
      return { result: false, message: res.data.error };
    }
  } catch (error) {
    return { result: false, message: error };
  }
};
