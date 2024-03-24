<script lang="ts">
	import { base } from '$app/paths';
	import Mermaid from './mermaid.svelte';
	const chartDefinition: string = `
	flowchart TD
    C(Players make a choice: cooperate or defect)
    C -->|Both cooperate| D[Both earn 2 coins]
    C -->|One defects, one cooperates| T[Defector earns 3 coins, cooperator loses 1 coin]
    C -->|Both defect| W[Neither earns coins]
    D --> P
    T --> P
    W --> P
    P[Both players reassess]
    `;
</script>

<div class="flex h-[657px] w-full items-center justify-center space-x-5">
	<div class="max-w-[300px]">
		<h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
			About the Game
		</h2>
		<span>Play and learn the significance of cooperation in the Prisoner’s Dilemma</span>
	</div>
	<Mermaid chart={chartDefinition} />
</div>

<style>
	/* You can also define the height and other styles here if you prefer */
</style>
