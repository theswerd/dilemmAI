<!-- src/lib/Mermaid.svelte -->
<script>
	import { onMount } from 'svelte';
	import mermaid from 'mermaid';

	export let chart = '';

	onMount(() => {
		mermaid.initialize({ startOnLoad: true });
		mermaid.contentLoaded();
	});
</script>

<div class="mermaid w-[600px]">
	{chart}
</div>

<style>
	:global(.mermaid) {
		max-width: 100%;
		overflow-x: auto;
	}
</style>
