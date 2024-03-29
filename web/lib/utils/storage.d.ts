import WebStorageCache from "web-storage-cache";
export declare class Storage {
    wsCache: WebStorageCache;
    save(key: string, value: any, exp?: number): void;
    get(key: string): any;
    delete(key: string): void;
    clear(): void;
}
declare const _default: Storage;
export default _default;
