import { store } from "../redux";
export const createBars = (bars: number[], options?: {}) => {
  const Pivot = store.getState().colapsePivot;
  return bars.map((barItem) => {
    const div = Object.assign(document.createElement("div"), options);
    div.classList.add(bars.length > Pivot ? "bar--simple" : "bar");

    div.style.height = `${barItem}%`;
    return div;
  });
};
