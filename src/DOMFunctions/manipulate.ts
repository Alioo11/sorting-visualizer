import { store } from "../redux";

export const move = (bar: HTMLDivElement, amount: number, animation: boolean = true) => {
  bar.style.transition = animation ? "transform 500ms" : "";
  bar.style.transform = `translateX(${amount}px)`;
};

export const MoveAnimation = async (bar: HTMLDivElement, amount: number) => {
  const barLength = bar.getBoundingClientRect().width;
  const animationSpeed = store.getState().animationSpeed;
  bar.style.transition = `transform ${animationSpeed}ms`;
  bar.style.transform = `translateX(${amount * (barLength + 1)}px)`;
};

export const swapBars = (bar1: HTMLDivElement, bar2: HTMLDivElement) => {
  const bar1Height = bar1.style.height;
  const bar2Height = bar2.style.height;
  bar1.style.height = bar2Height;
  bar2.style.height = bar1Height;
};

export const barss = (bar: HTMLDivElement) => {
  bar.animate([{ transform: "rotate(0) scale(1)" }, { transform: "rotate(360deg) scale(0)" }], { duration: 500 });
};
