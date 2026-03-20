export class StorageManager<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  save(data: T): void {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(this.key, serializedData);
    } catch (error) {
      console.error(`Error guardando en LocalStorage [${this.key}]:`, error);
    }
  }

  load(): T | null {
    try {
      const data = localStorage.getItem(this.key);
      return data ? (JSON.parse(data) as T) : null;
    } catch (error) {
      console.error(`Error cargando desde LocalStorage [${this.key}]:`, error);
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}
