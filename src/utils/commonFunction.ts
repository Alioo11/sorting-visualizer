import { store } from "../redux";
import { bubbleSortRUNNER } from "../algorithms/sorting/bubbleSort.ts/bubbleSort";
import { insertionSortRUNNER } from "../algorithms/sorting/insertion-sort/insertionSort";
import { algorithmTypes } from "./types";
import { mergeSortRUNNER } from "../algorithms/sorting/merge-sort/mergeSort";

export function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const isActiveAnimation = () => {
  const { animationSpeed, barsCount, colapsePivot, animationSpeedPivot } = store.getState();
  return animationSpeed > animationSpeedPivot && barsCount < colapsePivot;
};

export const incrementingArray = (count: number) => {
  const step = 100 / count;
  return Array.from(Array(count).keys(), (e) => e * step + 1);
};

export const wait = (delayTime: number | undefined) => {
  return new Promise((res) => {
    setTimeout(
      () => {
        res(null);
      },
      delayTime ? delayTime : 300
    );
  });
};

export const runner = (algo: algorithmTypes): Function => {
  switch (algo) {
    case algorithmTypes.bubble_sort: {
      return bubbleSortRUNNER;
    }
    case algorithmTypes.insertion_sort: {
      return insertionSortRUNNER;
    }
    case algorithmTypes.merge_sort: {
      return mergeSortRUNNER;
    }
  }
};
