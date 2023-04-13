import { BAD_REQUEST, CREATED } from 'http-status-codes';
import { HttpError } from '../utils/createError';
import { IUser, IChangePassword, IUserRequest, Register, Login } from '../types/user.type';
import UserService from '../services/user.service';

export class UserController {
  constructor(private userService: UserService) {}

  async register(req: IUserRequest<{ user: Register }>) {
    const { email, password } = req.body.user;
    const data = await this.userService.register({ email, password });

    return {
      data,
      status: CREATED
    };
  }

  async login(req: IUserRequest<{ user: Login }>) {
    const { email, password } = req.body.user;
    const data = await this.userService.login({ email, password });
    return {
      data
    };
  }

  async resetPassword(req: IUserRequest<{ newUser: IChangePassword; user: IUser }>) {
    const { email, password, newPassword } = req.body.newUser;
    const myUser = await this.userService.findUserByEmail(email);
    if (myUser.email !== req.body.user.email) {
      throw new HttpError({ httpCode: BAD_REQUEST, message: 'Wrong email!' });
    }
    const userId = myUser.id;

    const data = await this.userService.changePassword({ email, password, newPassword }, userId);
    return {
      data
    };
  }
}

const userController = new UserController(new UserService());
export default userController;
