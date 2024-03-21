export class Storage {
  save(key: string, value: any) {
    window.localStorage.setItem(key, value);
  }

  get(key: string) {
    return window.localStorage.getItem(key) ?? null;
  }

  delete(key: string) {
    window.localStorage.removeItem(key);
  }
}

export default new Storage();
