import WebStorageCache from "web-storage-cache";

// 超时时间，单位秒
const OUT_TIMES_SECONDS = 60 * 60 * 24 * 2;

export class Storage {
  wsCache = new WebStorageCache();
  save(key: string, value: any, exp = OUT_TIMES_SECONDS) {
    this.wsCache.set(key, value, { exp });
    // window.localStorage.setItem(key, value);
  }

  get(key: string) {
    return this.wsCache.get(key) ?? null;
  }

  delete(key: string) {
    this.wsCache.delete(key);
  }

  clear() {
    this.wsCache.clear();
  }
}

export default new Storage();
