# Package documentation

# Secure Web Storage

Implementation of javascript storage interface that encrypt key **value pair before writing them to cache**

# Usage

> Import
>
> ```ts
> import { createStorage, InMemoryStorage } from '../dist';
> ```

```ts
const storage = createStorage(new InMemoryStorage(), 'password');
```

## Creates an instance of StorageInterface

```ts
storage.getInternal().toBeInstanceOf(InMemoryStorage);
```

# Example

## Add an item into the storage with the key=key1y

```ts
storage.setItem('key1', { lat: 3.784943, long: 1.76284 });

storage.getItem('key1');
```

## Hash the key=key1 before adding it to the internal storage

```ts
storage.setItem('key1', { lat: 3.784943, long: 1.76284 });

storage.getInternal().key(0);
```

## Return the size of the storage and expect the size to equals 1

```ts
storage.setItem('key1', { lat: 3.784943, long: 1.76284 });
storage.setItem('key2', { lat: 3.9838, long: 1.00724 });

storage.size();
```
