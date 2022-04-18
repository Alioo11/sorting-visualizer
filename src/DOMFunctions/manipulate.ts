import { store } from "../redux";
import { incrementingArray } from "../utils/commonFunction";
import { createBars } from "./createBars";
// this file have access to DOM

//% selecting DOM elements
const algoSpeed = document.querySelector("#algo-speed");
const BarsContainer = document.querySelector(".bars-container");
const inc = document.querySelector("#inc");
const demo = document.querySelector("#demo");
const barsContainer_1 = document.querySelector("#bars-container-1");
const barsContainer_2 = document.querySelector("#bars-container-2");
//% selecting DOM elements

let board_1_Elements: HTMLDivElement[] | null = null;
let board_2_Elements: HTMLDivElement[] | null = null;

const fillBoard = (containerRef: Element | null, ref: HTMLDivElement[] | null) => {
  const barsCount = incrementingArray(100);
  ref = createBars(barsCount);
  containerRef?.replaceChildren(...ref);
};
export const initBoards = () => {
  const compareMode = store.getState().compareMode;
  fillBoard(barsContainer_1, board_1_Elements);
  compareMode && fillBoard(barsContainer_2, board_2_Elements);
  !compareMode && barsContainer_2?.classList.add("hide");
};

export const swapBars = (bar1: HTMLDivElement, bar2: HTMLDivElement) => {
  const bar1Height = bar1.style.height;
  const bar2Height = bar2.style.height;
  bar1.style.height = bar2Height;
  bar2.style.height = bar1Height;
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

// export const swapBars = async (bar_1_index: number, bar_2_index: number, animation = true) => {
//   const diff = bar_2_index - bar_1_index;
//   if (animation) {
//     await Promise.all([MoveBarAsync(bars[res[i][0]], -1 * diff), MoveBarAsync(bars[res[i][1]], diff)]);
//   } else {
//   }
// };

// export const barss = (bar: HTMLDivElement, amount: number) => {
//   const barLength = bar.getBoundingClientRect().width;
//   const animationSpeed = store.getState().animationSpeed;
//   bar.animate([{ transform: "" }, { transform: `translateX(${amount * (barLength + 1)}px)` }], { duration: animationSpeed, easing: "ease-out" });
// };

//export { barsContainer_1, barsContainer_2 };
