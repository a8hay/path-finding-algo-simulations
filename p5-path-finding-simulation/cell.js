class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isStart = false;
    this.isEnd = false;
    this.isWall = false;
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
    stroke(115);
    fill(this.clr[0], this.clr[1], this.clr[2], this.clr[3]);
    rect(this.x, this.y, cellSize, cellSize);
  }
}
