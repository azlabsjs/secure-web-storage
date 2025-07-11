import { createStorage, InMemoryStorage } from '../src';

const storage = createStorage(new InMemoryStorage(), 'MyPassword', 'my_app_');

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
  it('should return the size of the storage and expect the size to equals 1', () => {
    storage.setItem('key1', { lat: 3.784943, long: 1.76284 });
    storage.setItem('key2', { lat: 3.9838, long: 1.00724 });
    expect(storage.size()).toEqual(2);
  });
});
