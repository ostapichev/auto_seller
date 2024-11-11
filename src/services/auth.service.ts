import { AxiosResponse } from 'axios';

import { axiosService } from './axios.service';
import { IAuth, IAuthResponse, ITokens, IUser } from '../interfaces';
import { IRes } from '../types';
import { urls } from '../constants';

class AuthService {
    private readonly accessKey = 'accessToken';
    private readonly refreshKey = 'refreshToken';

    public register(user: IAuth ): IRes<IUser> {
        return axiosService.post<IUser>(urls.authAPI.signUp, user);
    };

    public async login(user: IAuth): Promise<IUser> {
        const { data }: AxiosResponse<IAuthResponse> = await axiosService.post(urls.authAPI.signIn, user);
        this.setTokens(data.tokens);
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

    private setTokens({accessToken, refreshToken}: ITokens): void {
        console.log(accessToken);
        localStorage.setItem(this.accessKey, accessToken);
        localStorage.setItem(this.refreshKey, refreshToken);
    };
}

export const authService = new AuthService();
