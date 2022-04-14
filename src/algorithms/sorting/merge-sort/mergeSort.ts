export const mergeSort: (num: number[]) => number[] = (arr: number[]) => {
  const middle = Math.floor(arr.length / 2);
  if (arr.length < 2) return arr;
  const left = mergeSort(arr.slice(0, middle));
  const right = mergeSort(arr.slice(middle, arr.length));
  return merge(left, right);
};

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
