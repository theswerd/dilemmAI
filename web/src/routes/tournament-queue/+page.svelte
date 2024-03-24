<script lang="ts">
	import { socketStore } from "$lib/stores/socketState";
	import { onMount } from "svelte";

    let connected = false;
    onMount(async() => {
        await socketStore.connect();
        connected = true;

    });
</script>
{#if connected}
    <h1>You are disconnected</h1>
{:else}
<h1>You are not connected</h1>
{/if}