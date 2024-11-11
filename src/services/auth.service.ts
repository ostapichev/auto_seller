import { AxiosResponse } from 'axios';

import { axiosService } from './axios.service';
import { IAuth, ITokens, IUser } from '../interfaces';
import { IRes } from '../types';
import { urls } from '../constants';

class AuthService {
    private readonly accessKey = 'access';
    private readonly refreshKey = 'refresh';

    public register(dataUser: IAuth ): IRes<IUser> {
        return axiosService.post<IUser>(urls.authAPI.signUp, dataUser);
    };

    public async login(user: IAuth): Promise<IUser> {
        const { data }: AxiosResponse = await axiosService.post(urls.authAPI.signIn, user);
        this.setTokens(data);
        const { data: me }: AxiosResponse<IUser> = await this.me();
        return me;
    };

    public me(): IRes<IUser>{
        return axiosService.get<IUser>(urls.usersAPI.me);
    };

    public deleteTokens(): void {
        localStorage.removeItem(this.accessKey);
        localStorage.removeItem(this.refreshKey);
    };

    public async refresh(): Promise<void> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            throw new Error("Refresh token isn't exists");
        }
        const { data }: AxiosResponse<ITokens> = await axiosService.post(
            urls.authAPI.refresh, { refresh: refreshToken }
        );
        this.setTokens(data);
    };

    public getAccessToken(): string {
        return localStorage.getItem(this.accessKey);
    };

    private getRefreshToken(): string {
        return localStorage.getItem(this.refreshKey);
    };

    private setTokens({access, refresh}: ITokens): void {
        localStorage.setItem(this.accessKey, access);
        localStorage.setItem(this.refreshKey, refresh);
    };
}

export const authService = new AuthService();
