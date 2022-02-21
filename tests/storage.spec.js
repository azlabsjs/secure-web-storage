import { createStorage, InMemoryStorage } from '../dist';

const storage = createStorage(new InMemoryStorage(), 'password');

describe('Secure Storage Tests', () => {
  it('Creates an instance of StorageInterface', () => {
    expect(storage.getInternal()).toBeInstanceOf(InMemoryStorage);
  });
  it('should add an item into the storage with the key=key1', () => {
    storage.setItem('key1', { lat: 3.784943, long: 1.76284 });
    expect(storage.getItem('key1')).toEqual({ lat: 3.784943, long: 1.76284 });
  });
  it('should hash the key=key1 before adding it to the internal storage', () => {
    storage.setItem('key1', { lat: 3.784943, long: 1.76284 });
    expect(storage.getInternal().key(0)).not.toEqual('key1');
  });
});
