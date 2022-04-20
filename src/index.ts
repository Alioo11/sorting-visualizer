import { store } from "./redux/index";
import { changeSpeed, toggleCompareMode, changeBarsCount } from "./redux";
import { incrementingArray, wait } from "./utils/commonFunction";
import "./asset/styles/index.css";
import { createBars } from "./DOMFunctions/createBars";
import { swapBars, MoveBarAsyncTemp, initBoards, fillBoard, putArryAtElement } from "./DOMFunctions/manipulate";
import { randomizeArray } from "./algorithms/randomize/randomize";
import { board_1_Elements, board_2_Elements } from "./DOMFunctions/manipulate";
import { boardType } from "./utils/types";
import { mergeFF, mergeSW } from "./algorithms/sorting/merge-sort/mergeSort";

//% selecting DOM elements
const algoSpeed = document.querySelector("#algo-speed");

const barsContainer_1 = document.querySelector("#bars-container-1");
const barsContainer_2 = document.querySelector("#bars-container-2");

const btn_1 = document.querySelector("#test-btn-1");
const btn_2 = document.querySelector("#test-btn-2");
const btn_3 = document.querySelector("#test-btn-3");
const btn_4 = document.querySelector("#test-btn-4");
//% selecting DOM elements

algoSpeed?.addEventListener("input", (e: any) => {
  store.dispatch(changeBarsCount(e.target.value));
});

const testCase = [3, 103, 121, 140, 19, 73, 251];

console.log(mergeFF(testCase, 2, 4, 5));

btn_3?.addEventListener("click", () => {
  store.dispatch(toggleCompareMode());
});

initBoards();

store.subscribe(() => {
  const compareMode = store.getState().compareMode;
  if (!compareMode) {
    barsContainer_2?.classList.add("hide");
  } else {
    barsContainer_2?.classList.remove("hide");
    fillBoard(barsContainer_2, boardType.second);
  }
});

store.subscribe(() => {
  const { compareMode, barsCount } = store.getState();
  const incrementingArr = incrementingArray(barsCount);
  putArryAtElement(incrementingArr, boardType.main);
  compareMode && putArryAtElement(incrementingArr, boardType.second);
});

btn_1?.addEventListener("click", async () => {
  await Promise.all([
    MoveBarAsyncTemp(11, -5),
    MoveBarAsyncTemp(6, 5),
    MoveBarAsyncTemp(11, -5, boardType.second),
    MoveBarAsyncTemp(6, 5, boardType.second),
  ]);
  //await Promise.all([MoveBarAsyncTemp(11, -5, boardType.second), MoveBarAsyncTemp(6, 5, boardType.second)]);
  swapBars(11, 6);
  swapBars(11, 6, boardType.second);
  //swapBars(11, 6, boardType.second);
  //console.log(board_1_Elements);
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
        await Promise.all([
          MoveBarAsyncTemp(res[i][0], -1 * diff),
          MoveBarAsyncTemp(res[i][1], diff),
          MoveBarAsyncTemp(res[i][0], -1 * diff, boardType.second),
          MoveBarAsyncTemp(res[i][1], diff, boardType.second),
        ]);
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
