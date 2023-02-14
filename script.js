const X_CLASS = 'x',
	CIRCLE_CLASS = 'circle',
	WINNING_COMBINATIONS = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
const cellElements = document.querySelectorAll('[data-cell]'),
	board = document.getElementById('board'),
	winningMessageElement = document.getElementById('winningMessage'),
	winningTextMessageElement = document.querySelector('[data-winning-message-text]'),
	restartButton = document.getElementById('restartButton');

let circleTurn;

startGame();

function startGame() {
	circleTurn = false;
	cellElements.forEach((cell) => {
		cell.classList.remove(X_CLASS);
		cell.classList.remove(CIRCLE_CLASS);
		cell.removeEventListener('click', handleClick);
		cell.addEventListener('click', handleClick, { once: true });
	});
	setBoardHoverClass();

	winningMessageElement.classList.remove('show');
}

restartButton.addEventListener('click', startGame);

function handleClick(e) {
	const cell = e.target,
		currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

	placeMark(cell, currentClass);
	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurns();
		setBoardHoverClass();
	}
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapTurns() {
	circleTurn = !circleTurn;
}

function setBoardHoverClass() {
	board.classList.remove(X_CLASS);
	board.classList.remove(CIRCLE_CLASS);

	if (circleTurn) {
		board.classList.add(CIRCLE_CLASS);
	} else {
		board.classList.add(X_CLASS);
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some((combination) => {
		return combination.every((index) => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}

function endGame(draw) {
	if (draw) {
		winningTextMessageElement.innerText = `Draw!`;
	} else {
		winningTextMessageElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
	}

	winningMessageElement.classList.add('show');
}

function isDraw() {
	return [...cellElements].every((cell) => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
	});
}
