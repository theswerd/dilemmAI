<script lang="ts">
	import SpinnerUI from '$lib/components/spinner_ui.svelte';
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
		}
	];
	const initial_angle = 0.3;
	const radius = 100; // Define a radius for the circular pattern
	const positions = opponents.map((_, i) => {
		const angle = (i / opponents.length) * Math.PI * 2 + initial_angle;
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
	<SpinnerUI
		center_item={user_profile}
		outside_items={[
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
			}
		]}
	/>
	<p class="text-muted-foreground absolute bottom-12 left-1/2 -translate-x-1/2 text-xl">
		Tournament Starts Soon...
	</p>
</div>
