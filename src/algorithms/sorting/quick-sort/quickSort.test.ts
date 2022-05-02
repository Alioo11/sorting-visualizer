import { getRandomArbitrary } from "../../../utils/commonFunction";
import { quickSort } from "./quickSort";

describe("testing insertion sort", () => {
  const RandomArray = (length: number) => {
    return Array.from(Array.from(Array(length).keys()), (e) => getRandomArbitrary(0, 500));
  };

  const sortTestCaseCount = 10;
  const sortTestCases = Array.from(Array(sortTestCaseCount).keys(), (e) => RandomArray(50));

  sortTestCases.forEach((item) => {
    test(`testing insertion sort with ${item.slice(0, 30)},...`, () => {
      expect(quickSort([...item]).arr).toEqual(item.sort((a, b) => a - b));
    });
  });
});
