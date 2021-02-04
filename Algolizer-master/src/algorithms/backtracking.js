export const mutateDOM = (row, col, value) => {
  let cellElmt = document.getElementById(`cell-${row}-${col}`);
  if (value === 0) {
    cellElmt.textContent = "";
  } else {
    cellElmt.textContent = `${value}`;
  }
};

export const findRange = (index) => {
  if (index < 3) {
    return [0, 3];
  }
  if (index >= 3 && index < 6) {
    return [3, 6];
  }
  if (index >= 6) {
    return [6, 9];
  }
};

export const navi_helper = (curr_x, curr_y) => {
  if (curr_y < 8) {
    return [curr_x, curr_y + 1];
  } else {
    return [curr_x + 1, 0];
  }
};

export const isSafe = (board, row, col, val) => {
  if (row > board.length || col > board[0].length || row < 0 || col < 0) {
    return false;
  }

  for (let i = 0; i < board.length; i++) {
    if (board[i][col].val === val) {
      return false;
    }
    if (board[row][i].val === val) {
      return false;
    }
  }
  let [x1, x2] = findRange(row);
  let [y1, y2] = findRange(col);

  for (let i = x1; i < x2; i++) {
    for (let j = y1; j < y2; j++) {
      if (board[i][j].val === val) {
        return false;
      }
    }
  }
  return true;
};

export const solve_sudoku = (board, curr_x, curr_y, time_counter) => {
  if (curr_x === 8 && curr_y === 9) {
    return true;
  }

  if (curr_y === 9) {
    [curr_x, curr_y] = navi_helper(curr_x, curr_y);
  }

  while (board[curr_x][curr_y].val !== 0) {
    [curr_x, curr_y] = navi_helper(curr_x, curr_y);
  }

  for (let num = 1; num < 10; num++) {
    if (isSafe(board, curr_x, curr_y, num)) {
      board[curr_x][curr_y].val = num;
      setTimeout(() => {
        mutateDOM(curr_x, curr_y, num);
      }, time_counter[0] * 2);
      time_counter[0]++;

      if (solve_sudoku(board, curr_x, curr_y + 1, time_counter)) {
        return true;
      } else {
        board[curr_x][curr_y].val = 0;
        setTimeout(() => {
          mutateDOM(curr_x, curr_y, 0);
        }, time_counter[0] * 2);
        time_counter[0]++;
      }
    }
  }
  return false;
};
