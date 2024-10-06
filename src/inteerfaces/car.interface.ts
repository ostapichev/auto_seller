import { CurrencyEnum } from "../enums";
import { ICurrency } from "./currency.interface";

export interface ICar {
    id: string;
    photo: string;
    brand: string;
    model: string;
    color: string;
    year: number;
    title: string;
    description: string;
    start_price: number;
    update_price: number;
    currency: CurrencyEnum;
    created: Date;
    updated: Date;
    start_currencies_rate: ICurrency[];
    city: string;
    user_id: string;
}