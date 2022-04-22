import { store } from "./redux/index";
import { changeSpeed, toggleCompareMode, changeBarsCount } from "./redux";
import { incrementingArray, wait } from "./utils/commonFunction";
import { createBars } from "./DOMFunctions/createBars";
import {
  swapBars,
  MoveBarAnimationAsync,
  initBoards,
  fillBoard,
  putArryAtElement,
  PutBar,
  ChangeBarsColor,
  swapBarAnimationAsync,
  compareBars,
} from "./DOMFunctions/manipulate";
import { randomizeArray, randomizeArrayRUNNER } from "./algorithms/randomize/randomize";
import { board_1_Elements, board_2_Elements } from "./DOMFunctions/manipulate";
import { boardType, barColors, commandTypes } from "./utils/types";
import { mergeFF, mergeSW } from "./algorithms/sorting/merge-sort/mergeSort";
import { bubbleSortRUNNER } from "./algorithms/sorting/bubbleSort.ts/bubbleSort";
import { isActiveAnimation } from "./utils/commonFunction";

import { engine } from "./utils/engine";

//% importing style assets

import "./asset/styles/index.css";

//% selecting DOM elements
const algoSpeed = document.querySelector("#algo-speed");
const barCount = document.querySelector("#bar-count");
const randomizeBtn = document.querySelector("#randomize");
const startBtn = document.querySelector("#start");
const compareModeBtn = document.querySelector("#compareMode");

const dropDownAlgoBtn_1 = document.querySelector("#dropDownAlgorithm1");
const dropDownAlgoBtn_2 = document.querySelector("#dropDownAlgorithm2");

const barsContainer_1 = document.querySelector("#bars-container-1");
const barsContainer_2 = document.querySelector("#bars-container-2");

const btn_1 = document.querySelector("#test-btn-1");
const btn_2 = document.querySelector("#test-btn-2");
const btn_3 = document.querySelector("#test-btn-3");
const btn_4 = document.querySelector("#test-btn-4");

//% initializing events

btn_3?.addEventListener("click", () => {
  if (board_1_Elements) {
    const isCompareMode = store.getState().compareMode;
    const barsHeights = Array.from(board_1_Elements.keys());
    const res = randomizeArrayRUNNER(barsHeights);
    isCompareMode ? engine(res, res) : engine(res);
  }
});

btn_1?.addEventListener("click", () => {
  if (board_1_Elements) {
    const isCompareMode = store.getState().compareMode;
    const barsHeights = Array.from(board_1_Elements, (e) => parseFloat(e.style.height));
    const res = bubbleSortRUNNER(barsHeights);
    isCompareMode ? engine(res, res) : engine(res);
  }
});

algoSpeed?.addEventListener("input", (e: any) => {
  store.dispatch(changeSpeed(e.target.max - e.target.value));
});

barCount?.addEventListener("input", (e: any) => {
  store.dispatch(changeBarsCount(e.target.value));
});

compareModeBtn?.addEventListener("click", () => {
  store.dispatch(toggleCompareMode());
  const compareMode = store.getState().compareMode;
  if (compareMode) {
    dropDownAlgoBtn_2?.removeAttribute("disabled");
  } else {
    dropDownAlgoBtn_2?.setAttribute("disabled", "true");
  }
});

initBoards();
let barCountPrevState: number;
let barCountPreveState2: number;
store.subscribe(() => {
  const { compareMode, barsCount } = store.getState();
  barCountPreveState2 = barsCount;
  if (!compareMode) {
    barsContainer_2?.classList.add("hide");
  } else {
    barsContainer_2?.classList.remove("hide");
    barCountPreveState2 !== barsCount && fillBoard(barsContainer_2, boardType.second);
  }
});

store.subscribe(() => {
  const { compareMode, barsCount } = store.getState();
  if (barCountPrevState !== barsCount) {
    barCountPrevState = barsCount;
    const incrementingArr = incrementingArray(barsCount);
    putArryAtElement(incrementingArr, boardType.main);
    compareMode && putArryAtElement(incrementingArr, boardType.second);
  }
});

btn_2?.addEventListener("click", async () => {
  if (board_1_Elements && board_2_Elements) {
    const barsHeights = Array.from(board_1_Elements.keys());
    const res = randomizeArray(barsHeights);
    for (let i = 0; i < res.length; i++) {
      const diff = res[i][0] - res[i][1];
      board_1_Elements[res[i][0]].classList.add("selected");
      board_1_Elements[res[i][1]].classList.add("selected");
      board_2_Elements[res[i][0]].classList.add("selected");
      board_2_Elements[res[i][1]].classList.add("selected");
      //await wait(50);
      if (store.getState().animationSpeed > 200) {
        await Promise.all([swapBarAnimationAsync(res[i][0], res[i][1]), swapBarAnimationAsync(res[i][0], res[i][1], boardType.second)]);
      } else {
        await wait(store.getState().animationSpeed);
      }
      board_1_Elements[res[i][0]].classList.remove("selected");
      board_1_Elements[res[i][1]].classList.remove("selected");
      board_2_Elements[res[i][0]].classList.remove("selected");
      board_2_Elements[res[i][1]].classList.remove("selected");

      swapBars(res[i][0], res[i][1]);
      swapBars(res[i][0], res[i][1], boardType.second);
    }
  }
});

btn_4?.addEventListener("click", async () => {
  if (board_1_Elements) {
    const barsHeights = Array.from(board_1_Elements, (e) => parseFloat(e.style.height));
    const bubbleSortInstructions = bubbleSortRUNNER(barsHeights);
    const animationSpeed = store.getState().animationSpeed;
    for (let i = 0; i < bubbleSortInstructions.length; i++) {
      const { animationArgs, fraction, animationFunc, mainArgs, mainFunc } = bubbleSortInstructions[i];
      animationSpeed > 200 ? await animationFunc(...animationArgs) : await wait(animationSpeed);
      mainFunc && (await mainFunc(...mainArgs));
    }
  }
});

// btn_4?.addEventListener("click", () => {
//   PutBar(50, 50);
//   ChangeBarsColor([1, 2, 3, 4, 5, 6, 7, 8, 9], barColors.red, boardType.main);
// });
