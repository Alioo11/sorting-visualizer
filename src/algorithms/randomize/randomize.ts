import { getRandomArbitrary } from "../../utils/commonFunction";

export const randomizeArray = (arr: number[]) => {
  const res: Array<Array<number>> = [];
  const swapNums = (index1: number, index2: number) => {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
  };
  arr.forEach((element) => {
    // swap element with getRandomArbitrary(0,arr.length)
    //swapNums(element, getRandomArbitrary(0, arr.length));
    res.push([element, getRandomArbitrary(element, arr.length)]);
  });
  return res;
};
