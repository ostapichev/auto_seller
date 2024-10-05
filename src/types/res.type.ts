import { AxiosResponse } from 'axios';

import { IQuery } from '../inteerfaces';

export type IRes<T> = Promise<AxiosResponse<T>>;
export type IResQuery<T> = IRes<IQuery<T>>;
