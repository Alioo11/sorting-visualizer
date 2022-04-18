import { store } from "./redux/index";
import { incremented, decremented, changeSpeed } from "./redux";
import { incrementingArray } from "./utils/commonFunction";
import "./asset/styles/index.css";
import { createBars } from "./DOMFunctions/createBars";
import { swapBars, MoveAnimation, barss } from "./DOMFunctions/manipulate";

const algoSpeed = document.querySelector("#algo-speed");
const BarsContainer = document.querySelector(".bars-container");

const btn_1 = document.querySelector("#test-btn-1");
const btn_2 = document.querySelector("#test-btn-2");
const btn_3 = document.querySelector("#test-btn-3");
const btn_4 = document.querySelector("#test-btn-4");

algoSpeed?.addEventListener("input", (e: any) => {
  store.dispatch(changeSpeed(e.target.value));
});

const barsCount = incrementingArray(50);
let bars = createBars(barsCount);
BarsContainer?.replaceChildren(...bars);

store.subscribe(() => {
  const eventBarsCount = store.getState().speed;
  const barsCount = incrementingArray(eventBarsCount);
  bars = createBars(barsCount);
  BarsContainer?.replaceChildren(...bars);
});

btn_1?.addEventListener("click", () => {
  swapBars(bars[5], bars[30]);
  MoveAnimation(bars[9], -5);
  barss(bars[2]);
});

const inc = document.querySelector("#inc");
const demo = document.querySelector("#demo");

inc?.addEventListener("click", () => {
  store.dispatch(incremented());
});

store.subscribe(() => {
  demo && (demo.innerHTML = store.getState().value.toString());
});

// choose sorting aldorithm
