class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.clr = [255, 255, 255, 255];
  }

  show() {
    stroke(115);
    fill(this.clr[0], this.clr[1], this.clr[2], this.clr[3]);
    rect(this.x, this.y, cellSize, cellSize);
  }
}
