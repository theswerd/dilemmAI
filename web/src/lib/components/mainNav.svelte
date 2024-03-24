<script lang="ts">
	import { cn } from '$lib/utils.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Input } from './ui/input';
	let className: string | undefined | null = undefined;
	import { page } from '$app/stores';

	export { className as class };
	$: console.log($page.url.pathname);
</script>

<nav class={cn('flex w-full items-center justify-between p-4 ', className)}>
	<div class="flex items-center justify-center space-x-3">
		<!-- LOGO -->
		<!-- <Avatar.Root>
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root> -->
		<span class="">DilemmAI</span>
	</div>
	<div class="flex items-center justify-center space-x-4 lg:space-x-6">
		<a
			href="/"
			class={cn(
				'hover:text-primary text-sm font-medium transition-colors',
				$page.url.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
			)}
		>
			Home
		</a>
		<a
			href="/leaderboard"
			class={cn(
				'hover:text-primary text-sm font-medium transition-colors',
				$page.url.pathname === '/leaderboard' ? 'text-primary' : 'text-muted-foreground'
			)}
		>
			LeaderBoard
		</a>
		<a
			href="/agents"
			class={cn(
				'hover:text-primary text-sm font-medium transition-colors',
				$page.url.pathname === '/agents' ? 'text-primary' : 'text-muted-foreground'
			)}
		>
			My Agents
		</a>
	</div>
</nav>
