export interface WindowContext {
    entry?: string;
    extra_head?: string[];
    libs?:Record<string, any>;
    name: string;
    route: any;
    static: string;
    [key: string]: any;
}
