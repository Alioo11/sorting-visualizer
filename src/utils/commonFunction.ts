import { store } from "../redux";

export function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const isActiveAnimation = () => {
  const { animationSpeed, barsCount, colapsePivot, animationSpeedPivot } = store.getState();
  return animationSpeed > animationSpeedPivot && barsCount < colapsePivot;
};

export const incrementingArray = (count: number) => {
  const step = 100 / count;
  return Array.from(Array(count).keys(), (e) => e * step + 1);
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
