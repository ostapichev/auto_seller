import { AccountTypeEnum, GenderEnum, UserRoleEnum } from '../enums';
import { ICar } from './car.interface';

export interface IUser {
    image?: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    gender: GenderEnum;
    role: UserRoleEnum;
    account: AccountTypeEnum;
    balance: number;
    status:	boolean;
    cars?: ICar[];
}
