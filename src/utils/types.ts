interface ALGORITHM_TYPE {
  name: string;
  timeComplexity: { min: string; avg: string; max: string };
  description?: string;
  code?: string;
}

const ALGORITHMS: ALGORITHM_TYPE[] = [
  {
    name: "bubble-sort",
    timeComplexity: {
      min: "O(n)",
      avg: "O(n2)",
      max: "O(n2)",
    },
    description: `Bubble Sort is an iterative sorting algorithm that imitates the movement of bubbles in sparkling water. The bubbles represents the elements of the data structure.

    The bigger bubbles reach the top faster than smaller bubbles, and this algorithm works in the same way. It iterates through the data structure and for each cycle compares the current element with the next one, swapping them if they are in the wrong order`,
    code: `function bubbleSort(arr) {
      for(var i = 0; i < arr.length; i++) {
          for(var j = 0; j < ( arr.length - i -1 ); j++) {
              if(arr[j] > arr[j+1]) {
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j+1] = temp
              }
          }
      }
  }`,
  },
  {
    name: "insertion-sort",
    timeComplexity: {
      min: "O(n)",
      avg: "O(n2)",
      max: "O(n2)",
    },
    description: `Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It's less performant than advanced sorting algorithms, but it can still have some advantages: it's really easy to implement and it's efficient on small data structures almost sorted`,
    code: `function insertionSort(arr, n)
    {
        let i, key, j;
        for (i = 1; i < n; i++)
        {
            key = arr[i];
            j = i - 1;
    
            while (j >= 0 && arr[j] > key)
            {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }`,
  },
];

enum algorithmTypes {
  bubble_sort = "bubble-sort",
  insertion_sort = "insertion-sort",
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

export { commandTypes, boardType, barColors, instructions, instruction, algorithmTypes };
