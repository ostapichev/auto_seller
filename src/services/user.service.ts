import { axiosService } from './axios.service';
import { IUser } from '../interfaces';
import { urls } from '../constants';

class UserService {
    public async addAvatar(image: string): Promise<IUser> {
        return await axiosService.post(urls.usersAPI.avatar, image);
    }
}

export const userService = new UserService();
