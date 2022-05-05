import { getRandomArbitrary } from "../../../utils/commonFunction";
//import { quickSort } from "./quickSort";
import { radixSort } from "./radixSort";

describe("testing insertion sort", () => {
  const RandomArray = (length: number) => {
    return Array.from(Array.from(Array(length).keys()), (e) => getRandomArbitrary(0, 500));
  };

  const sortTestCaseCount = 30;
  const sortTestCases = Array.from(Array(sortTestCaseCount).keys(), (e) => RandomArray(50));

  sortTestCases.forEach((item) => {
    test(`testing radix sort ${item.slice(0, 5)},...`, () => {
      expect(radixSort([...item])).toEqual(item.sort((a, b) => a - b));
    });
  });
});
