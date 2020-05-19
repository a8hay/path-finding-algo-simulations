class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isStart = false;
    this.isEnd = false;
    this.isWall = false;
    this.isDiscovered = false;
    this.isPath = false;
    this.parent = null;
    this.neighbours = [];
    this.clr = [255, 255, 255, 255];
  }

  show() {
    if (this.isStart) {
      this.clr = [0, 255, 0, 255];
    } else {
      this.clr = [255, 255, 255, 255];
    }
    if (this.isEnd) {
      this.clr = [255, 0, 0, 255];
    }
    if (this.isWall) {
      this.clr = [51, 51, 51, 255];
    }
    if (this.isDiscovered && !this.isStart) {
      this.clr = [0, 255, 255, 180];
    }
    if (this.isPath) {
      this.clr = [255, 255, 0, 255];
    }
    stroke(115);
    fill(this.clr[0], this.clr[1], this.clr[2], this.clr[3]);
    rect(this.x, this.y, cellSize, cellSize);
  }

  // copy without neighbours
  shallowCopy() {
    let copy = new Cell(this.x, this.y);

    copy.isStart = this.isStart;
    copy.isEnd = this.isEnd;
    copy.isWall = this.isWall;
    copy.isDiscovered = this.isDiscovered;
    copy.isPath = this.isPath;
    copy.clr = [].concat(this.clr);

    return copy;
  }
}
