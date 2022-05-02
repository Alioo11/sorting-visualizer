import { mergeSort } from "./mergeSort";
import { getRandomArbitrary } from "../../../utils/commonFunction";
import { mergeSortTemp } from "./mergeSort";

describe("algorithms test", () => {
  const testCases = [
    { input: [[0], [0]], extected: [0, 0] },
    {
      input: [
        [1, 2],
        [3, 4],
      ],
      extected: [1, 2, 3, 4],
    },
    {
      input: [
        [1, 3],
        [2, 4],
      ],
      extected: [1, 2, 3, 4],
    },
    {
      input: [
        [1, 5, 6, 11],
        [6, 8, 99],
      ],
      extected: [1, 5, 6, 6, 8, 11, 99],
    },
  ];

  // testCases.forEach((item) => {
  //   expect(merge(item.input[0], item.input[1])).toEqual(item.extected);
  // });

  const RandomArray = (length: number) => {
    return Array.from(Array.from(Array(length).keys()), (e) => getRandomArbitrary(0, 500));
  };

  const sortTestCaseCount = 10;
  const sortTestCases = Array.from(Array(sortTestCaseCount).keys(), (e) => RandomArray(5));

  sortTestCases.forEach((item) => {
    test(`testing ${item.slice(0, 30)},...`, () => {
      expect(mergeSortTemp([...item]).arr).toEqual(item.sort((a, b) => a - b));
    });
  });

  // const sortTestCasesMergeSortSW = Array.from(Array(sortTestCaseCount).keys(), (e) => RandomArray(10));

  // sortTestCasesMergeSortSW.forEach((item) => {
  //   test(`testing merge sort swaping ${item.slice(0, 30)},...`, () => {
  //     expect(mergeSortSW([...item])).toEqual(item.sort((a, b) => a - b));
  //   });
  // });

  //% testing merge function here

  const mergeTestCases = [
    { arr: [1, 3, 5, 2, 4, 6], expected: [1, 2, 3, 4, 5, 6] },
    { arr: [3, 103, 121, 140, 19, 73, 251], expected: [3, 19, 73, 103, 121, 140, 251] },
    { arr: [3, 103, 121, 140, 19, 73, 251, 490], expected: [3, 19, 73, 103, 121, 140, 251, 490] },
    { arr: [3, 4], expected: [3, 4] },
    { arr: [4, 3], expected: [3, 4] },
    { arr: [4, 5, 2], expected: [2, 4, 5] },
  ];

  // const generateSortedRandomArray = (length: number, range = 100) => {
  //   return Array.from(Array(length).keys(), (e) => getRandomArbitrary(0, range)).sort((a, b) => a - b);
  // };

  // const generateTest = (testCount = 10) => {
  //   const sum = [];
  //   for (let i = 0; i < testCount; i++) {
  //     const a = generateSortedRandomArray(20);
  //     const b = generateSortedRandomArray(20);
  //     const testObject = {
  //       arr: a.concat(b),
  //       expected: a.concat(b).sort((a, b) => a - b),
  //     };
  //     sum.push(testObject);
  //   }
  //   return sum;
  // };

  // const automatedMergeTestCases = generateTest(100);

  // const spesicalCase = { arr: [130, 3, 121, 140, 19, 73, 251], expected: [130, 3, 121, 140, 19, 73, 251] };

  // test("spesial", () => {
  //   expect(mergeFF(spesicalCase.arr, 0, 1, 1)).toEqual(spesicalCase.expected);
  // });

  // mergeTestCases.forEach((item) => {
  //   test(`testing merge function with ${item.arr}`, () => {
  //     expect(mergeFF(item.arr, 0, Math.ceil(item.arr.length / 2), item.arr.length)).toEqual(item.expected);
  //   });
  // });

  // automatedMergeTestCases.forEach((item) => {
  //   test(`testing merge function with ${item.arr}`, () => {
  //     expect(mergeFF(item.arr, 0, Math.ceil(item.arr.length / 2), item.arr.length)).toEqual(item.expected);
  //   });
  // });

  //% testing merge function here
});
