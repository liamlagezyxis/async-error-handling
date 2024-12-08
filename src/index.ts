import { logTick, sleep } from './utils.js';

/**
 * @throws after an asynchronous operation.
 */
const unawaited = async () => {
  console.info(`[${unawaited.name}] start`);
  await sleep(1e3);
  throw new Error(`[${unawaited.name}] error`);
};

/**
 * @throws after an asynchronous operation.
 */
const awaited = async () => {
  console.info(`[${awaited.name}] start`);
  await sleep(1e3);
  throw new Error(`[${awaited.name}] error`);
};

/**
 * IIFE to run the test.
 */
(async function test() {
  try {
    const mode = process.argv.slice(2)?.[0] || null;
    console.info(`[${test.name}][mode: ${mode}] start`);

    /**
     * Register unhandled promise rejection handler so that we can see the error message in the console.
     * Without this handler, the process will still exit with code 1.
     */
    process.on('uncaughtException', (error) => {
      console.error(`[${test.name}][uncaughtException]`, error);
      console.info(
        `[${test.name}] note that the above error NOT caught, subsequent code will NOT run until completion & process will exit`
      );
      process.exit(1);
    });

    switch (mode) {
      case '--unawaited': {
        /**
         * Note that this is an "unawaited" promise, so it will throw an unhandled promise rejection outside of the try-catch scope.
         */
        unawaited();
        break;
      }
      case '--awaited': {
        /**
         * Note that this is an "awaited" promise, so it will throw an error that is handled inside of the try-catch scope.
         */
        await awaited();
        break;
      }
      case '--unawaited-error-handled': {
        /**
         * Note that this is an "unawaited" promise with a `.catch` handler, so it will throw an error that is handled inside of the `.catch` handler.
         */
        unawaited().catch((error: unknown) => {
          console.error(`[${test.name}][unawaited][caught error]`, error);
          console.info(
            `[${test.name}] note that the above error was caught, subsequent code will continue to run`
          );
        });
        break;
      }
      default: {
        throw new Error(
          `[${test.name}] invalid mode: ${mode}. Valid modes are: --unawaited, --awaited, --unawaited-error-handled`
        );
      }
    }
  } catch (error) {
    console.error(`[${test.name}][caught error]`, error);
    console.info(
      `[${test.name}] note that the above error was caught, subsequent code will continue to run`
    );
  }

  /**
   * If the error was handled correctly, the below code will continue to run, the implementation of which is irrelevant to the error handling.
   */
  await logTick({ name: test.name });
})();
