<script lang="ts">

	export let center_item: {
        emoji: string;
        color: string;

    };
	export let outside_items: {
        emoji?: string;
        color: string;
        gscale?:boolean;
    }[]
	const initial_angle = 0.3;
	const radius = 100; // Define a radius for the circular pattern
	const positions = outside_items.map((_, i) => {
		const angle = (i / outside_items.length) * Math.PI * 2 + initial_angle;
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

<div class="screen-center relative">
    <div
        class=" absolute left-1/2 top-1/2 aspect-square h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-gray-500"
    />

    <div
        class="container"
        style="background: {center_item.color}; border-color: {getBorderColor(
            center_item.color
        )};border-width: 4px;"
    >
        <div class="center rounded-full">
            <span class="text-[180px]">{center_item.emoji}</span>
        </div>
        <div class=" w-full h-full absolute forward_r">
            {#each outside_items as opponent, i}
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
                    <span class="text-[69px] backward_r" class:gscale={opponent.gscale}>{opponent.emoji ?? "⌛"}</span>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>

	.forward_r {
		animation: spinny 20s ease-in-out infinite;
	}

	.backward_r {
		animation: spinny_backward 20s ease-in-out infinite;

	}

    .gscale {
        filter: grayscale(100%);
    }

	@keyframes spinny {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	
	}

	@keyframes spinny_backward {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	
	}
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
