import { mergeSort, merge, mergeTemp } from "./mergeSort";
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

  const mergeTempTestCases = [
    [2, 4, 7, 8, 1, 3, 11],
    [4, 8, 2, 7],
    [3, 9, 11, 2, 5, 9],
    [6, 25, 49, 51, 1, 7, 9, 12],
  ];

  mergeTempTestCases.forEach((item) => {
    expect(mergeTemp(0, item.length - 1, [...item])).toEqual(item.sort((a, b) => a - b));
  });

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
