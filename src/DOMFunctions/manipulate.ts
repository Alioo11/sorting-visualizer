import { store } from "../redux";
import { incrementingArray } from "../utils/commonFunction";
import { createBars } from "./createBars";
import { boardType } from "../utils/types";
// this file have access to DOM

//% selecting DOM elements

const barsContainer_1 = document.querySelector("#bars-container-1");
const barsContainer_2 = document.querySelector("#bars-container-2");
//% selecting DOM elements

let board_1_Elements: HTMLDivElement[] | null = null;
let board_2_Elements: HTMLDivElement[] | null = null;

export const fillBoard = (containerRef: Element | null, type: boardType) => {
  const numOfBars = store.getState().barsCount;
  const barsCount = incrementingArray(numOfBars);
  if (type === boardType.main) {
    board_1_Elements = createBars(barsCount);
    containerRef?.replaceChildren(...board_1_Elements);
  } else {
    board_2_Elements = createBars(barsCount);
    containerRef?.replaceChildren(...board_2_Elements);
  }
};
export const initBoards = () => {
  const compareMode = store.getState().compareMode;
  fillBoard(barsContainer_1, boardType.main);
  compareMode && fillBoard(barsContainer_2, boardType.second);
  !compareMode && barsContainer_2?.classList.add("hide");
};
export const putArryAtElement = (elements: number[], type: boardType) => {
  const bars = createBars(elements);
  if (type === boardType.main) {
    board_1_Elements = bars;
    barsContainer_1 && barsContainer_1.replaceChildren(...bars);
  } else if (type === boardType.second) {
    board_2_Elements = bars;
    barsContainer_2 && barsContainer_2.replaceChildren(...bars);
  }
};

export const swapBars = (bar1: number, bar2: number, type: boardType = boardType.main) => {
  if (type === boardType.main && board_1_Elements) {
    const bar_1_height = board_1_Elements[bar1].style.height;
    const bar_2_height = board_1_Elements[bar2].style.height;
    board_1_Elements[bar1].style.height = bar_2_height;
    board_1_Elements[bar2].style.height = bar_1_height;
  } else if (type === boardType.second && board_2_Elements) {
    const bar_1_height = board_2_Elements[bar1].style.height;
    const bar_2_height = board_2_Elements[bar2].style.height;
    board_2_Elements[bar1].style.height = bar_2_height;
    board_2_Elements[bar2].style.height = bar_1_height;
  }
};

export const MoveBarAsync = (bar: HTMLDivElement, amount: number) => {
  return new Promise((res) => {
    const animationSpeed = store.getState().animationSpeed;
    const barLength = bar.getBoundingClientRect().width;
    bar.animate([{ transform: "" }, { transform: `translateX(${amount * (barLength + 1)}px)` }], { duration: animationSpeed, easing: "ease-out" });
    setTimeout(() => {
      res(null);
    }, animationSpeed);
  });
};

export const MoveBarAsyncTemp = (barIndex: number, amount: number, type: boardType = boardType.main) => {
  return new Promise((res) => {
    if (type === boardType.main && board_1_Elements) {
      const animationSpeed = store.getState().animationSpeed;
      const barLength = board_1_Elements[barIndex].getBoundingClientRect().width;
      board_1_Elements[barIndex].animate([{ transform: "" }, { transform: `translateX(${amount * (barLength + 1)}px)` }], {
        duration: animationSpeed,
        easing: "ease-out",
      });
      setTimeout(() => {
        res(null);
      }, animationSpeed);
    } else if (type === boardType.second && board_2_Elements) {
      const animationSpeed = store.getState().animationSpeed;
      const barLength = board_2_Elements[barIndex].getBoundingClientRect().width;
      board_2_Elements[barIndex].animate([{ transform: "" }, { transform: `translateX(${amount * (barLength + 1)}px)` }], {
        duration: animationSpeed,
        easing: "ease-out",
      });
      setTimeout(() => {
        res(null);
      }, animationSpeed);
    }
  });
};

export { board_1_Elements, board_2_Elements };
