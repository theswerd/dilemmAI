<script lang="ts">
	import AboutGame from '$lib/components/aboutGame.svelte';
	import MainNav from '$lib/components/mainNav.svelte';
	import TournamentPrize from '$lib/components/tournamentPrize.svelte';
	import Welcome from '$lib/components/welcome.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="flex h-[100vh] w-full flex-col overflow-y-scroll">
	<MainNav class="top-2 h-[50px] px-5" />
	<Welcome availableAgents={data.acc.agents}/>
	<AboutGame />
	<TournamentPrize />
</main>
