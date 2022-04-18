import { getRandomArbitrary } from "../../utils/commonFunction";
import { randomizeArray } from "./randomize";

describe("algorithms test", () => {
  const straightArray = (length: number) => {
    return Array.from(Array.from(Array(length).keys()));
  };

  const temp = (arr: number[]): number[] => {
    return arr;
  };

  const TestCaseCount = 10;
  const TestCaseArrayLength = 30;
  const sortTestCases = Array.from(Array(TestCaseCount).keys(), (e) => straightArray(TestCaseArrayLength));

  sortTestCases.forEach((item) => {
    test(`testing ${item.slice(0, 30)},...`, () => {
      expect(randomizeArray([...item])).not.toEqual(item);
    });
  });
});
