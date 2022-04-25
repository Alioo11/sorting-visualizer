import { swapBars, compareBars, swapBarAnimationAsync } from "../../../DOMFunctions/manipulate";
import { instruction, DETAIL_PIVOT } from "../../../utils/types";

const BUBBLE_SORT_DETAIL_PIVOT = DETAIL_PIVOT;

enum actionTypes {
  compare,
  swap,
}

const bubbleSort = (inputArr: number[]) => {
  let len = inputArr.length;
  let animationData = [];
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      let instructionRow = [];
      if (len < BUBBLE_SORT_DETAIL_PIVOT) instructionRow.push({ action: actionTypes.compare, data: [j, j + 1] });
      if (inputArr[j] > inputArr[j + 1]) {
        instructionRow.push({ action: actionTypes.swap, data: [j, j + 1] });
        let tmp = inputArr[j];
        inputArr[j] = inputArr[j + 1];
        inputArr[j + 1] = tmp;
      }
      instructionRow.length > 0 && animationData.push(instructionRow);
    }
  }
  return { inputArr, animationData };
};

export const bubbleSortRUNNER = (inputArr: number[]) => {
  const { animationData } = bubbleSort(inputArr);
  const formatedData = animationData.map((animationItem) => {
    const animatioLength = animationItem.length;
    return animationItem.map((instructionItem) => {
      const animationFuncRef = instructionItem.action === actionTypes.compare ? compareBars : swapBarAnimationAsync;
      const mainFuncRef = instructionItem.action === actionTypes.compare ? null : swapBars;
      return new instruction(animationFuncRef, mainFuncRef, instructionItem.data, instructionItem.data, 1 / animatioLength);
    });
  });
  return formatedData.flat();
  // console.log(formatedData.flat());
};

export { bubbleSort };
