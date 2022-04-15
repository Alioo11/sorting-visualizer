export const createBars = (bars: number[], options?: {}) => {
  return bars.map((barItem) => {
    const div = Object.assign(document.createElement("div"), options);
    div.classList.add(bars.length > 50 ? "bar--simple" : "bar");
    div.style.height = `${barItem}px`;
    return div;
  });
};
