import { AxiosRequestConfig } from "axios";

import { axiosService } from "./axios.service";
import { IBrand, ICar, IParams } from "../inteerfaces";
import { IRes, IResQuery } from "../types";
import { urls } from "../constants";

class CarService {
    public getCars(params: IParams): IResQuery<ICar[]> {
        const config: AxiosRequestConfig = { params };
        return axiosService.get(urls.carsAPI.cars, config);
    };

    public getBrands(): IRes<IBrand[]> {
        return axiosService.get(urls.carsAPI.brands);
    };
}

export const carService = new CarService();
