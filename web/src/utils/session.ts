export class SessionStorage {
  save(key: string, value: any) {
    window.sessionStorage.setItem(key, value);
  }

  get(key: string) {
    return window.sessionStorage.get(key) ?? null;
  }

  delete(key: string) {
    window.sessionStorage.removeItem(key);
  }
}

export default new SessionStorage();
