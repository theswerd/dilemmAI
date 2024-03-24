<script lang="ts">
	import { goto } from '$app/navigation';
	import SpinnerUi from '$lib/components/spinner_ui.svelte';
	import { socketStore } from '$lib/stores/socketState';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	onMount(async () => {
		// get agent_id
		const urlParams = new URLSearchParams(window.location.search);
		const agent_id = urlParams.get('agent_id');
		if (!agent_id) {
			console.error('No agent_id provided');
			goto('/create-agent');
		}
		// sleep 2 seconds
		await new Promise((resolve) => setTimeout(resolve, 2000));
		await socketStore.connect();
	});
</script>

{#if $socketStore.isConnected}
	<SpinnerUi
		center_item={{ emoji: data.agent.agentEmoji, color: data.agent.agentColor }}
		outside_items={[
			{ emoji: undefined, color: '#bbbbbb', gscale: true },
			{ emoji: undefined, color: '#bbbbbb', gscale: true },
			{ emoji: undefined, color: '#bbbbbb', gscale: true }
		]}
	/>
{:else}
	<div
		class="transition-ease relative flex h-screen w-screen items-center justify-center text-center"
	>
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
