import { swapBars, compareBars, swapBarAnimationAsync } from "../../../DOMFunctions/manipulate";
import { instruction, DETAIL_PIVOT } from "../../../utils/types";

const INSERTION_SORT_DETAIL_PIVOT = DETAIL_PIVOT;

enum actionTypes {
  compare,
  swap,
}

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
export function insertionSortTest(arr: number[]) {
  let N = arr.length;
  let i, j, key;
  let animationData = [];
  for (i = 1; i < N; i++) {
    j = i;
    for (j = i; j > 0; j--) {
      let instructionRow = [];
      if (N < INSERTION_SORT_DETAIL_PIVOT) {
        instructionRow.push({ action: actionTypes.compare, data: [j, j - 1] });
      }
      if (arr[j] >= arr[j - 1]) {
        continue;
      } else {
        instructionRow.push({ action: actionTypes.swap, data: [j, j - 1] });
        let temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
        instructionRow.length > 0 && animationData.push(instructionRow);
      }
    }
  }
  return { animationData, arr };
}

export const insertionSortRUNNER = (inputArr: number[]) => {
  const { animationData } = insertionSortTest(inputArr);
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

// export const insertionSortRUNNER = (inputArr: number[]) => {
//   const { animationData } = insertionSort([...inputArr]);

//   console.log("insertion sort test", insertionSortTest([...inputArr]).animationData.flat());

//   const formatedData = animationData.map((animationItem) => {
//     return new instruction(swapBarAnimationAsync, swapBars, animationItem, animationItem, 1);
//   });
//   return formatedData;
// };
