import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';

interface LoginPayload {
  accessToken: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

class LoginStore {
  accessToken = '';

  user: LoginPayload['user'] = {
    id: '',
    email: '',
    username: ''
  };

  constructor() {
    makeObservable(this, {
      accessToken: observable,
      user: observable,
      login: action.bound,
      logout: action.bound
    });
  }

  async login(id: string, pw: string) {
    try {
      const res = await axios.post(
        'NEXT_PUBLIC_REACT_APP_API_URL/api/user/signin',
        { id, pw }
      );
      if (res.status === 200) {
        const { accessToken, user } = res.data;
        this.accessToken = accessToken;
        this.user = user;
        localStorage.setItem('access-token', accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    this.accessToken = '';
    this.user = {
      id: '',
      email: '',
      username: ''
    };
    localStorage.removeItem('access-token');
  }
}

export default LoginStore;
