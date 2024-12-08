export function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function logTick({ name }: { name: string }) {
  const ticker = function* () {
    let i = 0;
    while (true) {
      yield i++;
    }
  };

  const tick_id_generator = ticker();
  console.info(`[${name}][tick ${tick_id_generator.next().value}]`);
  const interval = setInterval(() => {
    console.info(`[${name}][tick ${tick_id_generator.next().value}]`);
  }, 1e3);

  await sleep(6e3);
  clearInterval(interval);

  console.info(`[${name}] end`);
}
