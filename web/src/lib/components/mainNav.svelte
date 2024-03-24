<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { login, logout, initializeAuth0, isAuthenticated } from '$lib/auth';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	let className: string | undefined | null = undefined;
	export { className as class };

	onMount(async () => {
		await initializeAuth0();
	});
</script>

<nav class={cn('flex w-full items-center justify-between p-4 ', className)}>
	<div class="flex items-center justify-center space-x-3">
		<img src={`${base}/IMG_8798.png`} alt="logo" class="h-8 w-8" />
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
		{#if $isAuthenticated}
			<button on:click={logout} class="hover:text-primary text-sm font-medium transition-colors">
				Logout
			</button>
		{:else}
			<button
				on:click={async () => {
					await login();
				}}
				class="hover:text-primary text-sm font-medium transition-colors"
			>
				Login
			</button>
		{/if}
	</div>
</nav>
