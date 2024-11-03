export interface IQuery<T> {
    data?: T;
    total?: number;
    page?: number;
    search?: string;
    cityId?: string;
}
