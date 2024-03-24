<script lang="ts">
	import { goto } from '$app/navigation';
	import MainNav from '$lib/components/mainNav.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	import { login, isAuthenticated} from "$lib/auth";

	$: if (!$isAuthenticated) {
		login();
	}


	let examples = [
		{
			agentEmoji: '🤖',
			agentID: '1',
			agentColor: '#FF0000',
			inputStrategy: 'Random'
		},
		{
			agentEmoji: '🤖',
			agentID: '2',
			agentColor: '#00FF00',
			inputStrategy: 'Random'
		},
		{
			agentEmoji: '🤖',
			agentID: '4',
			agentColor: '#0000FF',
			inputStrategy: 'Random'
		},
		{
			agentEmoji: '🤖',
			agentID: '5',
			agentColor: '#FF00FF',
			inputStrategy: 'Random'
		},
		{
			agentEmoji: '🤖',
			agentID: '6',
			agentColor: '#FFFF00',
			inputStrategy: 'Random'
		},
		{
			agentEmoji: '🤖',
			agentID: '7',
			agentColor: '#00FFFF',
			inputStrategy: 'Random'
		},
		{
			agentEmoji: '🤖',
			agentColor: '#FF0000',
			agentID: '8',
			inputStrategy: 'Random'
		},
		{
			agentEmoji: '🤖',
			agentID: '9',
			agentColor: '#00FF00',
			inputStrategy: 'Random'
		},
		{
			agentID: '10',
			agentEmoji: '🤖',
			agentColor: '#0000FF',
			inputStrategy: 'Random'
		},
		{
			agentEmoji: '🤖',
			agentID: '11',
			agentColor: '#FF00FF',
			inputStrategy: 'Random'
		},
		{
			agentEmoji: '🤖',
			agentColor: '#FFFF00',
			inputStrategy: 'Random',
			agentID: '12'
		},
		{
			agentEmoji: '🤖',
			agentID: '13',
			agentColor: '#00FFFF',
			inputStrategy: 'Random'
		},
		{
			agentEmoji: '🤖',
			agentID: '14',
			agentColor: '#FF0000',
			inputStrategy: 'Random'
		},
		{
			agentEmoji: '🤖',
			agentID: '15',
			agentColor: '#00FF00',
			inputStrategy: 'Random'
		},
		{
			agentEmoji: '🤖',
			agentID: '16',
			agentColor: '#0000FF',
			inputStrategy: 'Random'
		}
	];
	const numPerPage = 6;
	let page = 0;
</script>

<main>
	<MainNav class="top-2 h-[50px] px-5" />
	<div class="flex h-[calc(100vh-50px)] w-full items-center justify-center">
		<div
			class="relative flex max-h-[645px] w-full max-w-2xl flex-col overflow-y-scroll rounded-md border border-gray-500"
		>
			<div
				class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-4 text-lg font-bold"
			>
				<div class="w-full text-center">Your Agents</div>
			</div>
			{#if data.agents.length === 0}
				<div class="flex items-center justify-center p-4">
					You have no agents yet. Create one to get started!
				</div>
			{:else}
				<!-- {#each examples as agent, i (i)} -->
				{#each data.agents.slice(page * numPerPage, (page + 1) * numPerPage) as agent, i (i)}
					<div class="flex flex-row items-center justify-center border-b px-[30px]">
						<div class="flex w-1/2 justify-start p-2">
							<div
								class="flex aspect-square h-20 w-20 items-center justify-center rounded-full border-2 text-4xl"
								style={`background-color: ${agent.agentColor}; `}
							>
								{agent.agentEmoji}
							</div>
						</div>
						<div class="flex w-1/2 flex-col items-end justify-end p-2">
							<div class="text-md">Wins: 0</div>
							<div class="text-md">Loses: 0</div>
							<div class="w-full truncate text-sm font-light text-gray-400">
								#{agent.agentID}
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</main>
