<script lang="ts">
	import MainNav from '$lib/components/mainNav.svelte';
	import type { Player } from '$lib/types';

	type MatchHistory = {
		opponent: Player;
		result: 'increase' | 'decrease' | 'draw';
	}[];

	const examplePlayers = [
		{
			id: '1',
			name: 'Player 1',
			score: 100,
			matchHistories: [
				{
					opponent: {
						id: '2',
						name: 'Player 2',
						score: 109
					},
					result: 'increase'
				},
				{
					opponent: {
						id: '3',
						name: 'Player 3',
						score: 130
					},
					result: 'increase'
				},
				{
					opponent: {
						id: '4',
						name: 'Player 4',
						score: 123,
						matchHistories: []
					},
					result: 'decrease'
				}
			]
		},
		{
			id: '2',
			name: 'Player 2',
			score: 100,
			matchHistories: [
				{
					opponent: {
						id: '1',
						name: 'Player 1',
						score: 91
					},
					result: 'decrease'
				},
				{
					opponent: {
						id: '3',
						name: 'Player 3',
						score: 102,
						matchHistories: []
					},
					result: 'increase'
				},
				{
					opponent: {
						id: '4',
						name: 'Player 4',
						score: 107
					},
					result: 'increase'
				}
			]
		},
		{
			id: '3',
			name: 'Player 3',
			score: 100,
			matchHistories: [
				{
					opponent: {
						id: '1',
						name: 'Player 1',
						score: 79
					},
					result: 'decrease'
				},
				{
					opponent: {
						id: '2',
						name: 'Player 2',
						score: 67,
						matchHistories: []
					},
					result: 'decrease'
				},
				{
					opponent: {
						id: '4',
						name: 'Player 4',
						score: 72
					},
					result: 'increase'
				}
			]
		},
		{
			id: '4',
			name: 'Player 4',
			score: 100,
			matchHistories: [
				{
					opponent: {
						id: '1',
						name: 'Player 1',
						score: 107
					},
					result: 'increase'
				},
				{
					opponent: {
						id: '2',
						name: 'Player 2',
						score: 102,
						matchHistories: []
					},
					result: 'decrease'
				},
				{
					opponent: {
						id: '3',
						name: 'Player 3',
						score: 97
					},
					result: 'decrease'
				}
			]
		}
	];

	const totalScores = examplePlayers.map((player) =>
		player.matchHistories[1].opponent.score.toString()
	);
	// make a 4 * 4 array
	let data: any[][] = Array.from({ length: 5 }, () => Array.from({ length: 6 }, () => ''));
	data[0] = [
		'',
		{ color: '#F9E05A', emoji: '⭐' },
		{ color: '#8DFCBC', emoji: '🤗' },
		{ color: '#FF0000', emoji: '👬' },
		{ color: '#e18bf7', emoji: '👁️‍🗨️' }
	];
	data[1][0] = { color: '#F9E05A', emoji: '⭐' };
	data[2][0] = { color: '#8DFCBC', emoji: '🤗' };
	data[3][0] = { color: '#FF0000', emoji: '👬' };
	data[4][0] = { color: '#e18bf7', emoji: '👁️‍🗨️' };

	data[0][5] = 'Total Score';
	data[1][5] = totalScores[0];
	data[2][5] = totalScores[1];
	data[3][5] = totalScores[2];
	data[4][5] = totalScores[2];

	console.log(data);
	examplePlayers.map((player, i) => {
		examplePlayers.map((opponent, j) => {
			if (i === j) {
				data[i + 1][j + 1] = '-';
			} else {
				data[i + 1][j + 1] =
					player.matchHistories.find((m) => parseInt(m.opponent.id) === j + 1)?.result || 'N/A';
			}
		});
	});

	console.log(data);
</script>

<div class="flex h-screen w-full flex-col items-center justify-center">
	<MainNav class="absolute top-2 h-[50px] border-b px-5" />
	<h1 class="mb-4 text-2xl font-bold">Leader Board</h1>
	<div class="grid-table">
		{#each data as row, i}
			{#each row as cell, j}
				<div class={i === 0 || j === 0 ? 'grid-cell header-cell' : 'grid-cell data-cell'}>
					{#if cell === 'increase'}
						<span class="icon win">&#x25B2;</span> <!-- Triangle pointing up -->
					{:else if cell === 'decrease'}
						<span class="icon loss">&#x25BC;</span> <!-- Triangle pointing down -->
					{:else if cell === 'draw'}
						<span class="icon draw">&#x25CF;</span> <!-- Circle -->
					{:else if (i === 0 || j === 0) && cell.emoji}
						<div
							class=" flex aspect-square h-16 w-16 items-center justify-center rounded-full border-2 text-4xl"
							style={`background-color: ${cell.color};`}
						>
							{cell.emoji}
						</div>
					{:else}
						{cell}
					{/if}
				</div>
			{/each}
		{/each}
	</div>
	<h1 style="font-family: 'Comic Sans MS', cursive;" class="pt-3 text-xl font-bold italic">
		PLAYER 1 WINS!
	</h1>
</div>

<!-- <div class="flex h-screen w-full flex-col items-center justify-center">
	<h1>Leader Board</h1>
	<div class="grid-table">
		{#each data as row, i}
			{#each row as cell, j}
				<div class={i === 0 || j === 0 ? 'grid-cell header-cell' : 'grid-cell data-cell'}>
					{#if cell === 'increase'}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							color="green"
							width="1.5em"
							height="1.5em"
							viewBox="0 0 24 24"
							{...$$props}
							><path
								fill="currentColor"
								d="M1 21h4V9H1zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57l.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73z"
							/></svg
						>
					{:else if cell === 'decrease'}
						<svg
							color="red"
							xmlns="http://www.w3.org/2000/svg"
							width="1.5em"
							height="1.5em"
							viewBox="0 0 24 24"
							{...$$props}
							><path
								fill="currentColor"
								d="M3 16q-.8 0-1.4-.6T1 14v-2q0-.175.037-.375t.113-.375l3-7.05q.225-.5.75-.85T6 3h8q.825 0 1.413.587T16 5v10.175q0 .4-.162.763t-.438.637l-5.425 5.4q-.375.35-.887.425t-.988-.175q-.475-.25-.687-.7t-.088-.925L8.45 16zM20 3q.825 0 1.413.588T22 5v9q0 .825-.587 1.413T20 16q-.825 0-1.412-.587T18 14V5q0-.825.588-1.412T20 3"
							/></svg
						>
					{:else if cell === 'draw'}
						🔵
					{:else}
						{cell}
					{/if}
				</div>
			{/each}
		{/each}
	</div>
</div>

<style>
	.grid-table {
		display: grid;
		grid-template-columns: repeat(4, 1fr); /* 4 columns, including the row names */
		gap: 0.5rem; /* Space between cells */
		max-width: 600px; /* Adjust based on your needs */
		margin: auto;
	}
	.grid-cell {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 8px;
		background-color: #f0f0f0; /* Background color for cells */
		border: 1px solid #ccc;
	}
	.header-cell {
		font-weight: bold;
		background-color: #d9e2ec; /* Different background color for headers */
	}
	.data-cell {
		background-color: #ffffff; /* Background color for data cells */
	}
</style> -->

<style>
	.grid-table {
		display: grid;
		grid-template-columns: repeat(6, minmax(120px, 1fr));
		gap: 0.5rem;
		max-width: 800px;
		margin: 20px;
	}
	.grid-cell {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		background-color: #f0f0f0;
		border: 1px solid #ccc;
		min-height: 50px;
	}
	.header-cell {
		background-color: #ffffff;
		color: #ffffff;
		font-weight: bold;
		border: 0px;
		/* @apply rounded-md border border-gray-500; */
	}
	.data-cell {
		background-color: #ffffff;
		@apply rounded-md;
	}
	.icon {
		display: inline-block;
		font-size: 28px;
		line-height: 1;
	}
	.win {
		color: #4caf50; /* Green */
	}
	.loss {
		color: #f44336; /* Red */
	}
	.draw {
		color: #2196f3; /* Blue */
	}
</style>
