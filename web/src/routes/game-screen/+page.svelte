<script>
	const player1State = {
		name: 'Player 1',
		emoji: '🌲',
		coins: 100
	};

	const player2State = {
		name: 'Player 2',
		emoji: '🎬',
		coins: 5
	};
	const currentRound = 1;
</script>

<div class="container">
	<div class="first-component">
		<div class="player-state">
			<h1>{player1State.name}</h1>
			<p>{player1State.emoji}</p>
			<p>{player1State.coins} coins</p>
		</div>
		<div class="board-container">
			<h1 class="text-center">Round: {currentRound}</h1>
			<div class="board">the board itself</div>
		</div>
		<div class="player-state">
			<h1>{player2State.name}</h1>
			<p>{player2State.emoji}</p>
			<p>{player2State.coins} coins</p>
		</div>
	</div>
	<div class="second-component">
		<!-- Your second component's content goes here -->
		chat
	</div>
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		height: 100vh; /* Use the full viewport height */
	}

	.first-component {
		flex: 0 0 70%; /* Takes up 70% of the width */
		display: flex;
		align-items: center; /* Center children vertically */
		justify-content: space-between; /* Distribute children with space between */
		padding: 0 10px;
		background-color: lightblue; /* Just for visibility, remove as needed */
	}

	.board-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		width: 50%; /* Set the width of the board container */
		@apply bg-gray-400;
	}

	.board {
		background-color: gray;
		height: 80%; /* Set the board height to 80% of its container */
		margin: 0 auto; /* Center the board horizontally */
		display: flex;
		justify-content: center; /* Horizontally center content within the board */
		align-items: center; /* Vertically center content within the board */
		background-color: yellow; /* Just for visibility, remove as needed */
	}

	.second-component {
		flex: 1; /* Takes up the remaining space */
		display: flex;
		align-items: center; /* Center content vertically */
		justify-content: center; /* Center content horizontally */
		background-color: lightcoral; /* Just for visibility, remove as needed */
	}

	.player-state {
		margin-top: 10px; /* Adjust as needed */
	}
</style>
