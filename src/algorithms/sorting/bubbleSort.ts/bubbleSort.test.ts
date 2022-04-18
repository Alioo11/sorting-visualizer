import { getRandomArbitrary } from "../../../utils/commonFunction";
import { bubbleSort } from "./bubbleSort";

describe("algorithms test", () => {
  const RandomArray = (length: number) => {
    return Array.from(Array.from(Array(length).keys()), (e) => getRandomArbitrary(0, 500));
  };

  const sortTestCaseCount = 10;
  const sortTestCases = Array.from(Array(sortTestCaseCount).keys(), (e) => RandomArray(50));

  sortTestCases.forEach((item) => {
    test(`testing ${item.slice(0, 30)},...`, () => {
      expect(bubbleSort([...item])).toEqual(item.sort((a, b) => a - b));
    });
  });
});
