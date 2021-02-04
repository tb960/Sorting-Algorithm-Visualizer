export const findNeighbours = (stage, cell) => {
  let neighbours = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let row = cell.row + i;
      let col = cell.col + j;
      if (row !== cell.row && col !== cell.col) {
        continue;
      }
      if (row >= stage.length || col >= stage[0].length || row < 0 || col < 0) {
        continue;
      }
      if (i === 0 && j === 0) {
        continue;
      }
      if (stage[row][col].type === "block") {
        continue;
      }
      neighbours.push(stage[row][col]);
    }
  }
  return neighbours;
};

export const calc_heuristic = (start, end) => {
  let dist = Math.sqrt(
    Math.pow(start.row - end.row, 2) + Math.pow(start.col - end.col, 2)
  );

  return dist;
};

export const get_min_f_score = (open_list) => {
  let min_f = open_list[0].f_score;
  let min_cell = {};

  open_list.forEach((cell) => {
    if (cell.f_score <= min_f) {
      min_f = cell.f_score;
      min_cell = cell;
    }
  });
  return min_cell;
};

export const updateScore = (current, neighbour, end) => {
  let h = calc_heuristic(neighbour, end);
  let g = calc_heuristic(neighbour, current) + current.g_score;

  let f = g + h;
  neighbour.h_score = h;
  if (f < neighbour.f_score || neighbour.f_score === null) {
    neighbour.f_score = f;
    neighbour.g_score = g;
    neighbour.parent = current;
  }
};

export const printPath = (end, stage) => {
  let node = end.parent;
  let timeCounter = 1;

  while (node.type !== "start") {
    let cell = document.getElementById(`cell-${node.row}-${node.col}`);
    node = node.parent;
    setTimeout(() => {
      cell.classList.add("node-shortest-path");
    }, 20 * timeCounter);
    timeCounter++;
  }
};

export const aStarFindPath = (start, end, stage, setStage, updateLocation) => {
  if (!start || !end) {
    alert("Please select start and end location");
    return;
  }
  let open_list = [];
  let close_list = [];

  start.h_score = calc_heuristic(start, end);
  start.f_score = start.h_score;
  open_list.push(start);
  let current = get_min_f_score(open_list);

  let i = 0;
  while (current.type !== "end") {
    current = get_min_f_score(open_list);
    open_list.splice(open_list.indexOf(current), 1);

    if (current.type == "end") {
      break;
    }

    if (current.type !== "start" && current.type !== "end") {
      close_list.push(current);

      let cell = document.getElementById(`cell-${current.row}-${current.col}`);
      setTimeout(() => {
        cell.classList.add("node-visited");
      }, 5 * i);

      i++;
      current.type = "close";
    }

    let neighbour_list = findNeighbours(stage, current);
    neighbour_list.forEach((neighbour) => {
      if (neighbour.type === "block") {
        return;
      }
      if (neighbour.type !== "close" && neighbour.type !== "start") {
        updateScore(current, neighbour, end);
      } else {
        return;
      }

      if (!open_list.includes(neighbour) && neighbour.type !== "start") {
        open_list.push(neighbour);
      }

      if (neighbour.type !== "start" && neighbour.type !== "end") {
        stage[neighbour.row][neighbour.col].type = "open";
        let cell = document.getElementById(
          `cell-${neighbour.row}-${neighbour.col}`
        );

        setTimeout(() => {
          cell.classList.add("node-visited");
        }, 3 * i);
        i++;
      }
    });
  }
  setTimeout(() => {
    printPath(current, stage);
  }, 5 * i);
};
