import jwtDecode from 'jwt-decode';
import { AxiosResponse } from 'axios';
import { APP_KEYS } from '../../common/consts';
import { HttpService } from '../../common/services/http.service';
import { IUserBody, IAuthResponse, IChangePasswordBody } from '../types/auth.type';

type Token = {
  iat: number;
  exp: number;
  user: {
    email: string;
    id: string;
  };
};

class AuthService extends HttpService {
  isLoggedIn(): boolean {
    return !!localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN);
  }

  getUserId(): string {
    const decodedToken: Token = jwtDecode(localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN) || '');
    return decodedToken.user.id;
  }

  loginUser(user: IUserBody): Promise<AxiosResponse<IAuthResponse>> {
    return this.post({
      url: `${APP_KEYS.BACKEND_KEYS.USER}${APP_KEYS.BACKEND_KEYS.LOGIN}`,
      data: user
    });
  }

  registerUser(user: IUserBody): Promise<AxiosResponse<IAuthResponse>> {
    return this.post({
      url: `${APP_KEYS.BACKEND_KEYS.USER}${APP_KEYS.BACKEND_KEYS.REGISTER}`,
      data: user
    });
  }

  changePassword(newUser: IChangePasswordBody): Promise<AxiosResponse<IAuthResponse>> {
    return this.put({
      url: `${APP_KEYS.BACKEND_KEYS.USER}${APP_KEYS.BACKEND_KEYS.CHANGE_PASSWORD}`,
      data: newUser
    });
  }
}

export const authService = new AuthService();
