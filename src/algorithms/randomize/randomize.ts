import { getRandomArbitrary } from "../../utils/commonFunction";

import { instruction } from "../../utils/types";
import { swapBars, compareBars, swapBarAnimationAsync, putArryAtElement, MoveBarAnimationAsync } from "../../DOMFunctions/manipulate";

interface randomizeData {
  dataItem: number;
  movedBy: number;
}

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

export const randomizeArrayInOneMove = (arr: number[]) => {
  const res: Array<Array<number>> = [];

  const moveData = new Array(arr.length).fill(0);

  arr.forEach((element, index) => {
    let randItem = getRandomArbitrary(index, arr.length);
    if (randItem === index) return;
    if (moveData[index] === 1 || moveData[randItem] === 1) return;
    const diff = randItem - index;
    let temp = arr[index];
    arr[index] = arr[randItem];
    arr[randItem] = temp;
    moveData[index] = 1;
    moveData[randItem] = 1;
    res.push([index, randItem]);
  });
  console.log(res);
  return res;
};

export const randomizeArrayInOneMoveRUNNER = (arr: number[]) => {
  const randArrayRes = randomizeArrayInOneMove(arr);
  const test = randArrayRes.map((item, index) => {
    return () => swapBarAnimationAsync(item[0], item[1]);
  });

  const animationRunner = async () => {
    await Promise.all(test.map((testItem) => testItem()));
  };

  const formetedArray = new instruction(animationRunner, putArryAtElement, [arr], [arr]);
  return [formetedArray];
};
