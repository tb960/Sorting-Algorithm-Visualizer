import _ from "lodash";

// Bubble sort
export const bubbleSort = (blocks, time_counter, speed) => {
  for (let i = 0; i < blocks.length; i++) {
    for (let j = 0; j < blocks.length - i - 1; j++) {
      if (blocks[j].height > blocks[j + 1].height) {
        [blocks[j], blocks[j + 1]] = [blocks[j + 1], blocks[j]];

        let block1_height = blocks[j].height;
        let block2_height = blocks[j + 1].height;

        setTimeout(() => {
          let block1 = document.getElementById(`block-${j}`);
          let block2 = document.getElementById(`block-${j + 1}`);
          block1.style.height = `${block1_height}%`;
          block2.style.height = `${block2_height}%`;
        }, speed * time_counter[0]);
        time_counter[0]++;
      }
    }
  }
};

// Insertion sort
export const insertionSort = (blocks, time_counter, speed) => {
  for (let i = 1; i < blocks.length; i++) {
    let key = blocks[i].height;
    let j = i - 1;

    while (j >= 0 && blocks[j].height > key) {
      blocks[j + 1].height = blocks[j].height;
      let block1_index = blocks[j + 1].index;
      let block1_height = blocks[j + 1].height;

      setTimeout(() => {
        mutateDOM(block1_index, block1_height);
      }, time_counter[0] * speed);
      time_counter[0]++;
      j--;
    }

    blocks[j + 1].height = key;
    let block1_index = blocks[j + 1].index;
    let block1_height = blocks[j + 1].height;

    setTimeout(() => {
      mutateDOM(block1_index, block1_height);
    }, time_counter[0] * speed);
    time_counter[0]++;
  }
};

// Merge sort
export const merge = (blocks, L, R, time_counter, speed) => {
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < L.length && j < R.length) {
    if (L[i].height < R[j].height) {
      let height = L[i].height;
      blocks[k].height = height;
      i++;
    } else {
      let height = R[j].height;
      blocks[k].height = height;
      j++;
    }
    let index = blocks[k].index;
    let block_height = blocks[k].height;
    setTimeout(() => {
      mutateDOM(index, block_height);
    }, time_counter[0] * speed);
    time_counter[0]++;
    k++;
  }
  for (; i < L.length; i++) {
    let height = L[i].height;
    blocks[k].height = height;
    let index = blocks[k].index;
    let block_height = blocks[k].height;

    setTimeout(() => {
      mutateDOM(index, block_height);
    }, time_counter[0] * speed);
    time_counter[0]++;

    k++;
  }
  for (; j < R.length; j++) {
    let height = R[j].height;
    blocks[k].height = height;
    let index = blocks[k].index;
    let block_height = blocks[k].height;

    setTimeout(() => {
      mutateDOM(index, block_height);
    }, time_counter[0] * speed);
    time_counter[0]++;

    k++;
  }
};

export const mergeSort = (blocks, time_counter, speed) => {
  if (blocks.length > 1) {
    let mid = Math.floor(blocks.length / 2);
    let L = _.cloneDeep(blocks.slice(0, mid));
    let R = _.cloneDeep(blocks.slice(mid, blocks.length));

    mergeSort(L, time_counter, speed);
    mergeSort(R, time_counter, speed);
    merge(blocks, L, R, time_counter, speed);
  }
};

// Quick sort
export const partition = (blocks, l, h, time_counter, speed) => {
  let i = l;
  let j = h;
  while (i < j) {
    while (blocks[i].height <= blocks[l].height && i < blocks.length - 1) {
      i++;
    }
    while (blocks[j].height > blocks[l].height) {
      j--;
    }
    if (i < j) {
      let container = blocks[i].height;
      blocks[i].height = blocks[j].height;
      blocks[j].height = container;
      let block1_index = blocks[i].index;
      let block2_index = blocks[j].index;
      let block1_height = blocks[i].height;
      let block2_height = blocks[j].height;

      setTimeout(() => {
        mutateDOM(block1_index, block1_height);
        mutateDOM(block2_index, block2_height);
      }, time_counter[0] * speed);
      time_counter[0]++;
    }
  }

  let container = blocks[l].height;
  blocks[l].height = blocks[j].height;
  blocks[j].height = container;
  let block1_index = blocks[l].index;
  let block2_index = blocks[j].index;
  let block1_height = blocks[l].height;
  let block2_height = blocks[j].height;
  setTimeout(() => {
    mutateDOM(block1_index, block1_height);
    mutateDOM(block2_index, block2_height);
  }, time_counter[0] * speed);
  time_counter[0]++;

  return j;
};

export const quickSort = (blocks, l, h, time_counter, speed) => {
  if (l >= h) {
    return;
  }

  let j = partition(blocks, l, h, time_counter, speed);
  quickSort(blocks, l, j - 1, time_counter, speed);
  quickSort(blocks, j + 1, h, time_counter, speed);
};

// Selection sort
export const selectionSort = (blocks, time_counter, speed) => {
  for (let i = 0; i < blocks.length; i++) {
    let min_index = i;
    for (let j = i + 1; j < blocks.length; j++) {
      if (blocks[j].height < blocks[min_index].height) {
        min_index = j;
      }
    }
    let container = blocks[i].height;
    blocks[i].height = blocks[min_index].height;
    blocks[min_index].height = container;

    let block1_height = blocks[i].height;
    let block2_height = blocks[min_index].height;
    setTimeout(() => {
      let block1 = document.getElementById(`block-${i}`);
      let block2 = document.getElementById(`block-${min_index}`);
      block1.style.height = `${block1_height}%`;
      block2.style.height = `${block2_height}%`;
    }, time_counter[0] * speed);
    time_counter[0]++;
  }
};

export const mutateDOM = (index, value) => {
  let block_index = index;
  let block_value = value;
  let blockElmt = document.getElementById(`block-${block_index}`);
  blockElmt.style.height = `${block_value}%`;
};
