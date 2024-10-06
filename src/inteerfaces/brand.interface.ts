import { IModel } from "./model.interface";

export interface IBrand {
    id: string;
    name: string;
    models?: IModel[];
}
