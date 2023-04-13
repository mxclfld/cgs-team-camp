import { AxiosResponse } from 'axios';
import { APP_KEYS } from '../../common/consts';
import { HttpService } from '../../common/services/http.service';
import { IUserBody, IAuthResponse, IChangePasswordBody } from '../types/auth.type';

class AuthService extends HttpService {
  isLoggedIn(): boolean {
    return !!localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN);
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
