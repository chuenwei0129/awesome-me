// async function getUser() {
//   const user = await fetch('https://jsonplaceholder.typicode.com/users/1').then((res) => res.json());
//   return user;
// }

// async function m() {
//   const user = await getUser();
//   return user;
// }

// async function main() {
//   const user = await m();
//   console.log('🚀 ~ main ~ user:', user);
// }

// main();

function getUser() {
  return fetch('https://jsonplaceholder.typicode.com/users/1');
}

function main() {
  const user = getUser();
  console.log('🚀 ~ main ~ user:', user);
}

function run(entry) {
  let cache = {
    status: 'pending',
    value: null,
  };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = function (...args) {
    if (cache.status === 'fulfilled') {
      return cache.value;
    } else if (cache.status === 'rejected') {
      throw cache.value;
    }

    const promise = originalFetch(...args)
      .then((res) => res.json())
      .then(
        (res) => {
          cache.status = 'fulfilled';
          cache.value = res;
        },
        (err) => {
          cache.status = 'rejected';
          cache.value = err;
        },
      );

    throw promise;
  };

  try {
    entry();
  } catch (error) {
    if (error && typeof error.then === 'function') {
      error.then(entry, entry).finally(() => {
        globalThis.fetch = originalFetch;
      });
    }
  }
}

run(main);
