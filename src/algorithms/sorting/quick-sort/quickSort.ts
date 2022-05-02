import { DETAIL_PIVOT } from "../../../utils/types";
import { instruction } from "../../../utils/types";
import { barColors } from "../../../utils/types";
import { wait } from "../../../utils/commonFunction";
import {
  stretch,
  stretchAnimation,
  changeBarsColorHELPER,
  raiseAnimation,
  raise,
  moveBarAndFloor,
  moveBarAndFloorAnimation,
  putArryAtElement,
  PutBar,
  swapBars,
  swapBarAnimationAsync,
} from "../../../DOMFunctions/manipulate";

enum quiksortActionTypes {
  paint = "paint",
  compare = "compare",
  swap = "swap",
}

const swap = (arr: number[], i: number, j: number) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const pivot = (arr: number[], start: number = 0, end: number = arr.length + 1) => {
  let pivot = arr[start],
    pointer = start;

  for (let i = start; i < arr.length; i++) {
    if (arr[i] < pivot) {
      pointer++;
      swap(arr, pointer, i);
    }
  }
  swap(arr, start, pointer);

  return pointer;
};

export const quickSort = (arr: number[], start: number = 0, end: number = arr.length) => {
  let pivotIndex = pivot(arr, start, end);

  if (start >= end) return arr;
  quickSort(arr, start, pivotIndex);
  quickSort(arr, pivotIndex + 1, end);

  return arr.slice(0, arr.length - 1);
};

export const quickSortRUNNER = (inputArr: number[]) => {
  //const { arr, animationData } = quickSort(inputArr);
  // const formatedData = animationData.map((animationItem: any) => {
  //   //if (animationItem.type === quiksortActionTypes.swap) {
  //   return new instruction(swapBarAnimationAsync, swap, animationItem.data, animationItem.data);
  //   //}
  // });
  //console.log(arr);
  //return formatedData;
};

// const partition = (arr: number[], low: number, high: number, animationData: any[]) => {
//   const pivot = arr[high];
//   //animationData.push({ type: quiksortActionTypes.paint, data: [high] });
//   let i = low - 1;
//   for (let j = low; j <= high - 1; j++) {
//     if (arr[j] < pivot) {
//       console.log("1");
//       swap(arr, i, j);
//       i++;
//       animationData.push({ type: quiksortActionTypes.swap, data: [i, j] });
//     }
//   }
//   console.log("2");
//   swap(arr, i + 1, high);
//   return i + 1;
// };

// export const quickSort = (arr: number[], low: number = 0, high: number = arr.length - 1, animationData: any[] = []) => {
//   if (low < high) {
//     let PI = partition(arr, low, high, animationData);
//     quickSort(arr, low, PI - 1, animationData);
//     quickSort(arr, PI + 1, high, animationData);
//   }
//   return { arr, animationData };
// };
