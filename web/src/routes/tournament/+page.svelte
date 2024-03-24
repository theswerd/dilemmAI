<script lang="ts">
	import { goto } from '$app/navigation';
	import SpinnerUi from '$lib/components/spinner_ui.svelte';
	import { socketStore } from '$lib/stores/socketState';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { v4 } from 'uuid';
	import type { Agent, Player, PlayerSession } from '$lib/types';
	export let data: PageData;
	let queue: Partial<Agent & { gscale?: boolean }>[] = generate_queue([]);
	let state:'queue' | 'tournament'| 'summary' = "queue";
	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const agent_id = urlParams.get('agent_id');
		if (!agent_id) {
			console.error('No agent_id provided');
			goto('/create-agent');
		}
		// sleep 2 seconds
		await new Promise((resolve) => setTimeout(resolve, 2000));
		await socketStore.connect();
		// socketStore.listen('error', (data) => {
		// 	alert('Error: ' + JSON.stringify(data));
		// 	goto('/');
		// });

		// on disconnect

		socketStore.listen('queueUpdate', (data) => {
			queue = generate_queue(data as unknown as Partial<Agent>[]);
		});

		socketStore.listen('tournamentStart', () => {
			alert('Tournament started');
			state = 'tournament';
		});

		socketStore.send('selectAgent', {
			player: {
				id: v4()
			},
			agent: data.agent
		} as Pick<PlayerSession, 'agent' | 'player'>);
	});

	function generate_queue(baseQueue: Partial<Agent & { gscale?: boolean }>[]) {
		const queue = baseQueue.map((player) => {
			return {
				agentID: player.agentID,
				agentEmoji: player.agentEmoji,
				agentColor: player.agentColor,
				gscale: false
			};
		});
		while (queue.length < 3) {
			queue.push({ agentID: v4(), agentEmoji: undefined, agentColor: '#bbbbbb', gscale: true });
		}
		return queue;
	}
</script>

{#if $socketStore.isConnected}
	{#if state === 'queue'}
		
	<div class="h-screen w-screen overflow-hidden">
		<h1 class="m-8 mb-[220px] animate-pulse text-center text-3xl font-extrabold">
			Searching for collaborators... or decievers
		</h1>
		<SpinnerUi
			center_item={{ emoji: data.agent.agentEmoji, color: data.agent.agentColor }}
			outside_items={queue}
		/>
	</div>
	{:else if state === 'tournament'}
		<div class="h-screen w-screen overflow-hidden">
			<h1 class="m-8 mb-[220px] animate-pulse text-center text-3xl font-extrabold">
				Playing the game...
			</h1>
			
		</div>
	{:else}
		<div class="h-screen w-screen overflow-hidden">
			<h1 class="m-8 mb-[220px] animate-pulse text-center text-3xl font-extrabold">
				Results are in...
			</h1>
			<SpinnerUi
				center_item={{ emoji: data.agent.agentEmoji, color: data.agent.agentColor }}
				outside_items={queue}
			/>
		</div>
	{/if}
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
