import { changeFirstAlgorithm, changeSecondAlgorithm, store } from "./redux/index";
import { changeSpeed, toggleCompareMode, changeBarsCount, toggleAlgorithmDoc } from "./redux";
import { incrementingArray, wait } from "./utils/commonFunction";
import { createBars } from "./DOMFunctions/createBars";
import { initBoards, fillBoard, putArryAtElement } from "./DOMFunctions/manipulate";
import { randomizeArray, randomizeArrayRUNNER } from "./algorithms/randomize/randomize";
import { board_1_Elements } from "./DOMFunctions/manipulate";
import { boardType, algorithmTypes, instruction } from "./utils/types";
import { bubbleSortRUNNER } from "./algorithms/sorting/bubbleSort.ts/bubbleSort";
import { isActiveAnimation } from "./utils/commonFunction";
import { runner } from "./utils/commonFunction";

import { engine } from "./utils/engine";
import { mergeSortRUNNER, mergeSortTemp } from "./algorithms/sorting/merge-sort/mergeSort";

import { insertionSortRUNNER } from "./algorithms/sorting/insertion-sort/insertionSort";
import { quickSortRUNNER } from "./algorithms/sorting/quick-sort/quickSort";

//% importing style assets

import "./asset/styles/index.css";

//% selecting DOM elements
const algoSpeed = document.querySelector("#algo-speed");
const barCount = document.querySelector("#bar-count");
const randomizeBtn = document.querySelector("#randomize");
const startBtn = document.querySelector("#start");
const compareModeBtn = document.querySelector("#compareMode");

const barsCountSpan = document.querySelector("#bars-count-span");

const algo_1_items = document.querySelectorAll(".algo_1_type");
const algo_2_items = document.querySelectorAll(".algo_2_type");

const dropDownAlgoBtn_1 = document.querySelector("#dropDownAlgorithm1");
const dropDownAlgoBtn_2 = document.querySelector("#dropDownAlgorithm2");

const barsContainer_1 = document.querySelector("#bars-container-1");
const barsContainer_2 = document.querySelector("#bars-container-2");

const boardsContainer = document.querySelector(".boards-container ");
const docBoxes = document.querySelectorAll(".detail");

const detailBox_1 = document.querySelector("#bar-container-id-1");
const detailBox_2 = document.querySelector("#bar-container-id-2");

const btn_1 = document.querySelector("#test-btn-1");
const btn_2 = document.querySelector("#test-btn-2");
const btn_3 = document.querySelector("#test-btn-3");
const btn_4 = document.querySelector("#test-btn-4");

//% initializing events

algo_1_items.forEach((algoItem) => {
  algoItem.addEventListener("click", (e: any) => {
    const algoName = e.target.id as string;
    switch (algoName) {
      case "bubble-sort": {
        store.dispatch(changeFirstAlgorithm(algorithmTypes.bubble_sort));
        break;
      }
      case "insertion-sort": {
        store.dispatch(changeFirstAlgorithm(algorithmTypes.insertion_sort));
        break;
      }
      case "merge-sort": {
        console.log("first one ");
        store.dispatch(changeFirstAlgorithm(algorithmTypes.merge_sort));
        break;
      }
    }
  });
});

algo_2_items.forEach((algoItem) => {
  algoItem.addEventListener("click", (e: any) => {
    const algoName = e.target.id as string;
    switch (algoName) {
      case "bubble-sort": {
        store.dispatch(changeSecondAlgorithm(algorithmTypes.bubble_sort));
        break;
      }
      case "insertion-sort": {
        store.dispatch(changeSecondAlgorithm(algorithmTypes.insertion_sort));
        break;
      }
      case "merge-sort": {
        console.log("second one ");
        store.dispatch(changeSecondAlgorithm(algorithmTypes.merge_sort));
        break;
      }
    }
  });
});

randomizeBtn?.addEventListener("click", () => {
  if (board_1_Elements) {
    const isCompareMode = store.getState().compareMode;
    const barsHeights = Array.from(board_1_Elements.keys());
    const res = randomizeArrayRUNNER(barsHeights);
    isCompareMode ? engine(res, res) : engine(res);
  }
});

startBtn?.addEventListener("click", () => {
  if (board_1_Elements) {
    const { compareMode, firstAlgorithm, secondAlgirithm } = store.getState();
    const barsHeights = Array.from(board_1_Elements, (e) => parseFloat(e.style.height));
    if (compareMode) {
      const instructionList_1 = runner(firstAlgorithm)([...barsHeights]);
      const instructionList_2 = runner(secondAlgirithm)([...barsHeights]);
      engine(instructionList_1, instructionList_2);
    } else {
      const instructionList_1 = runner(firstAlgorithm)([...barsHeights]);
      engine(instructionList_1);
    }
  }
});

btn_1?.addEventListener("click", () => {
  if (board_1_Elements) {
    const isCompareMode = store.getState().compareMode;
    const barsHeights = Array.from(board_1_Elements, (e) => parseFloat(e.style.height));
    const res2 = insertionSortRUNNER([...barsHeights]);

    const res = bubbleSortRUNNER([...barsHeights]);
    console.log(res);
    isCompareMode ? engine(res, res2) : engine(res);
  }
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
  if (board_1_Elements) {
    const { compareMode, barsCount } = store.getState();
    if (!compareMode) {
      barsContainer_2?.classList.add("hide");
      //detailBox_2?.classList.add("hide");
    } else {
      barsContainer_2?.classList.remove("hide");
      //detailBox_2?.classList.remove("hide");
      const barsHeights = Array.from(board_1_Elements, (e) => parseFloat(e.style.height));
      barCountPreveState2 !== barsCount && putArryAtElement(barsHeights, boardType.second);
      //barCountPreveState2 !== barsCount && fillBoard(barsContainer_2, boardType.second);
      compareMode && (barCountPreveState2 = barsCount);
    }
  }
});

store.subscribe(() => {
  const { compareMode, barsCount } = store.getState();
  if (barCountPrevState !== barsCount) {
    barsCountSpan && (barsCountSpan.innerHTML = `${barsCount}`);
    barCountPrevState = barsCount;
    const incrementingArr = incrementingArray(barsCount);
    putArryAtElement(incrementingArr, boardType.main);
    compareMode && putArryAtElement(incrementingArr, boardType.second);
  }
});

btn_2?.addEventListener("click", () => {
  store.dispatch(toggleAlgorithmDoc());
});

btn_3?.addEventListener("click", () => {
  if (board_1_Elements) {
    const barsHeights = Array.from(board_1_Elements, (e) => parseFloat(e.style.height));
    const instructions = quickSortRUNNER(barsHeights);
    engine(instructions);
  }
});

// let lastAlgorithmDoc = false;
// store.subscribe(() => {
//   const { algorithmsDoc } = store.getState();
//   if (lastAlgorithmDoc !== algorithmsDoc) {
//     docBoxes.forEach((docItem) => {
//       docItem.classList.toggle("hide");
//     });
//     boardsContainer?.classList.toggle("boards-container--open-doc");
//     lastAlgorithmDoc = algorithmsDoc;
//   }
// });

//
//
//

// btn_2?.addEventListener("click", async () => {
//   if (board_1_Elements && board_2_Elements) {
//     const barsHeights = Array.from(board_1_Elements.keys());
//     const res = randomizeArray(barsHeights);
//     for (let i = 0; i < res.length; i++) {
//       const diff = res[i][0] - res[i][1];
//       board_1_Elements[res[i][0]].classList.add("selected");
//       board_1_Elements[res[i][1]].classList.add("selected");
//       board_2_Elements[res[i][0]].classList.add("selected");
//       board_2_Elements[res[i][1]].classList.add("selected");
//       //await wait(50);
//       if (store.getState().animationSpeed > 200) {
//         await Promise.all([swapBarAnimationAsync(res[i][0], res[i][1]), swapBarAnimationAsync(res[i][0], res[i][1], boardType.second)]);
//       } else {
//         await wait(store.getState().animationSpeed);
//       }
//       board_1_Elements[res[i][0]].classList.remove("selected");
//       board_1_Elements[res[i][1]].classList.remove("selected");
//       board_2_Elements[res[i][0]].classList.remove("selected");
//       board_2_Elements[res[i][1]].classList.remove("selected");

//       swapBars(res[i][0], res[i][1]);
//       swapBars(res[i][0], res[i][1], boardType.second);
//     }
//   }
// });

// btn_4?.addEventListener("click", async () => {
//   if (board_1_Elements) {
//     const barsHeights = Array.from(board_1_Elements, (e) => parseFloat(e.style.height));
//     const bubbleSortInstructions = bubbleSortRUNNER(barsHeights);
//     const animationSpeed = store.getState().animationSpeed;
//     for (let i = 0; i < bubbleSortInstructions.length; i++) {
//       const { animationArgs, fraction, animationFunc, mainArgs, mainFunc } = bubbleSortInstructions[i];
//       animationSpeed > 200 ? await animationFunc(...animationArgs) : await wait(animationSpeed);
//       mainFunc && (await mainFunc(...mainArgs));
//     }
//   }
// });

// btn_4?.addEventListener("click", async () => {
//   await raiseAnimation([8, 9]);
//   raise([8, 9]);
//   await moveBarAndFloorAnimation(8, 1);
//   moveBarAndFloor(8, 1);
//   await moveBarAndFloorAnimation(9, -1);
//   moveBarAndFloor(9, -1);
// });

// btn_2?.addEventListener("click", async () => {
//   if (board_1_Elements) {
//     const { compareMode, firstAlgorithm, secondAlgirithm } = store.getState();
//     const barsHeights = Array.from(board_1_Elements, (e) => parseFloat(e.style.height));
//     const instructions = mergeSortRUNNER(barsHeights);
//     console.log(instructions);
//     engine(instructions);
//   }
// });
