<script>
	let user_profile = {
		emoji: '🌲',
		color: '#f9f9f9'
	};

	let opponents = [
		{
			emoji: '🪜',
			color: '#b5a9f9'
		},
		{
			emoji: '👁️‍🗨️',
			color: '#f9f9f9'
		},
		{
			emoji: '😮',
			color: '#f9f9f9'
		},
		{
			emoji: '📚',
			color: '#f9f9f9'
		}
	];

	const radius = 100; // Define a radius for the circular pattern
	const positions = opponents.map((_, i) => {
		const angle = (i / opponents.length) * Math.PI * 2;
		const x = Math.cos(angle) * radius;
		const y = Math.sin(angle) * radius;
		return { x, y };
	});
</script>

<div class="screen-center">
	<div class="container">
		<div class="center" style="background: {user_profile.color};">
			{user_profile.emoji} User Profile
		</div>
		{#each opponents as opponent, i (opponent.emoji)}
			<div
				class="opponent"
				style="
          left: {50 + positions[i].x}%; 
          top: {50 + positions[i].y}%;
          background: {opponent.color};
        "
			>
				Opponent {i + 1}: {opponent.emoji}
			</div>
		{/each}
	</div>
</div>

<style>
	.screen-center {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.container {
		position: relative;
		width: 300px; /* Adjust as needed */
		height: 300px; /* Adjust as needed */
		border-radius: 50%;
		background: #ddd; /* Background color for visibility */
		/* Centering content within the container */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.center {
		/* Additional styles for your central element */
	}

	.opponent {
		position: absolute;
		transform: translate(-50%, -50%);
		/* Additional styles for your opponent elements */
	}
</style>
