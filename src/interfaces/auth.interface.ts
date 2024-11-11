import { GenderEnum } from '../enums';

export interface IAuth {
    name: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword?: string;
    gender: GenderEnum;
    deviceId?: string;
}
