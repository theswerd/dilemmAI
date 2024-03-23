<script lang="ts">
	import { cn } from '$lib/utils';

	let user_profile = {
		emoji: '🌲',
		color: '#813584'
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
			color: '#1F2430'
		},
		{
			emoji: '📚',
			color: '#6D183D'
		},
		{
			emoji: '🎬',
			color: '#9BE9FC'
		},
		{
			emoji: '✅',
			color: '#813584'
		}
	];

	const radius = 100; // Define a radius for the circular pattern
	const positions = opponents.map((_, i) => {
		const angle = (i / opponents.length) * Math.PI * 2;
		const x = Math.cos(angle) * radius;
		const y = Math.sin(angle) * radius;
		return { x, y };
	});

	function getBorderColor(backgroundColor: string) {
		// This is a very simplistic approach that inverts the color for the border.
		// For a more sophisticated approach, you'd need a full color manipulation library.
		const color = backgroundColor.replace('#', '');
		const r = parseInt(color.substring(0, 2), 16);
		const g = parseInt(color.substring(2, 4), 16);
		const b = parseInt(color.substring(4, 6), 16);

		// Calculate the average brightness of the background color
		const brightness = (r + g + b) / 3;
		// If the color is bright, return a darker shade for the border, else a lighter shade
		return brightness > 128 ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)';
	}
</script>

<div class="h-full w-full">
	<div class="mt-10 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
		Waiting Room
	</div>
	<div class="screen-center relative">
		<div
			class=" absolute left-1/2 top-1/2 aspect-square h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-gray-500"
		/>

		<div
			class="container"
			style="background: {user_profile.color}; border-color: {getBorderColor(
				user_profile.color
			)};border-width: 4px;"
		>
			<div class="center rounded-full">
				<span class="text-[80px]">{user_profile.emoji}</span>
			</div>
			{#each opponents as opponent, i (opponent.emoji)}
				<div
					class="opponent aspect-square rounded-full p-8"
					style="
          left: {50 + positions[i].x}%;
          top: {50 + positions[i].y}%;
          background: {opponent.color};
          border-color: {getBorderColor(opponent.color)};
          border-width: 3px;
        "
				>
					<span class="text-[69px]">{opponent.emoji}</span>
				</div>
			{/each}
		</div>
	</div>
	<p class="text-muted-foreground absolute bottom-12 left-1/2 -translate-x-1/2 text-xl">
		Tournament Starts Soon...
	</p>
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
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.center {
		/* Ensure this is also a circle and can contain the emoji */
		width: 100px; /* Adjust as needed */
		height: 100px; /* Adjust as needed */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.opponent {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translate(-50%, -50%);
		border-radius: 50%; /* This makes it a circle */
		overflow: hidden; /* Ensures content doesn't spill outside the circle */
	}
</style>
