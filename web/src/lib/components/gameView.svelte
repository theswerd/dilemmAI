<script lang="ts">
	import { socketStore } from '$lib/stores/socketState';
	import type { Agent, OneVOne } from '$lib/types';
	import { onMount } from 'svelte';
	import type { Interaction, Player, PlayerSession } from '$lib/types';

	import Sidebar from './sidebar.svelte';
	export let game: OneVOne | undefined;
	export let interactions: Interaction[];
	$: generatedInteractions = interactions.map((interaction) => ({
		left:
			interaction.decisions.find((decision) => decision.agentID === game?.agents[0].agentID)
				?.decision == 'cooperate'
				? 'rgb(134, 185, 83);'
				: 'rgb(234, 64, 37);',
		right:
			interaction.decisions.find((decision) => decision.agentID === game?.agents[1].agentID)
				?.decision == 'cooperate'
				? 'rgb(134, 185, 83);	'
				: 'rgb(234, 64, 37);'
	}));
</script>

{#if game}
	<div class="grid h-screen w-screen grid-cols-[1fr_1fr_1fr]">
		<div class="h-screen">
			<Sidebar agent={game?.agents[0]} />
		</div>
		<div class="h-screen w-full bg-gray-200">
			<div class="flex flex-col overflow-scroll p-4">
				{#if generatedInteractions.length > 0}
					{#each generatedInteractions as interaction}
						<!-- circle with color -->
						<div class="flex h-24 flex-row justify-evenly">
							<div
								class="aspect-square h-full rounded-full"
								style={`background-color: ${interaction.left}`}
							></div>
							<div
								class="aspect-square h-full rounded-full"
								style={`background-color: ${interaction.right}`}
							></div>
						</div>
						<div class="m-8" />
					{/each}
				{:else}
					<p>Loading AI actions...</p>
				{/if}
			</div>
		</div>
		<div>
			<Sidebar agent={game?.agents[1]} />
		</div>
	</div>
{:else}
	<div class="flex h-screen w-screen items-center justify-center">
		<div class="text-2xl">Waiting for game to start...</div>
	</div>
{/if}
