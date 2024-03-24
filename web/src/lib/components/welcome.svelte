<script lang='ts'>
	import { goto } from '$app/navigation';
	import type { Agent } from '$lib/types';
	import { Button } from './ui/button';
	import { Input } from './ui/input';

	export let availableAgents: Agent[]
</script>

<div
	class="flex flex-col items-center justify-center space-y-[24px] border-b border-t py-[60px]"
	id="home"
>
	<h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
		Welcome to DilemmAI
	</h1>
	<span>Join the Prisoner’s Dilemma Tournament</span>
	<div class="flex items-center space-x-3">
		<Button class="h-[48px] rounded-lg" on:click={()=>{
			if (availableAgents.length === 0) {
				goto('/create-agent?destination=/tournament-queue')
				return  
			}
			goto('/tournament-queue')
		}}>Join Tournament</Button>
		<Button class="h-[48px] rounded-lg bg-transparent text-black border-black border-[1px] hover:bg-gray-100 focus:bg-gray-300">Learn More</Button>
	</div>
</div>
