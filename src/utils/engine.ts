import { boardType, instruction } from "./types";
import { isActiveAnimation } from "./commonFunction";
import { wait } from "./commonFunction";
import { store } from "../redux";
let isRunning = false;

export const engine = async (instructions_1: instruction[], instructions_2: instruction[] = []) => {
  if (isRunning) return;
  isRunning = true;
  const prograpLength = Math.max(instructions_1.length, instructions_2.length);
  const isAnimationAvtive = isActiveAnimation();
  const animationSpeed = store.getState().animationSpeed;
  if (instructions_2 && instructions_2.length !== 0) {
    for (let i = 0; i < prograpLength; i++) {
      const { animationArgs, fraction, animationFunc, mainArgs, mainFunc } = instructions_1[i] || {};
      const { animationArgs: animationArgs2, animationFunc: animationFunc2, mainArgs: mainArgs2, mainFunc: mainFunc2 } = instructions_2[i] || {};
      if (isAnimationAvtive) {
        await Promise.all([animationFunc && animationFunc(...animationArgs), animationFunc2 && animationFunc2(...animationArgs2, boardType.second)]);
      } else {
        await wait(animationSpeed);
      }
      mainFunc && (await mainFunc(...mainArgs));
      mainFunc2 && (await mainFunc2(...mainArgs2, boardType.second));
    }
  } else {
    for (let i = 0; i < prograpLength; i++) {
      const { animationArgs, fraction, animationFunc, mainArgs, mainFunc } = instructions_1[i];
      if (isAnimationAvtive) {
        animationFunc && (await animationFunc(...animationArgs));
      } else {
        await wait(animationSpeed);
      }
      mainFunc && (await mainFunc(...mainArgs));
    }
  }
  isRunning = false;
};
