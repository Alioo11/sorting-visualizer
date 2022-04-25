import { store } from "../redux";
import { incrementingArray } from "../utils/commonFunction";
import { createBars } from "./createBars";
import { boardType, barColors } from "../utils/types";

//% this file have access to DOM

//% selecting DOM elements

const barsContainer_1 = window.document.querySelector("#bars-container-1");
const barsContainer_2 = window.document.querySelector("#bars-container-2");
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
  fillBoard(barsContainer_2, boardType.second);
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

// export const MoveBarAsync = (bar: HTMLDivElement, amount: number) => {
//   return new Promise((res) => {
//     const animationSpeed = store.getState().animationSpeed;
//     const barLength = bar.getBoundingClientRect().width;
//     bar.animate([{ transform: "" }, { transform: `translateX(${amount * (barLength + 1)}px)` }], { duration: animationSpeed, easing: "ease-out" });
//     setTimeout(() => {
//       res(null);
//     }, animationSpeed);
//   });
// };

export const MoveBarAnimationAsync = (barIndex: number, amount: number, type: boardType = boardType.main) => {
  return new Promise((res) => {
    if (type === boardType.main && board_1_Elements) {
      const animationSpeed = store.getState().animationSpeed;
      const barLength = board_1_Elements[barIndex].getBoundingClientRect().width;
      board_1_Elements[barIndex].animate([{ transform: "" }, { transform: `translateX(${amount * (barLength + 1)}px)` }], {
        duration: animationSpeed,
        easing: "ease",
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

export const swapBarAnimationAsync = async (barIndex_1: number, barIndex_2: number, type: boardType = boardType.main) => {
  const diff = barIndex_2 - barIndex_1;
  await Promise.all([MoveBarAnimationAsync(barIndex_1, diff, type), MoveBarAnimationAsync(barIndex_2, diff * -1, type)]);
};

export const PutBar = (barIndex: number, amount: number, type: boardType = boardType.main) => {
  if (type === boardType.main && board_1_Elements) {
    board_1_Elements[barIndex].style.height = `${amount}%`;
  } else if (type === boardType.second && board_2_Elements) {
    board_2_Elements[barIndex].style.height = `${amount}%`;
  }
};

export const ChangeBarsColor = (bars: number[], color: barColors, type: boardType = boardType.main) => {
  const colorClasses = ["_blue", "_green", "_red", "_purple"];
  if (type === boardType.main && board_1_Elements) {
    bars.forEach((item) => {
      colorClasses.forEach((colorItem) => {
        board_1_Elements && board_1_Elements[item].classList.remove(colorItem);
      });
      switch (color) {
        case barColors.blue: {
          board_1_Elements && board_1_Elements[item].classList.add("_blue");
          break;
        }
        case barColors.green: {
          board_1_Elements && board_1_Elements[item].classList.add("_green");
          break;
        }
        case barColors.red: {
          board_1_Elements && board_1_Elements[item].classList.add("_red");
          break;
        }
        default: {
          board_1_Elements && board_1_Elements[item].classList.add("_blue");
        }
      }
    });
  } else if (type === boardType.second && board_2_Elements) {
    bars.forEach((item) => {
      colorClasses.forEach((colorItem) => {
        board_2_Elements && board_2_Elements[item].classList.remove(colorItem);
      });
      switch (color) {
        case barColors.blue: {
          board_2_Elements && board_2_Elements[item].classList.add("_blue");
          break;
        }
        case barColors.green: {
          board_2_Elements && board_2_Elements[item].classList.add("_green");
          break;
        }
        case barColors.red: {
          board_2_Elements && board_2_Elements[item].classList.add("_red");
          break;
        }
        default: {
          board_2_Elements && board_2_Elements[item].classList.add("_blue");
        }
      }
    });
  }
};

export const compareBars = async (barIndex_1: number, barIndex_2: number, type: boardType = boardType.main) => {
  const animationSpeed = store.getState().animationSpeed;
  return new Promise((res) => {
    ChangeBarsColor([barIndex_1, barIndex_2], barColors.red, type);
    setTimeout(() => {
      ChangeBarsColor([barIndex_1, barIndex_2], barColors.blue, type);
      res(null);
    }, animationSpeed / 2);
  });
};

export const stretchAnimation = (squize: boolean = true, type: boardType = boardType.main) => {
  const animationSpeed = store.getState().animationSpeed;
  return new Promise((res) => {
    if (type === boardType.main && board_1_Elements) {
      board_1_Elements.forEach((barItem) => {
        let newHeight = parseFloat(barItem.style.height);
        newHeight = squize ? newHeight / 2 : newHeight * 2;
        barItem.animate([{ transform: "" }, { height: `${newHeight}%` }], {
          duration: animationSpeed,
          easing: "ease-out",
        });
      });
    }
    if (type === boardType.second && board_2_Elements) {
      board_2_Elements.forEach((barItem) => {
        let newHeight = parseFloat(barItem.style.height);
        newHeight = squize ? newHeight / 2 : newHeight * 2;
        barItem.animate([{ transform: "" }, { height: `${newHeight}%` }], {
          duration: animationSpeed,
          easing: "ease-out",
        });
      });
    }
    setTimeout(() => {
      res(null);
    }, animationSpeed);
  });
};

export const stretch = (squize: boolean = true, type: boardType = boardType.main) => {
  if (type === boardType.main && board_1_Elements) {
    board_1_Elements.forEach((barItem) => {
      let newHeight = parseFloat(barItem.style.height);
      newHeight = squize ? newHeight / 2 : newHeight * 2;
      barItem.style.height = ` ${newHeight}%`;
    });
  }
  if (type === boardType.second && board_2_Elements) {
    board_2_Elements.forEach((barItem) => {
      let newHeight = parseFloat(barItem.style.height);
      newHeight = squize ? newHeight / 2 : newHeight * 2;
      barItem.style.height = ` ${newHeight}%`;
    });
  }
};

export const raiseAnimation = (arr: number[], type: boardType = boardType.main) => {
  const animationSpeed = store.getState().animationSpeed;
  return new Promise((res) => {
    if (type === boardType.main && barsContainer_1 && board_1_Elements) {
      const containerHeight = barsContainer_1.getClientRects()[0].height / 2;
      arr.forEach((barItem) => {
        board_1_Elements &&
          board_1_Elements[barItem].animate([{ transform: `` }, { transform: `translateY(${containerHeight}px)` }], {
            duration: animationSpeed,
            easing: "ease-out",
          });
      });
    } else if (type === boardType.second && barsContainer_2 && board_2_Elements) {
      const containerHeight = barsContainer_2.getClientRects()[0].height / 2;
      arr.forEach((barItem) => {
        board_2_Elements &&
          board_2_Elements[barItem].animate([{ transform: `` }, { transform: `translateY(${containerHeight}px)` }], {
            duration: animationSpeed,
            easing: "ease-out",
          });
      });
    }
    setTimeout(() => {
      res(null);
    }, animationSpeed);
  });
};

export const raise = (arr: number[], type: boardType = boardType.main) => {
  if (type === boardType.main && barsContainer_1 && board_1_Elements) {
    const containerHeight = barsContainer_1.getClientRects()[0].height / 2;
    arr.forEach((barItem) => {
      console.log("moving bar up ", containerHeight);
      board_1_Elements && (board_1_Elements[barItem].style.transform = `translateY(${containerHeight}px)`);
    });
  } else if (type === boardType.second && barsContainer_2 && board_2_Elements) {
    const containerHeight = barsContainer_2.getClientRects()[0].height / 2;
    arr.forEach((barItem) => {
      board_2_Elements && (board_2_Elements[barItem].style.transform = `translateY(${containerHeight}px)`);
    });
  }
};

export const moveBarAndFloorAnimation = (barIndex: number, amount: number, type: boardType = boardType.main) => {
  const animationSpeed = store.getState().animationSpeed;
  return new Promise((res) => {
    if (type === boardType.main && board_1_Elements) {
      const barLength = board_1_Elements[barIndex].getBoundingClientRect().width + 1;
      board_1_Elements[barIndex].animate([{ transform: "" }, { transform: `translate(${amount * barLength}px , ${0}px)` }], {
        duration: animationSpeed,
        easing: "ease-out",
      });
    } else if (type === boardType.second && board_2_Elements) {
      const barLength = board_2_Elements[barIndex].getBoundingClientRect().width + 1;
      board_2_Elements[barIndex].style.transform = `translate(${amount * barLength}px , ${0}px)`;
    }
    setTimeout(() => {
      res(null);
    }, animationSpeed);
  });
};

export const moveBarAndFloor = (barIndex: number, amount: number, type: boardType = boardType.main) => {
  if (type === boardType.main && board_1_Elements) {
    const barLength = board_1_Elements[barIndex].getBoundingClientRect().width + 1;
    board_1_Elements[barIndex].style.transform = `translate(${amount * barLength}px , ${0}px)`;
  } else if (type === boardType.second && board_2_Elements) {
    const barLength = board_2_Elements[barIndex].getBoundingClientRect().width + 1;
    board_2_Elements[barIndex].style.transform = `translate(${amount * barLength}px , ${0}px)`;
  }
};

export { board_1_Elements, board_2_Elements };
