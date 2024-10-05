import { CurrencyEnum } from "../enums";

export interface ICurrency {
    id: string;
    created: Date;
    ccy: CurrencyEnum;
    base_ccy: CurrencyEnum.UAH;
    buy: number;
    sale: number;
}
