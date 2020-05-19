function dfs() {
  console.log("applying DEPTH FIRST SEARCH");
  let startNode = GRID[startX][startY];
  let endNode = GRID[endX][endY];
  let stack = [];

  startNode.isDiscovered = true;
  stack.push(startNode);

  while (stack.length > 0) {
    let current = stack.pop();
    if (current == endNode) {
      console.log("found end node");
      break;
    } else {
      for (let nebr of current.neighbours) {
        if (nebr.isWall) {
          continue;
        }
        if (!nebr.isDiscovered) {
          nebr.isDiscovered = true;
          nebr.parent = current;
          stack.push(nebr);
        }
      }
    }
  }

  //   mark the cells which are in the path(that is solution path bw start and end)
  let end = endNode;
  while (end.parent != null) {
    if (!end.isStart) {
      end.isPath = true;
    }
    end = end.parent;
  }
  // to keep the end node red
  endNode.isPath = false;
  endNode.isDiscovered = false;
}
