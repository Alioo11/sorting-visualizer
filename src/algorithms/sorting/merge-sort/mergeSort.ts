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

export const mergeSortTemp = (arr: number[], startIndex: number = 0, endIndex: number = arr.length): number[] => {
  const middle = Math.floor(arr.length / 2);
  if (arr.length < 2) return arr;
  console.log(arr, startIndex, endIndex);
  const left = mergeSortTemp(arr.slice(startIndex, middle), startIndex, middle);
  const right = mergeSortTemp(arr.slice(middle, arr.length), middle, arr.length);
  return mergeTemp(startIndex, endIndex + 1, arr);
};

export const mergeWW = (arr: number[]) => {
  const mergeIteration = (startIndex: number = 0, endIndex: number = arr.length) => {
    console.log(startIndex, endIndex);
    const middle = Math.floor(startIndex + endIndex / 2);
    if (Math.abs(startIndex - endIndex) < 2) return;
    const left = mergeIteration(startIndex, middle);
    const right = mergeIteration(middle, endIndex);
  };
  mergeIteration();
};

export const MergeSortCLRS = (arr: number[]) => {
  const mergeTemp = (startIndex: number, middle: number, endIndex: number) => {
    console.log(arr);

    const n1 = middle - startIndex + 1;
    const n2 = endIndex - middle;
    console.log("from", startIndex, "to", n1);
    console.log("from", middle, "to", n2);
  };

  const iteration = (startIndex: number, endIndex: number) => {
    if (startIndex < endIndex) {
      const middle = Math.floor((startIndex + endIndex) / 2);
      iteration(startIndex, middle);
      iteration(middle + 1, endIndex);
      mergeTemp(startIndex, middle, endIndex);
    }
  };
  iteration(0, arr.length);
};

export const mergeTemp = (startIndex: number, endIndex: number, arr: number[]) => {
  const swap = (idx1: number, idx2: number) => {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  };

  let i = startIndex;
  let j = Math.floor((startIndex + endIndex) / 2) + 1;

  do {
    if (i == j) {
      j += 1;
    } else if (arr[i] >= arr[j]) {
      swap(i, j);
      if (arr[i] >= arr[j + 1]) {
        j += 1;
      } else {
        i += 1;
      }
    } else if (arr[i] < arr[j]) {
      j += 1;
    }
    console.log("stuck at loop");
  } while (i !== endIndex + 1 && j !== endIndex + 1);
  return [...arr];
};
