enum algorithmTypes {
  selection_sort = "selection_sort",
  merge_sort = "merge_sort",
  bubble_sort = "bubble_sort",
}

enum commandTypes {
  swap,
  shift,
}

enum boardType {
  main,
  second,
  both,
}

enum barColors {
  blue,
  red,
  green,
}

interface instructions {
  animationFunction: Function[];
  mainFunc: Function[];
  data: number[];
}

class instruction {
  animationFunc: Function;
  animationArgs: any[];
  mainFunc: Function | null;
  mainArgs: any[];
  fraction: number = 1;
  constructor(animeFunc: Function, mainFunc: Function | null, animationArgs: any[], mainArgs: any[], fraction: number | null = 1) {
    this.animationFunc = animeFunc;
    this.mainFunc = mainFunc;
    this.animationArgs = animationArgs;
    this.mainArgs = mainArgs;
    fraction && (this.fraction = fraction);
  }
}

export { algorithmTypes, commandTypes, boardType, barColors, instructions, instruction };
