import { mergeSort, merge } from "./mergeSort";
import { getRandomArbitrary } from "../../../utils/commonFunction";

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

  testCases.forEach((item) => {
    expect(merge(item.input[0], item.input[1])).toEqual(item.extected);
  });

  const RandomArray = (length: number) => {
    return Array.from(Array.from(Array(length).keys()), (e) => getRandomArbitrary(0, 500));
  };

  const sortTestCaseCount = 10;
  const sortTestCases = Array.from(Array(sortTestCaseCount).keys(), (e) => RandomArray(50));

  sortTestCases.forEach((item) => {
    test(`testing ${item.slice(0, 30)},...`, () => {
      expect(mergeSort([...item])).toEqual(item.sort((a, b) => a - b));
    });
  });
});
