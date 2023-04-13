export interface IAuthResponse {
  email: string;
  token: string;
}

export interface IUserBody {
  user: {
    email: string;
    password: string;
  };
}

export interface IChangePasswordBody {
  newUser: {
    email: string;
    password: string;
    newPassword: string;
  };
}
