
# Package documentation

This library provide an utility function that create a  web storage API [https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API] compatible instance that hashes it keys before writing it data into storage.


## Usage

To create an instance of the secure web storage instance simply call:

```ts
import { createStorage } from '@azlabjs/secure-web-storage';

// This create a storage instance which hashes value written to disk using `MyPassword` secret key
const storage = createStorage(window.sessionStorage, 'MyPassword');

// Set the value at the node matching `key1` string
storage.setItem('key1', {
 // ... Object defintion
});

// Get an element to the storage
const value: Object = storage.getItem('key1');

// Delete an item from the cache
storage.removeItem('key1');

// Remove all item from the storage bucket
storage.clear();
```

- Prefixing key

To avoid collision when of keys in the storage object, the factory function supports a prefix string that can be added to each key being written to disk. To provide a string value:

```ts
import { createStorage } from '@azlabjs/secure-web-storage';

// This create a storage instance which hashes value written to disk using `MyPassword` secret key
const storage = createStorage(window.sessionStorage, 'MyPassword', 'WebApp');
```