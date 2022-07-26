const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMassageTextElement = document.querySelector("[data-winning-massage-text]");
const winningMassage = document.querySelector ('[data-winning-massage]');
const restartButton = document.querySelector('[data-restart-button]');
let isCircleTurn;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const startGame = () => {
  isCircleTurn = false;



  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click",handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass ();
  winningMassage.classList.remove('show-winning-massage');
};
const endGame = (isDraw) => {
if (isDraw) {
  winningMassageTextElement.innerText = 'Empate!';
} else {
winningMassageTextElement.innerText = isCircleTurn
? 'O Venceu!' 
: 'X Venceu!';
}
winningMassage.classList.add('show-winning-massage');

};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};
const checkForDraw = () => {
  return [...cellElements].every((cell) => {
   return cell.classList.contains('x') || cell.classList.contains('circle');
   });
  };
const placeMark = (cell, classToadd) => {
  cell.classList.add(classToadd);
};

  
const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};


const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  setBoardHoverClass();
};

const handleClick = (e) => {
  //colocar o marca (x ou Circulo)
  const cell = e.target;
  const classToadd = isCircleTurn ? "circle" : "x";
  placeMark(cell, classToadd);

  // verificar por vitoria
  const isWin = checkForWin(classToadd);
 
   // vereficar por empate
  const isDraw = checkForDraw();
  if (isWin) {
    endGame(false);
  } else if (isDraw){
    endGame(true);
  }else{
    swapTurns();
  }
};

  //mudar o simbolo
 
startGame();

restartButton.addEventListener("click",startGame);
