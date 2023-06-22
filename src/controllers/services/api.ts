import routines from 'pages/api/user/[userId]/routines';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

export const API_BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

const URL_SIGNUP = `${API_BASE_URL}/api/user/signup`;
const URL_LOGIN = `${API_BASE_URL}/api/user/signin`;
const URL_GET_TEMPLATE = `${API_BASE_URL}/api/template`;

const URL_ROUTINES = ({
  userId,
  date
}: {
  userId?: string | null;
  date: string;
}) => {
  return `${API_BASE_URL}/api/user/${userId}/routines?date=${date}`;
};

const URL_ROUTINE_UPDATE = ({
  userId,
  routineId
}: {
  userId: string;
  routineId: string;
}) => {
  return `${API_BASE_URL}/api/user/${userId}/routine-instance/${routineId}`;
};

enum MessageObj {
  success = '회원가입을 완료하였습니다.',
  error = 'error 입니다.'
}

export const getSingup = async (
  email: string,
  pw: string,
  twoPw: string,
  name: string
) => {
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
    return { result: false, message: '이미 존재하는 계정입니다.' };
  }
};

export const loginApi = async (email: string, passwd: string) => {
  try {
    const res = await axios.post(URL_LOGIN, {
      email,
      passwd
    });
    if (res.status === 200) {
      const accessToken = res.data.accessToken;
      const userId = res.data.user.id;
      const userName = res.data.user.userName;
      const userEmail = res.data.user.email;
      Cookies.set('Authorization', `Bearer ${accessToken}`, { expires: 7 });
      Cookies.set('userId', userId, { expires: 7 });
      Cookies.set('userName', userName, { expires: 7 });
      Cookies.set('userEmail', userEmail, { expires: 7 });
      return res.data;
    } else {
      return {
        result: false,
        message: `HTTP 상태 코드: ${res.status}`
      };
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const status = error.response.status;
      if (status == 401) {
        return {
          result: false,
          message: '이메일 또는 비밀번호가 잘못 입력 되었습니다.'
        };
      } else {
        return {
          result: false,
          message: `알 수 없는 에러가 발생했습니다. (HTTP 상태 코드: ${status})`
        };
      }
    } else {
      return {
        result: false,
        message: `알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.`
      };
    }
  }
};

export const routinesApi = async (date: string, userId?: string | null) => {
  try {
    const res = await axios.get(
      `https://cd84f081-598a-4df9-899c-e600a685c815.mock.pstmn.io/api/user/${userId}/routines?date=${date}`
    );

    if (res.status === 200) {
      return res.data;
    } else {
      return {
        result: false,
        message: `HTTP 상태 코드: ${res.status}`
      };
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const status = error.response.status;
      if (status == 404) {
        return {
          result: false,
          message: '사용자 ID를 찾을 수 없습니다.'
        };
      } else {
        return {
          result: false,
          message: `알 수 없는 에러가 발생했습니다. (HTTP 상태 코드: ${status})`
        };
      }
    } else {
      return {
        result: false,
        message: `알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.`
      };
    }
  }
};

export const putRoutineUpdate = async (
  userId: string,
  routineId: string,
  type: string,
  progress: number | boolean
) => {
  try {
    const data = {
      type,
      progress
    };
    const res = await axios.put(
      URL_ROUTINE_UPDATE({ userId, routineId }),
      data
    );
    if (res.status === 200) {
      return { result: true, message: 'success', data: res.data };
    } else {
      return {
        result: false,
        message: `HTTP 상태 코드: ${res.status}`
      };
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const status = error.response.status;
      if (status == 404) {
        return {
          result: false,
          message: `에러가 발생했습니다. (HTTP 상태 코드: ${status})`
        };
      } else {
        return {
          result: false,
          message: `알 수 없는 에러가 발생했습니다. (HTTP 상태 코드: ${status})`
        };
      }
    } else {
      return {
        result: false,
        message: `알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.`
      };
    }
  }
};

export const getTemplate = async () => {
  try {
    const res = await axios.get(URL_GET_TEMPLATE);
    if (res.status === 200) {
      return { result: true, message: 'success', data: res.data };
    } else {
      return { result: false, message: res.data.error, data: {} };
    }
  } catch (err) {
    return {
      result: false,
      message: `알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.`,
      data: {}
    };
  }
};
