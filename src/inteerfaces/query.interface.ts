export interface IQueryString {
    page?: number;
    search?: string;
    cityId?: string;
}

export interface IQuery<T> extends IQueryString {
    data?: T;
    total?: number;
}
