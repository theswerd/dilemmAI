<script lang="ts">
	import SpinnerUi from '$lib/components/spinner_ui.svelte';
import { socketStore } from '$lib/stores/socketState';
	import { onMount } from 'svelte';

	onMount(async () => {
        // sleep 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
		await socketStore.connect();
	});
</script>

{#if $socketStore.isConnected}
	<SpinnerUi 
        center_item={{ emoji: '🌲', color: '#ff00ff' }}
        outside_items={[
            { emoji: undefined, color: '#bbbbbb' , gscale: true},
            { emoji: undefined, color: '#bbbbbb', gscale: true },
            { emoji: '😮', color: '#1F2430' }
        ]}
    
    />
{:else}
	<div class="transition-ease relative flex h-screen w-screen items-center justify-center text-center">
		{#each new Array(10) as _, i}
			<div
				class="condenser absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-[1px] border-gray-200 bg-white shadow-md"
				style={`height: ${900 - i * 70}px`}
			></div>
		{/each}
		<h1 class="animate-pulse text-3xl">Connecting...</h1>
	</div>
{/if}

<style>
	.condenser {
		animation: condense 5s infinite;
	}

	@keyframes condense {
		0% {
			scale: 1;
			rotate: 0deg;
		}
		50% {
			scale: 0.99;
		}
		100% {
			scale: 1;
			rotate: 360deg;
		}
	}
</style>
