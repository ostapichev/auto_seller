import { axiosService } from "./axios.service";
import { ICity } from "../inteerfaces/city.interface";
import { urls } from "../constants";
import { IRes } from "../types";

class CityService {
    public getCities(): IRes<ICity[]> {
        return axiosService.get(urls.cityAPI.city);
    };
    
    public addCity(city: ICity): IRes<ICity> {
        return axiosService.post(urls.cityAPI.city, city);
    };
};

export const cityService = new CityService();
