# asynchronous error handling

## Demonstration of asynchronous error handling in JavaScript

> TL;DR:
>
> - Async operations must be awaited inside a try-catch block to handle errors.
> - If it is not awaited, use `.catch()` to handle errors.
> - If neither is done, this will result in an unhandled promise rejection.

## Run the Test Cases

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [nvm](https://github.com/nvm-sh/nvm) (optional)

### Build

```sh
npm install

npm run build
```

### Run

Run the various test cases from VSCode debugger.

## Behaviour

### Unhandled Promise Rejection

If an async operation is not awaited, and no `.catch()` is used, it will result in an [unhandled promise rejection](https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event).

```ts
async function unhandledPromiseRejection() {
  Promise.reject(new Error('Unhandled Promise Rejection'));
}
```

### Awaited Promise Rejection

If an async operation is awaited, the error can be caught using a [`try-catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) block.

```ts
async function awaitedPromiseRejection() {
  try {
    await Promise.reject(new Error('Awaited Promise Rejection'));
  } catch (error) {
    console.error(error);
  }
}
```

### Catch Promise Rejection

If an async operation is not awaited, but a [`.catch()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) is used, the error can be caught.

```ts
async function catchPromiseRejection() {
  Promise.reject(new Error('Catch Promise Rejection')).catch((error) => {
    console.error(error);
  });
}
```
