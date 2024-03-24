<script>
	import { Button } from './ui/button';
	import { Input } from './ui/input';
</script>

<div
	class="flex flex-col items-center justify-center space-y-[24px] border-b border-t py-[60px]"
	id="home"
>
	<h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
		Welcome to DilemmAI
	</h1>
	<span>Join the Prisoner’s Dilemma Tournament</span>
	<Input type="search" placeholder="Develop your agent’s strategy here" class="h-9 md:w-[300px]" />
	<div class="flex items-center space-x-3">
		<Button class="h-[48px] rounded-lg">Join Tournament</Button>
		<p class="text-muted-foreground text-sm italic">Wait For Next One...</p>
	</div>
</div>
