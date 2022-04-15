export function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const incrementingArray = (count: Number, factore: number = 10) => {
  return Array.from(Array(count).keys(), (e) => e * factore);
};

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
