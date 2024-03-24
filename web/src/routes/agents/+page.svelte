<script lang="ts">
	import { goto } from '$app/navigation';
	import MainNav from '$lib/components/mainNav.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

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
			{#if data.acc.agents.length !== 0}
				<!-- {#each examples as agent, i (i)} -->
				{#each data.acc.agents.slice(page * numPerPage, (page + 1) * numPerPage) as agent, i (i)}
					<div class="flex flex-row items-center justify-center border-b px-[30px]">
						<div class="flex w-1/2 justify-start p-2">
							<div
								class="flex aspect-square h-20 w-20 items-center justify-center rounded-full border-2 text-4xl"
								style={`background-color: ${agent.agentColor}; `}
							>
								{agent.agentEmoji}
							</div>
						</div>
						<div class="flex items-center justify-end space-x-2">
							<div class="flex w-1/2 flex-col items-end justify-end p-2">
								<div class="text-md">Wins: 0</div>
								<div class="text-md">Loses: 0</div>
								<div class="w-full truncate text-sm font-light text-gray-400">
									#{agent.agentID}
								</div>
							</div>
							<button
								class="flex h-[40px] w-[40px] items-center justify-center rounded-full"
								style={`background-color: ${agent.agentColor}; `}
								on:click={() => {
									goto('/tournament-queue?agent_id=' + agent.agentID);
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="1.5em"
									height="1.5em"
									viewBox="0 0 24 24"
									><path
										fill="currentColor"
										d="m4.497 20.835l16.51-7.363c1.324-.59 1.324-2.354 0-2.944L4.497 3.164c-1.495-.667-3.047.814-2.306 2.202l3.152 5.904c.245.459.245 1 0 1.458l-3.152 5.904c-.74 1.388.81 2.87 2.306 2.202"
									/></svg
								>
							</button>
						</div>
					</div>
				{/each}
			{/if}
			<div class="flex items-center justify-center p-4">
				<button
					class="rounded-full border"
					on:click={() => {
						goto('/create-agent');
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M11 13H6q-.425 0-.712-.288T5 12q0-.425.288-.712T6 11h5V6q0-.425.288-.712T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.712-.288T11 18z"
						/></svg
					>
				</button>
			</div>
		</div>
	</div>
</main>
