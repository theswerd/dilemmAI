<script lang="ts">
	import { cn } from '$lib/utils.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Input } from './ui/input';
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<nav class={cn('flex w-full items-center justify-between ', className)}>
	<div class="flex items-center justify-center space-x-3">
		<!-- LOGO -->
		<Avatar.Root>
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<span class="">DilemmAI</span>
	</div>
	<div class="flex items-center justify-center space-x-4 lg:space-x-6">
		<a href="/examples/dashboard" class="hover:text-primary text-sm font-medium transition-colors">
			Home
		</a>

		<a
			href="/examples/dashboard"
			class="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
		>
			Tournament
		</a>
		<a
			href="/examples/dashboard"
			class="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
		>
			LeaderBoard
		</a>
		<Input type="search" placeholder="Search..." class="h-9 md:w-[100px] lg:w-[300px]" />
	</div>
</nav>
