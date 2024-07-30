import { useState } from "react";

export default function Player({ initialName, symbol, changeName, ...props }) {
	const [name, setName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);

	function handleClick() {
		if (isEditing) {
			changeName(symbol, name);
		}
		setIsEditing((prev) => !prev);
	}

	function handleChange(event) {
		setName(event.target.value);
	}

	return (
		<li {...props}>
			<span className="player">
				{isEditing ? (
					<input type="text" required value={name} onChange={handleChange} />
				) : (
					<span className="player-name">{name}</span>
				)}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
		</li>
	);
}
