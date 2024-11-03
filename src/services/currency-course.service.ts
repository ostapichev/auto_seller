import { axiosService } from './axios.service';
import { ICurrency } from '../interfaces';
import { IRes } from '../types';
import { urls } from '../constants';

class CurrencyService {
  public getCurrencyRate(): IRes<ICurrency[]> {
      return axiosService.get(urls.currency_courseAPI.currency_course);
  };
}

export const currencyService = new CurrencyService();
