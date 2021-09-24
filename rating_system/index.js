function main() {
  class RatingSystem {
    constructor() {
      this.stars = [];
      this.currentStar = -1;
      this.isClicked = false;
      this.root = document.getElementById("root");
      this.createRatingSystem();
    }

    onMouseOver = (e) => {
      const currIndex = e.target.dataset.index;

      for (let i = 0; i <= currIndex; i++) {
        if (i <= this.currentStar) {
        } else {
          this.stars[i].classList.remove("fa-star-o");
          this.stars[i].classList.add("fa-star");
        }
      }
    };

    onMouseOut = (e) => {
      const currIndex = e.target.dataset.index;
      for (let i = 0; i < 5; i++) {
        if (i <= this.currentStar) {
        } else {
          this.stars[i].classList.add("fa-star-o");
          this.stars[i].classList.remove("fa-star");
        }
      }
    };

    onClick = (e) => {
      const currIndex = e.target.dataset.index;
      this.currentStar = currIndex;
      for (let i = 0; i < 5; i++) {
        if (i <= currIndex) {
          this.stars[i].classList.remove("fa-star-o");
          this.stars[i].classList.add("fa-star");
        } else {
          this.stars[i].classList.add("fa-star-o");
        }
      }
    };
    createRatingSystem = () => {
      const ratingParent = document.createElement("div");
      ratingParent.style.display = "flex";
      ratingParent.style.flexDirection = "row";
      ratingParent.style.fontSize = "5rem";

      for (let i = 0; i < 5; i++) {
        this.stars[i] = document.createElement("i");

        this.stars[i].classList.add("fa");
        this.stars[i].classList.add("fa-7x");
        this.stars[i].classList.add("fa-star-o");
        this.stars[i].style.color = "gold";
        this.stars[i].style.cursor = "pointer";
        this.stars[i].dataset.index = i;
        this.stars[i].dataset.isClicked = false;
        this.stars[i].addEventListener("mouseover", this.onMouseOver);
        this.stars[i].addEventListener("mouseout", this.onMouseOut);
        this.stars[i].addEventListener("click", this.onClick);

        ratingParent.appendChild(this.stars[i]);
      }
      this.root.appendChild(ratingParent);
    };
  }

  new RatingSystem();
}
main();
