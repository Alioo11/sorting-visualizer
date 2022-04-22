import { getRandomArbitrary } from "../../utils/commonFunction";

import { instruction } from "../../utils/types";
import { swapBars, compareBars, swapBarAnimationAsync } from "../../DOMFunctions/manipulate";

export const randomizeArray = (arr: number[]) => {
  const res: Array<Array<number>> = [];
  arr.forEach((element) => {
    let randItem = getRandomArbitrary(element, arr.length);
    element !== randItem && res.push([element, randItem]);
  });
  return res;
};

export const randomizeArrayRUNNER = (arr: number[]) => {
  const randArrayRes = randomizeArray(arr);
  const formetedArray = randArrayRes.map((randItem) => {
    return new instruction(swapBarAnimationAsync, swapBars, randItem, randItem);
  });

  return formetedArray;
};
