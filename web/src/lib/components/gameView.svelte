<script lang="ts">
	import { socketStore } from '$lib/stores/socketState';
	import type { Agent, OneVOne } from '$lib/types';
	import { onMount } from 'svelte';
	import type { Interaction, Player, PlayerSession } from '$lib/types';

	import Sidebar from './sidebar.svelte';
	export let game: OneVOne | undefined;
	export let interactions: Interaction[];
</script>

{#if game}
	<div class="grid h-screen w-screen grid-cols-[1fr_1fr_1fr]">
		<div class="h-screen">
			<Sidebar agent={game?.agents[0]} />
		</div>
		<div class="h-screen w-full bg-gray-200">
			{JSON.stringify(interactions)}

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
