import { AxiosRequestConfig } from "axios";

import { axiosService } from "./axios.service";
import { ICar, IParams } from "../inteerfaces";
import { IResQuery } from "../types";
import { urls } from "../constants";

class CarService {
    public getCars(params: IParams): IResQuery<ICar[]> {
        const config: AxiosRequestConfig = { params };
        return axiosService.get(urls.carsAPI.cars, config);
    };
};

export const carService = new CarService();
