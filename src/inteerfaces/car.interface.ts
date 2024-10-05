import { CurrencyEnum } from "../enums";

export interface ICar {
    id: string;
    photo: string;
    brand: string;
    model: string;
    title: string;
    color: string;
    description: string;
    start_price: number;
    update_price: number;
    currency: CurrencyEnum;
    start_currencies_rate: string;
    user: string;
}