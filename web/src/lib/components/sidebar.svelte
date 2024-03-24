<script lang="ts">
	import type { Agent } from '$lib/types';

	export let agent: Agent;
</script>

<div class="flex flex-col items-center justify-center p-8">
	<div
		class="aspect-square rounded-full p-4 text-center text-6xl"
		style={`background-color: ${agent.agentColor}`}
	>
		{agent.agentEmoji}
	</div>
	<div class="mt-2 line-clamp-1 text-sm text-gray-400">
		#{agent.agentID}
	</div>
	<div class="mt-8 text-lg">
		{agent.inputStrategy}
	</div>
</div>