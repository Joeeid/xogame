export default function Log({ turns, players }) {
	const playerNameLookup = players.reduce((acc, player) => {
		acc[player.symbol] = player.name;
		return acc;
	}, {});

	return (
		<ol id="log">
			{turns.map((turn) => (
				<li key={`${turn.square.row}${turn.square.col}`}>
					{playerNameLookup[turn.player]} selected {turn.square.row},
					{turn.square.col}
				</li>
			))}
		</ol>
	);
}
