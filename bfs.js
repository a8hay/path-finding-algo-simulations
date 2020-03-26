function bfs() {
  console.log("applying BREADTH FIRST SEARCH");
  let startNode = GRID[startX][startY];
  let endNode = GRID[endX][endY];
  let Q = [];

  startNode.isDiscovered = true;
  Q.push(startNode);

  while (Q.length > 0) {
    let current = Q.shift();
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
          Q.push(nebr);
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
}
