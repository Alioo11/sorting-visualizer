import { store } from "./redux/index";
import { incremented, decremented, changeSpeed } from "./redux";
import { incrementingArray } from "./utils/commonFunction";
import "./asset/styles/index.css";
import { createBars } from "./DOMFunctions/createBars";

const algoSpeed = document.querySelector("#algo-speed");
const BarsContainer = document.querySelector(".bars-container");

algoSpeed?.addEventListener("input", (e: any) => {
  store.dispatch(changeSpeed(e.target.value));
});

store.subscribe(() => {
  const eventBarsCount = store.getState().speed;
  const barsCount = incrementingArray(eventBarsCount, 500 / store.getState().speed);
  const bars = createBars(barsCount);
  BarsContainer?.replaceChildren(...bars);
});

const barsCount = incrementingArray(30, 15);
const bars = createBars(barsCount);
BarsContainer?.replaceChildren(...bars);

const inc = document.querySelector("#inc");
const demo = document.querySelector("#demo");

inc?.addEventListener("click", () => {
  store.dispatch(incremented());
});

store.subscribe(() => {
  demo && (demo.innerHTML = store.getState().value.toString());
});

// choose sorting aldorithm
