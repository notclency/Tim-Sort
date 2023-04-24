// width of each bar is taken as 8.
let values = [];
// The array 'states' helps in identifying the pivot index
// at every step, and also the subarray which is being sorted
// at any given time. 
let states = [];

let sort = document.getElementById('sort');

sort.addEventListener('click', function () {
  sort.disabled = true;
  setup();
  sort.disabled = false;
});



// The setup() function is called once when the program 
// starts. Here, we fill the array 'values' with random values
// and the array 'states' with a value of -1 for each position.
function setup() {
  sort.disabled = true;
  createCanvas(800, 420);
  for (let i = 0; i < width / 20; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  TimsSort();
  sort.disabled = false;
}

// The statements in draw() function are executed continuously
// until the program is stopped. Each statement is executed
// sequentially and after the last line is read, the first
// line is executed again.
function draw() {
  background(140);
  for (let i = 0; i < values.length; i++) {
    // color coding
    if (states[i] == 0) {
      // color for the bar at the pivot index
      fill('#990000');
    } else if (states[i] == 1) {
      // color for the bars being sorted currently
      fill('#88E904');
    } else {
      fill(255);
    }
    rect(i * 20, height - values[i], 20, values[i]);
  }
}

function setState(index, state) {
  states[index] = state;
}

async function TimsSort() {

  let min_run_size = 32;

  for (let start = 0; start < values.length; start += min_run_size) {
    let end = Math.max((start + min_run_size - 1), (values.length - 1));
    await insertionSort(values, start, end);
  }

  // Merge the sorted runs
  for (let runSize = min_run_size; runSize < values.length; runSize *= 2) {
    for (let left = 0; left < values.length; left += 2 * runSize) {
      let mid = left + runSize - 1;
      let right = Math.min(left + 2 * runSize - 1, values.length - 1);
      if (mid < right) {
        await mergeSort(values, left, mid, right);
      }
    }

    for (let i = 0; i < 100000; i++) {
      await sleep(5);
      setState(i, 1);
    }
  }
}

// The insertion sort algorithm
async function insertionSort(values, start, end) {
  for (let i = start; i <= end; i++) {
    let j = i - 1;
    await sleep(10);
    while (j > 0 && values[j] < values[j - 1]) {
      await sleep(10);
      swap(values, j, j - 1);
      j--;
    }
  }
}

// swap function
async function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

// The mergeSort function
async function mergeSort(values, low, mid, high) {
  // declare array named leftArray of size mid - low + 1
  let leftArray = values.slice(low, mid - low + 2);
  // declare array named rightArray of size high - mid
  let rightArray = values.slice(mid + 1, high - mid + 2);

  let leftSubArrayIndex = 0;
  let rightSubArrayIndex = 0;
  let sortedArrayIndex = low;

  while (leftSubArrayIndex < leftArray.length && rightSubArrayIndex < rightArray.length) {
    await sleep(10);
    if (leftArray[leftSubArrayIndex] <= rightArray[rightSubArrayIndex]) {
      values[sortedArrayIndex] = leftArray[leftSubArrayIndex];
      leftSubArrayIndex++;
    } else {
      values[sortedArrayIndex] = rightArray[rightSubArrayIndex];
      rightSubArrayIndex++;
    }
    sortedArrayIndex++;
  }

  while (leftSubArrayIndex < leftArray.length) {
    await sleep(10);
    values[sortedArrayIndex] = leftArray[leftSubArrayIndex];
    leftSubArrayIndex++;
    sortedArrayIndex++;
  }

  while (rightSubArrayIndex < rightArray.length) {
    await sleep(10);
    arrvaluesay[sortedArrayIndex] = rightArray[rightSubArrayIndex];
    rightSubArrayIndex++;
    sortedArrayIndex++;
  }

}

// custom helper function to deliberately slow down
// the sorting process and make visualization easy
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}