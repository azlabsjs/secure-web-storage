import CryptoES from 'crypto-es';

type HashFn = (key: string) => string | CryptoES.lib.WordArray;
type DecrypterFn = (data: string | CryptoES.lib.CipherParams) => any;
type EncrypterFn = (data: any) => string | CryptoES.lib.WordArray;

/**
 * @internal
 *
 * Type definition for secure storage options
 */
type SecureStorageOptionType = {
  hash: HashFn;
  encrypt: EncrypterFn;
  decrypt: DecrypterFn;
};

/**
 * Custom storage type defintion that will use Javascript {@see Storage}
 * instance internally
 */
export interface StorageInterface {
  /**
   * @description Get a value from the key -> value store
   */
  get<T>(key: string): T;

  /**
   * @description Set a value in the key -> value store
   */
  set<T>(key: string, value: T): void;

  /**
   * @description Delete item from the key -> value store with a provided key
   */
  delete(key: string): void;

  /**
   * @description Clear or reinitialize the key -> value store
   */
  clear(): void;
}

// @internal
abstract class SecureStorage implements Storage {
  // Properties definition
  get length() {
    return this.storage.length;
  }

  constructor(
    private storage: Storage,
    private options: SecureStorageOptionType
  ) {}

  /**
   * @description Get a value from the key -> value store
   */
  getItem(key: string): any {
    const value = this.storage.getItem(this.options.hash(key) as string);
    return typeof value !== 'string'
      ? value
      : JSON.parse(this.options.decrypt(value));
  }

  /**
   * @description Set a value in the key -> value store
   */
  setItem(key: string, value: any): any {
    return this.storage.setItem(
      this.options.hash(key) as string,
      this.options.encrypt(JSON.stringify(value)) as string
    );
  }

  /**
   * @description Delete item from the key -> value store with a provided key
   */
  removeItem(key: string): any {
    return this.storage.removeItem(this.options.hash(key) as string);
  }

  /**
   * @description Clear or reinitialize the key -> value store
   */
  clear(): void {
    return this.storage.clear();
  }

  key(id: number): string {
    return this.storage.key(id) as string;
  }

  /**
   * Returns the internal cache provider
   *
   * @returns
   */
  getInternal = () => this.storage;
}

/**
 * In Memory cache provider. It makes use of Javascript
 * map data structure internally to keep track of state changes
 *
 * @example
 * // Create an instance of secure storage
 * const storage = new InMemoryStorage;
 *
 * // Adding an item to the storage
 * storage.setItem('item', {
 *  // ... Object defintion
 * });
 *
 * // Getting an element to the storage
 * const value: Object = storage.setItem('item');
 *
 * // Deleting an item from the cache
 * storage.removeItem('item');
 *
 * // Flushing cache
 * storage.clear();
 */
export class InMemoryStorage implements Storage {
  // Properties definition
  private cache = new Map<string, string>();
  // Length property getter
  get length() {
    return this.cache.size;
  }

  /**
   * @description Get a value from the key -> value store
   */
  getItem(key: string): any {
    const value = this.cache.get(key);
    return typeof value !== 'string' ? value : JSON.parse(value);
  }

  /**
   * @description Set a value in the key -> value store
   */
  setItem(key: string, value: any) {
    this.cache.set(key, JSON.stringify(value));
  }

  /**
   * @description Delete item from the key -> value store with a provided key
   */
  removeItem(key: string) {
    this.cache.delete(key);
  }

  /**
   * @description Clear or reinitialize the key -> value store
   */
  clear(): void {
    this.cache.clear();
  }

  key = (id: number) => Array.from(this.cache.keys())[id];
}

/**
 * Provides a storage object that encrypt it key -> value pair before
 * adding it to cache.
 *
 * @example
 * // Create an instance of secure storage
 * const storage = new SecureWebStorage(window.sessionStorage, 'APP-SECRET');
 *
 * // Adding an item to the storage
 * storage.setItem('item', {
 *  // ... Object defintion
 * });
 *
 * // Getting an element to the storage
 * const value: Object = storage.setItem('item');
 *
 * // Deleting an item from the cache
 * storage.removeItem('item');
 *
 * // Flushing cache
 * storage.clear();
 */
export class SecureWebStorage extends SecureStorage {
  // Constructor function
  constructor(storage: Storage, secret: string) {
    super(storage, {
      hash: function hash(key: string): string | CryptoES.lib.WordArray {
        const $hash = CryptoES.MD5(key);
        return $hash.toString();
      },
      encrypt: function encrypt(data: any): string | CryptoES.lib.WordArray {
        data = CryptoES.AES.encrypt(data, secret);
        return data.toString();
      },
      decrypt: function(data: string | CryptoES.lib.CipherParams): any {
        const plain = CryptoES.AES.decrypt(data, secret);
        return plain.toString(CryptoES.enc.Utf8);
      },
    });
  }
}

/**
 * Provides a storage object that encrypt it key -> value pair before
 * adding it to cache.
 *
 * It internally use an internal cache a.k.a { @see window.sessionStorage }|{ @see window.localStorage }
 * implementation offered by javascript api.
 *
 * @example
 * // Create an instance of secure storage
 * const storage = createStorage(window.sessionStorage, 'APP-SECRET');
 *
 * // Adding an item to the storage
 * storage.setItem('item', {
 *  // ... Object defintion
 * });
 *
 * // Getting an element to the storage
 * const value: Object = storage.setItem('item');
 *
 * // Deleting an item from the cache
 * storage.removeItem('item');
 *
 * // Flushing cache
 * storage.clear();
 */
export const createStorage = (internal: Storage, secret: string) =>
  new SecureWebStorage(internal, secret);
