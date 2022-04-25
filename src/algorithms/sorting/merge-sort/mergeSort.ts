import { DETAIL_PIVOT } from "../../../utils/types";
import { instruction } from "../../../utils/types";
import { barColors } from "../../../utils/types";
import { stretch, changeBarsColorHELPER, raiseAnimation, raise, moveBarAndFloor, moveBarAndFloorAnimation } from "../../../DOMFunctions/manipulate";

enum mergeActionTypes {
  stretch = "stretch",
  raise = "raise",
  paint = "paint",
  put = "put",
  compare = "compare",
  putArray = "putArray",
}

interface rowInstruct {
  type: mergeActionTypes;
  data: any[];
}

export const merge = (left: number[], right: number[]) => {
  left.push(Infinity);
  right.push(Infinity);
  const result = [];
  const resLength = left.length + right.length;
  let i = 0;
  let j = 0;
  for (let k = 0; k < resLength; k++) {
    if (left[i] >= right[j]) {
      result.push(right[j]);
      j += 1;
    } else {
      result.push(left[i]);
      i += 1;
    }
  }
  return result.slice(0, result.length - 2);
};

export const mergeSort: (num: number[]) => number[] = (arr: number[]) => {
  const middle = Math.floor(arr.length / 2);
  if (arr.length < 2) return arr;
  const left = mergeSort(arr.slice(0, middle));
  const right = mergeSort(arr.slice(middle, arr.length));
  return merge(left, right);
};

const mergeTemp = (arr: number[], start: number, mid: number, end: number, animationData: any[]) => {
  const st = start;
  const md = mid + 1;
  const ed = end + 1;
  const arrSize = arr.length;
  const left = arr.slice(start, mid + 1).concat(Infinity);
  const right = arr.slice(mid + 1, end + 1).concat(Infinity);
  let i = 0;
  let j = 0;
  arrSize < DETAIL_PIVOT && animationData.push({ type: mergeActionTypes.paint, data: [start, end] });
  arrSize < DETAIL_PIVOT && animationData.push({ type: mergeActionTypes.raise, data: [start, end] });
  for (let k = st; k < ed; k++) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      k !== end && animationData.push({ type: mergeActionTypes.put, data: [k, start + i, arr[start + i]] });
      i++;
    } else {
      arr[k] = right[j];
      k !== end && animationData.push({ type: mergeActionTypes.put, data: [k, md + j, arr[md + j]] });
      j += 1;
    }
  }
  // arrSize < DETAIL_PIVOT && animationData.push({ type: mergeActionTypes.paint, data: [start, end] });
  //% replace array with a snapshot of the array at this moment
  arrSize < DETAIL_PIVOT &&
    animationData.push({ type: mergeActionTypes.putArray, data: arr[arr.length - 1] == Infinity ? [...arr.slice(0, arr.length - 1)] : [...arr] });
};

export const mergeSortTemp = (arr: number[], start: number = 0, end: number = arr.length, animationData: rowInstruct[] = []) => {
  if (start < end) {
    const middle = Math.floor((start + end) / 2);
    mergeSortTemp(arr, start, middle, animationData);
    mergeSortTemp(arr, middle + 1, end, animationData);
    mergeTemp(arr, start, middle, end, animationData);
  }
  return { arr: arr.slice(0, arr.length - 1), animationData };
};

export const mergeSortRUNNER = (arr: number[]) => {
  const strechedArr = arr.map((item) => item / 2);
  const { animationData } = mergeSortTemp(strechedArr);
  const formatedData = animationData.map((RowItem) => {
    if (RowItem.type === mergeActionTypes.paint) {
      return new instruction(null, changeBarsColorHELPER, [], [RowItem.data[0], RowItem.data[1], barColors.green]);
    } else if (RowItem.type === mergeActionTypes.raise) {
      const { data } = RowItem;
      const range = Array.from(Array(data[1] - data[0]).keys(), (e) => e + data[0]);
      return new instruction(raiseAnimation, raise, range, range);
    } else if (RowItem.type === mergeActionTypes.put) {
      const { data } = RowItem;
      const diff = data[1] - data[0];
      return new instruction(moveBarAndFloor, moveBarAndFloorAnimation, [data[0], diff], [data[0], diff]);
    } else if (RowItem.type === mergeActionTypes.putArray) {
      //% this is wher you left the project
    }
  });
  return formatedData;
};

// const MergeLT = (array: number[], start: number, mid: number, end: number) => {
//   let L = array.slice(start, mid + 1);
//   let R = array.slice(mid + 1, end + 1);
//   L.push(Infinity);
//   R.push(Infinity);
//   let i = 0;
//   let j = 0;
//   for (let k = start; k <= end; k++) {
//     if (L[i] <= R[j]) {
//       array[k] = L[i];
//       i++;
//     } else {
//       array[k] = R[j];
//       j++;
//     }
//   }
//   if (array[array.length - 1] === Infinity) array.pop();
// };

// export const mergeSW = (arr: number[], startIndex: number, midIndex: number, endIndex: number) => {
//   console.log("started merge with", arr.slice(startIndex, endIndex + 1));
//   const swap = (idx1: number, idx2: number) => {
//     console.log("-------------------------", idx1, idx2);
//     const temp = arr[idx1];
//     arr[idx1] = arr[idx2];
//     arr[idx2] = temp;
//   };

//   let i = startIndex;
//   let j = midIndex;

//   while (i !== endIndex && j !== endIndex) {
//     if (i === j) j++;
//     else if (arr[i] > arr[j]) {
//       swap(j, i);
//       let temp = j;
//       while (arr[temp] >= arr[temp + 1] && arr[temp + 1]) {
//         swap(temp, temp + 1);
//         temp++;
//       }
//       j++;
//     } else if (arr[i] <= arr[j]) i++;
//   }
//   return arr;
//   //  console.log("ended merge with", arr.slice(startIndex, endIndex + 1));
// };

// export const mergeMMM = (arr: number[], start: number, mid: number, end: number) => {
//   console.log(`start merge function`, start, end);

//   const swap = (idx1: number, idx2: number) => {
//     const temp = arr[idx1];
//     arr[idx1] = arr[idx2];
//     arr[idx2] = temp;
//   };

//   let i = start;
//   let j = mid;

//   while (i !== end && j !== end) {
//     if (i === j) j++;
//     else if (arr[i] <= arr[j]) i++;
//     else if (arr[i] > arr[j]) {
//       swap(i, j);
//       let temp = j;
//       while (arr[temp] >= arr[temp + 1] && temp !== end - 1) {
//         swap(temp, temp + 1);
//         temp++;
//       }
//     }
//   }
// };

// export const mergeSortSW = (array: number[], start: number = 0, end: number = array.length) => {
//   if (end > start) {
//     let mid = Math.floor((end + start) / 2);
//     mergeSortSW(array, start, mid);
//     mergeSortSW(array, mid + 1, end);
//     //mergeMMM(array, start, mid, end);
//   }
//   return array;
// };

// export const mergeFF = (arr: number[], start: number, mid: number, end: number) => {
//   console.log(`running merge function`, arr, start, mid, end);
//   //arr.push(Infinity);

//   const swap = (idx1: number, idx2: number) => {
//     //console.log("-------------------------", idx1, idx2);
//     const temp = arr[idx1];
//     arr[idx1] = arr[idx2];
//     arr[idx2] = temp;
//   };

//   let i = start;
//   let j = mid;

//   while (i !== end && j !== end) {
//     console.log("running while loop", arr);
//     console.log(arr[i], arr[j]);
//     console.log(i, j);
//     console.log(` i: ${i} , J: ${j}`);
//     if (i === j) j++;
//     else if (arr[i] <= arr[j]) i++;
//     else if (arr[i] > arr[j]) {
//       swap(i, j);
//       let temp = j;
//       while (arr[temp] >= arr[temp + 1] && temp !== end - 1) {
//         swap(temp, temp + 1);
//         temp++;
//       }
//     }
//   }
//   console.log("ended with", arr);
//   return arr;
//   //console.log(arr);
// };
// export const mergeTemp = (startIndex: number, endIndex: number, arr: number[]) => {
//   const swap = (idx1: number, idx2: number) => {
//     const temp = arr[idx1];
//     arr[idx1] = arr[idx2];
//     arr[idx2] = temp;
//   };

//   let i = startIndex;
//   let j = Math.floor((startIndex + endIndex) / 2) + 1;

//   do {
//     if (i == j) {
//       j += 1;
//     } else if (arr[i] >= arr[j]) {
//       swap(i, j);
//       if (arr[i] >= arr[j + 1]) {
//         j += 1;
//       } else {
//         i += 1;
//       }
//     } else if (arr[i] < arr[j]) {
//       j += 1;
//     }
//     console.log("stuck at loop");
//   } while (i !== endIndex + 1 && j !== endIndex + 1);
//   return [...arr];
// };
