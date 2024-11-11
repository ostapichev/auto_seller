import axios, { AxiosError } from 'axios';
import { createBrowserHistory } from 'history';

import { authService } from './auth.service';
import { baseURL, urls } from '../constants';
import { IFuncVoid } from '../types';

const axiosService = axios.create({ baseURL });
const waitList: IFuncVoid[] = [];
const history = createBrowserHistory({ window });
let isRefreshing = false;

axiosService.interceptors.request.use(res => {
    const access = authService.getAccessToken();
    if (access) {
        res.headers.Authorization = `Bearer ${access}`;
    }
    return res;
});
axiosService.interceptors.response.use(res => {
        return res;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    await authService.refresh();
                    isRefreshing = false;
                    afterRefresh();
                    return axiosService(originalRequest);
                } catch (e) {
                    authService.deleteTokens();
                    isRefreshing = false;
                    history.replace('/login?expSession=true')
                    return Promise.reject(error);
                }
            }
            if (originalRequest.url === urls.authAPI.refresh) {
                return Promise.reject(error);
            }
            return new Promise(resolve => {
                const myFunc = () => {
                    resolve(axiosService(originalRequest));
                };
                subscribeToWaitList(myFunc);
            });
        }
        return Promise.reject(error);
    });

const subscribeToWaitList = (cb: IFuncVoid): void => {
    waitList.push(cb);
};
const afterRefresh = () => {
    while (waitList.length) {
        const cb = waitList.pop();
        cb();
    }
};

export {
    axiosService,
    history,
};
