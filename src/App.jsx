import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import { useState } from "react";

const PLAYERS = [
	{ name: "Player 1", symbol: "X" },
	{ name: "Player 2", symbol: "O" },
];

const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function deriveGameBoard(gameTurns) {
	let gameBoard = [...INITIAL_GAME_BOARD.map((innerArr) => [...innerArr])];

	for (const turn of gameTurns) {
		gameBoard[turn.square.row][turn.square.col] = turn.player;
	}
	return gameBoard;
}

function deriveWinner(gameBoard, players) {
	let winner;

	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
			gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol =
			gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol =
			gameBoard[combination[2].row][combination[2].column];

		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = players.find(
				(player) => player.symbol === firstSquareSymbol
			)?.name;
		}
	}
	return winner;
}

function deriveActivePlayer(gameTurns) {
	let currentPlayer = "X";
	if (gameTurns[0]?.player === "X") currentPlayer = "O";
	return currentPlayer;
}

function App() {
	const [players, setPlayers] = useState(PLAYERS);

	const [gameTurns, setGameTurns] = useState([]);

	let activePlayer = deriveActivePlayer(gameTurns);
	const gameBoard = deriveGameBoard(gameTurns);
	const winner = deriveWinner(gameBoard, players);
	const draw = gameTurns.length === 9 && !winner;

	function handleSelectSquare(rowIndex, colIndex) {
		setGameTurns((prevTurns) => {
			let currentPlayer = deriveActivePlayer(prevTurns);
			const updatedTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
				...prevTurns,
			];
			return updatedTurns;
		});
	}

	function resetGame() {
		setGameTurns([]);
	}

	function handlePlayerNameChange(symbol, name) {
		setPlayers((prevPlayers) =>
			prevPlayers.map((player) =>
				player.symbol === symbol ? { ...player, name } : player
			)
		);
	}

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					{players.map((player) => (
						<Player
							key={player.symbol}
							initialName={player.name}
							symbol={player.symbol}
							className={activePlayer == player.symbol ? "active" : ""}
							changeName={handlePlayerNameChange}
						/>
					))}
				</ol>
				{(winner || draw) && <GameOver winner={winner} rematch={resetGame} />}
				<GameBoard board={gameBoard} onSelectSquare={handleSelectSquare} />
			</div>
			<Log turns={gameTurns} players={players} />
		</main>
	);
}

export default App;
