export class FilterDto<OBJ extends object = AnyObject>{
    select?: (keyof OBJ)[];
    fields?: Fields<OBJ>;
    order?: Order<OBJ>;
    limit?: number;
    skip?: number;
    take?: number;
    offset?: number;
    relations?: string[];
    cache?: boolean | number | { id: any; milliseconds: number; };
    join?: any;
    where?:  ObjectLiteral | string ;
}

export declare type Fields<MT = AnyObject> = {
    [P in keyof MT]?: boolean;
};


export declare type Order<MT = AnyObject> = {
    [P in keyof MT]: Direction;
};

export declare type Direction = 'ASC' | 'DESC' | 1 | -1;

export interface ObjectLiteral {
    [key: string]: any;
}

export interface AnyObject {
    [property: string]: any;
}