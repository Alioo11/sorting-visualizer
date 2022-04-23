import { swapBars, compareBars, swapBarAnimationAsync } from "../../../DOMFunctions/manipulate";
import { instruction } from "../../../utils/types";

function insertionSort(arr: number[]) {
  let N = arr.length;
  let i, j, key;
  let animationData = [];
  for (i = 1; i < N; i++) {
    j = i;

    // Insert V[i] into list 0..i-1
    while (j > 0 && arr[j] < arr[j - 1]) {
      // Swap V[j] and V[j-1]
      animationData.push([j, j - 1]);
      let temp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;
      // Decrement j by 1
      j -= 1;
    }
  }
  return { animationData, arr };
}

export const insertionSortRUNNER = (inputArr: number[]) => {
  const { animationData } = insertionSort(inputArr);
  const formatedData = animationData.map((animationItem) => {
    return new instruction(swapBarAnimationAsync, swapBars, animationItem, animationItem, 1);
  });
  return formatedData;
};
