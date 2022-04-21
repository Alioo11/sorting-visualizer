import { swapBars } from "../../../DOMFunctions/manipulate";
import { instruction } from "../../../utils/types";

const BUBBLE_SORT_DETAIL_PIVOT = 50;

enum actionTypes {
  compare,
  swap,
}

const bubbleSort = (inputArr: number[]) => {
  let len = inputArr.length;
  let animationData = [];
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
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
  console.log(animationData);
  const formatedData = animationData.map((animationItem) => {});

  //console.log(data);
};

export { bubbleSort };
