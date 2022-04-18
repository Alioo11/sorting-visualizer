import { store } from "./redux/index";
import { incremented, decremented, changeSpeed, toggleCompareMode } from "./redux";
import { incrementingArray, wait } from "./utils/commonFunction";
import "./asset/styles/index.css";
import { createBars } from "./DOMFunctions/createBars";
import { swapBars, MoveBarAsync, initBoards } from "./DOMFunctions/manipulate";
import { randomizeArray } from "./algorithms/randomize/randomize";

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
  store.dispatch(changeSpeed(e.target.value));
});

initBoards();

store.subscribe(() => {
  const compareMode = store.getState().compareMode;
  if (!compareMode) {
    barsContainer_2?.classList.add("hide");
  } else {
    barsContainer_2?.classList.remove("hide");
  }
});

// const barsCount = incrementingArray(50);
// let bars = createBars(barsCount);
// BarsContainer?.replaceChildren(...bars);

// store.subscribe(() => {
//   const eventBarsCount = store.getState().speed;
//   const barsCount = incrementingArray(eventBarsCount);
//   bars = createBars(barsCount);
//   BarsContainer?.replaceChildren(...bars);
// });

// btn_1?.addEventListener("click", async () => {
//   await Promise.all([MoveBarAsync(bars[11], -5), MoveBarAsync(bars[6], 5)]);
//   swapBars(bars[11], bars[6]);
// });

// btn_2?.addEventListener("click", async () => {
//   const barsHeights = Array.from(bars.keys());
//   const res = randomizeArray(barsHeights);
//   for (let i = 0; i < res.length; i++) {
//     const diff = res[i][0] - res[i][1];
//     if (store.getState().animationSpeed > 200) {
//       await Promise.all([MoveBarAsync(bars[res[i][0]], -1 * diff), MoveBarAsync(bars[res[i][1]], diff)]);
//     } else {
//       await wait(store.getState().animationSpeed);
//     }

//     swapBars(bars[res[i][0]], bars[res[i][1]]);
//   }
// });

const inc = document.querySelector("#inc");

inc?.addEventListener("click", () => {
  store.dispatch(incremented());
});

btn_3?.addEventListener("click", () => {
  store.dispatch(toggleCompareMode());
});

// choose sorting aldorithm
