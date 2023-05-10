import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

const URL_LOGIN = `${API_BASE_URL}/api/user/signin`;

export const loginApi = async (email: string, password: string) => {
  try {
    const res = await axios.post(URL_LOGIN, {
      email,
      password
    });
    console.log(res);
    if (res.data.status == 201) {
      return res.data;
    } else {
      return { result: false, message: res.data.error };
    }
  } catch (error) {
    return { result: false, message: 'error 입니다.' };
  }
};
