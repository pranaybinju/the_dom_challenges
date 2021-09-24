const createProgressBar = () => {
  const outerBar = document.createElement("div");
  const innerBar = document.createElement("div");
  outerBar.id = "outer";
  outerBar.style.height = 50;
  outerBar.style.width = 400;
  outerBar.style.backgroundColor = "#f2f2f2";
  innerBar.id = "inner";
  innerBar.style.width = 0;
  innerBar.style.backgroundColor = "green";
  innerBar.style.height = 50;
  innerBar.style.transition = "width 1s";
  innerBar.style.position = "relative";
  outerBar.appendChild(innerBar);
  root.appendChild(outerBar);
};
function throttle(func) {
  let isCooling = false;
  let stash = [];

  function setCooling() {
    isCooling = false;
    if (stash.length) {
      const poppedVal = stash.pop();
      isCooling = true;
      poppedVal();
      setTimeout(setCooling, 12000);
    }
  }
  return function () {
    if (isCooling) {
      stash.push(func);
      console.log(stash);
      return;
    } else {
      isCooling = true;
      func();
      setTimeout(setCooling, 12000);
      return;
    }
  };
}

const throttledFun = throttle(updateProgress);

function updateProgress() {
  const innerBar = document.getElementById("inner");
  let width = 1;
  const interval = setInterval(() => {
    if (width > 10) {
      clearInterval(interval);
      innerBar.style.width = 0;
      return;
    } else {
      innerBar.style.width = `${width * 10}%`;
      width += 1;
    }
  }, 1000);
}
function main() {
  const root = document.getElementById("root");
  console.log(root);

  createProgressBar();
}
main();
