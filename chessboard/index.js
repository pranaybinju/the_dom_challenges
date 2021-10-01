function main() {
  class ChessBoard {
    constructor() {
      this.root = document.getElementById("root");
      this.root.appendChild(this.createBoard());
      this.resetBtn = document.getElementById("reset");
      this.resetBtn.addEventListener("click", this.resetStyle);
      this.clickedElem = null;
    }
    createBoard = () => {
      const board = document.createElement("div");
      board.classList.add("board");
      for (let i = 0; i < 8; i++) {
        board.appendChild(this.createRow(i));
      }
      return board;
    };
    createRow = (rowNo) => {
      const row = document.createElement("div");

      if (rowNo % 2 === 0) {
        row.classList.add("row-even");
      } else {
        row.classList.add("row-odd");
      }
      for (let j = 0; j < 8; j++) {
        row.appendChild(this.createSquare(rowNo, j, rowNo % 2 === 0));
      }
      return row;
    };
    createSquare = (rowNo, squareNo, isEvenRow) => {
      const square = document.createElement("div");

      if (squareNo % 2 === 0) {
        square.classList.add("white-square");
      } else {
        square.classList.add("black-square");
      }
      if (isEvenRow) {
        square.dataset.column = squareNo;
      } else {
        square.dataset.column = 7 - squareNo;
      }
      square.id = `${rowNo}-${isEvenRow ? squareNo : 7 - squareNo}`;
      square.dataset.row = rowNo;

      square.addEventListener("click", this.setElement);
      return square;
    };
    setElement = (e) => {
      this.clickedElem = e.target;
      this.highlightDiagonals("set");
    };
    highlightDiagonals = (type) => {
      if (type === "set") {
        this.clickedElem.classList.add("highlighted-square");
      } else {
        this.clickedElem.classList.remove("highlighted-square");
      }

      this.goDiagonallyTopLeft(this.clickedElem, type);
      this.goDiagonallyBottomLeft(this.clickedElem, type);
      this.goDiagonallyTopRight(this.clickedElem, type);
      this.goDiagonallyBottomRight(this.clickedElem, type);
    };
    goDiagonallyTopRight = (elem, type) => {
      const row = parseInt(elem.dataset.row) - 1;
      const column = parseInt(elem.dataset.column) + 1;
      if (row < 0 || row > 7 || column < 0 || column > 7) {
        return;
      } else {
        const upperElem = document.getElementById(`${row}-${column}`);
        if (type === "set") {
          upperElem.classList.add("highlighted-square");
        } else {
          upperElem.classList.remove("highlighted-square");
        }

        this.goDiagonallyTopRight(upperElem, type);
      }
    };
    goDiagonallyTopLeft = (elem, type) => {
      const row = parseInt(elem.dataset.row) - 1;
      const column = parseInt(elem.dataset.column) - 1;
      if (row < 0 || row > 7 || column < 0 || column > 7) {
        return;
      } else {
        const upperElem = document.getElementById(`${row}-${column}`);
        if (type === "set") {
          upperElem.classList.add("highlighted-square");
        } else {
          upperElem.classList.remove("highlighted-square");
        }

        this.goDiagonallyTopLeft(upperElem, type);
      }
    };
    goDiagonallyBottomRight = (elem, type) => {
      const row = parseInt(elem.dataset.row) + 1;
      const column = parseInt(elem.dataset.column) + 1;
      if (row < 0 || row > 7 || column < 0 || column > 7) {
        return;
      } else {
        const lowerElem = document.getElementById(`${row}-${column}`);
        if (type === "set") {
          lowerElem.classList.add("highlighted-square");
        } else {
          lowerElem.classList.remove("highlighted-square");
        }

        this.goDiagonallyBottomRight(lowerElem, type);
      }
    };
    goDiagonallyBottomLeft = (elem, type) => {
      const row = parseInt(elem.dataset.row) + 1;
      const column = parseInt(elem.dataset.column) - 1;
      if (row < 0 || row > 7 || column < 0 || column > 7) {
        return;
      } else {
        const lowerElem = document.getElementById(`${row}-${column}`);
        if (type === "set") {
          lowerElem.classList.add("highlighted-square");
        } else {
          lowerElem.classList.remove("highlighted-square");
        }
        this.goDiagonallyBottomLeft(lowerElem, type);
      }
    };

    resetStyle = () => {
      this.highlightDiagonals("reset");
    };
  }
  new ChessBoard();
}
main();
