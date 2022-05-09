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
  putWithIndex,
} from "../../../DOMFunctions/manipulate";

const reformat = (arrLength: number, item: number) => parseFloat((item * (100 / arrLength) + 1).toFixed(5));

type matrix = Array<Array<number>>;
enum radixSortActionTypes {
  putBarAtIndex,
}

interface animationType {
  type: radixSortActionTypes;
  data: number[];
}

function getDigit(num: number, place: number) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function digitCount(num: number) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums: number[]) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

export function radixSort(arrOfNums: any[], animationData: animationType[] = []) {
  let maxDigitCount = mostDigits(arrOfNums);
  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets: matrix = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < arrOfNums.length; i++) {
      //console.log(k, digitBuckets);
      let digit = getDigit(arrOfNums[i], k);
      //console.table(digitBuckets);
      digitBuckets[digit].push(arrOfNums[i]);

      //% put what we have have at Index of (i) at (digit + difitBuckets.length)
    }
    // New order after each loop
    let mtx: matrix = [];
    const flattenDigitBuckt = digitBuckets.flat();
    console.log(flattenDigitBuckt);
    flattenDigitBuckt.forEach((digiBuckt, index) => {
      animationData.push({ type: radixSortActionTypes.putBarAtIndex, data: [index, reformat(arrOfNums.length, digiBuckt)] });
    });
    arrOfNums = mtx.concat(...digitBuckets);
  }
  return { arrOfNums, animationData };
}

export const radixSortRUNNER = (inputArr: number[]) => {
  const Factor = 100 / inputArr.length;
  const transformedArray = inputArr.map((item: number): number => Math.round(item / Factor));
  const { arrOfNums, animationData } = radixSort(transformedArray);
  const formatedData = animationData.map((item) => {
    return new instruction(wait, PutBar, item.data, item.data);
  });
  return formatedData;
};
