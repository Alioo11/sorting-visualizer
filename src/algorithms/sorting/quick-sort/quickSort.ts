const swap = (arr: number[], i: number, j: number) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const partition = (arr: number[], low: number, high: number) => {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return i + 1;
};

export const quickSort = (arr: number[], low: number = 0, high: number = arr.length - 1) => {
  if (low < high) {
    let PI = partition(arr, low, high);
    quickSort(arr, low, PI - 1);
    quickSort(arr, PI + 1, high);
  }
  return arr;
};
