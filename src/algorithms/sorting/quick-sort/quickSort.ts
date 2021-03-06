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
  compareBars,
} from "../../../DOMFunctions/manipulate";

enum quiksortActionTypes {
  paint = "paint",
  compare = "compare",
  swap = "swap",
}

const swap = (arr: number[], i: number, j: number) => {
  if (i == arr.length || j == arr.length) return;
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const pivot = (arr: number[], start: number = 0, end: number = arr.length + 1, animationData: any[]) => {
  let pivot = arr[start],
    pointer = start;
  arr.length < DETAIL_PIVOT && animationData.push({ type: quiksortActionTypes.paint, data: [start, start, barColors.green] });
  for (let i = start; i < end; i++) {
    //!(i == arr.length || pointer == arr.length || i === pointer) && animationData.push({ type: quiksortActionTypes.compare, data: [pointer, i] });
    if (arr[i] < pivot) {
      pointer++;
      swap(arr, pointer, i);
      !(i == arr.length || pointer == arr.length || i === pointer) && animationData.push({ type: quiksortActionTypes.compare, data: [pointer, i] });
      !(i == arr.length || pointer == arr.length || i === pointer) && animationData.push({ type: quiksortActionTypes.swap, data: [pointer, i] });
    }
  }
  arr.length < DETAIL_PIVOT &&
    !(start == arr.length || pointer == arr.length) &&
    animationData.push({ type: quiksortActionTypes.paint, data: [start, start, barColors.blue] });
  arr.length < DETAIL_PIVOT &&
    !(start == arr.length || pointer == arr.length) &&
    animationData.push({ type: quiksortActionTypes.paint, data: [pointer, pointer, barColors.green] });
  swap(arr, start, pointer);
  !(start == arr.length || pointer == arr.length || start === pointer) &&
    animationData.push({ type: quiksortActionTypes.swap, data: [start, pointer] });
  return pointer;
};

export const quickSort = (arr: number[], start: number = 0, end: number = arr.length, animationData: any[] = []) => {
  let pivotIndex = pivot(arr, start, end, animationData);
  if (start >= end) return { arr, animationData };
  quickSort(arr, start, pivotIndex, animationData);
  quickSort(arr, pivotIndex + 1, end, animationData);
  return { arr, animationData };
};

export const quickSortRUNNER = (inputArr: number[]) => {
  const { arr, animationData } = quickSort(inputArr);
  const formatedData = animationData.map((animationItem: any) => {
    if (animationItem.type === quiksortActionTypes.swap) {
      return new instruction(swapBarAnimationAsync, swapBars, animationItem.data, animationItem.data);
    } else if (animationItem.type === quiksortActionTypes.compare) {
      return new instruction(compareBars, null, animationItem.data, animationItem.data);
    } else {
      return new instruction(
        null,
        changeBarsColorHELPER,
        [animationItem.data[0], animationItem.data[1], 0, animationItem.data[2]],
        [animationItem.data[0], animationItem.data[1], 0, animationItem.data[2]]
      );
    }
  });
  return formatedData;
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
