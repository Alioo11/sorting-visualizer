export function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const wait = (delayTime: number | undefined) => {
  return new Promise((res) => {
    setTimeout(
      () => {
        res(null);
      },
      delayTime ? delayTime : 300
    );
  });
};
