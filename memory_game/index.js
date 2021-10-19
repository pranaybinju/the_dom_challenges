function main() {
  class MemoryGame {
    constructor() {
      this.root = document.getElementById("root");
      this.container = this.createBoxes();
      this.root.appendChild(this.container);
      this.stage = 1;
      this.playerTurn = false;
      this.hightlightOrder = [];
      this.currentClick = 0;
      this.beginStage();
    }

    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    createBoxes() {
      const boxParent = document.createElement("div");
      boxParent.classList.add("box-parent");
      for (let i = 0; i < 5; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.id = i;
        box.style.transition = "background-color 500ms ease";
        box.addEventListener("click", async (e) => {
          if (!this.playerTurn) {
            return;
          } else {
            this.currentClick++;
            if (
              this.hightlightOrder[this.currentClick - 1] !==
              parseInt(e.target.id)
            ) {
              e.target.classList.add("inCorrectBox");
              this.container.classList.add("shake");
            } else {
              await this.highlightBoxes(e.target.id);
              if (this.currentClick === this.stage) {
                this.currentClick = 0;
                this.hightlightOrder = [];
                this.stage++;
                this.playerTurn = !this.playerTurn;
                setTimeout(() => {
                  this.beginStage();
                }, 1500);
              }
            }
          }
        });
        boxParent.appendChild(box);
      }
      return boxParent;
    }

    async highlightBoxes(boxId) {
      const box = document.getElementById(boxId);

      box.classList.add("highlightedBox");
      return new Promise(function (resolve, reject) {
        setTimeout(async () => {
          await new Promise(function (resolve, reject) {
            box.classList.remove("highlightedBox");
            setTimeout(() => {
              resolve();
            }, 500);
          });

          resolve();
        }, 500);
      });
    }
    async beginStage() {
      console.log(this.container.childNodes);
      await new Promise((resolve, reject) => {
        for (let i = 0; i < 5; i++) {
          this.container.childNodes[i].classList.remove("correctBox");
        }
        resolve();
      });

      const blockArr = Array.from({ length: this.stage }, () =>
        Math.floor(Math.random() * 5)
      );
      for (let i = 0; i < blockArr.length; i++) {
        this.hightlightOrder = this.hightlightOrder.concat(blockArr[i]);
        await this.highlightBoxes(blockArr[i]);
      }
      console.log(this.hightlightOrder);
      this.playerTurn = !this.playerTurn;
    }
  }

  new MemoryGame();
}
main();
