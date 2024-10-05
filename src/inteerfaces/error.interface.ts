export interface IErrorCity {
    name?: string;
}

export interface IErrorCurrency {
    ccy?: string;
    base_ccy?: string;
    buy?: string;
    sale?: string;
}

export interface IErrorCar {
    photo?: string[];
    brand?: string[];
    model?: string[];
    title?: string[];
    color?: string[];
    description?: string[];
    start_price?: string[];
    update_price?: string[];
    currency?: string[];
    start_currencies_rate?: string[];
    user?: string[];
}
