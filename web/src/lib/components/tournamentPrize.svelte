<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from './ui/button/button.svelte';
	import { base } from '$app/paths';

	const prizes = [
		{
			img: `${base}/gold.svg`,
			name: 'Gold Medal',
			des: '50 coins'
		},
		{
			img: `${base}/silver.svg`,
			name: 'Silver Medal',
			des: '50 coins'
		}
	];
</script>

<div
	class="flex w-full items-center justify-center space-x-[60px] border-b border-t px-[120px] py-[60px]"
>
	<div class="mr-[60px] flex flex-col items-start">
		<h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
			Tournament Prizes
		</h2>
		<span class="mt-[24px]">Compete for the top spot!</span>
		<p class="text-muted-foreground text-sm">See More Prizes {'->'}</p>
	</div>
	<Carousel.Root class="ml-[60px] max-w-sm">
		<Carousel.Content class="-ml-1">
			{#each prizes as prize, i (i)}
				<Carousel.Item class="md:basis-1/1 pl-1 lg:basis-1/2">
					<div class="p-1">
						<Card.Root>
							<Card.Content class="flex aspect-square flex-col items-center justify-center p-6">
								<img src={prize.img} alt="prize medal" />
								<span class="text-2xl font-semibold">{prize.name}</span>
							</Card.Content>
						</Card.Root>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
