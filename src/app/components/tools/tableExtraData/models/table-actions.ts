import { TABLE_ACTION } from '../enums/action.enum';

export interface TableAction<T = any> {
    action: TABLE_ACTION;
    row: T;
}