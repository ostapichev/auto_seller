import { GenderEnum } from '../enums';
import { ITokens } from './token.interface';
import { IUser } from './user.interface';

export interface IAuth {
    name: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword?: string;
    gender: GenderEnum;
    avatar?: string;
    deviceId?: string;
}

export interface IAuthResponse {
    tokens: ITokens;
    user: IUser;
}
