<script lang="ts">
	import Spacer from '$lib/components/Spacer.svelte';
	import { Heading, P, Mark } from 'flowbite-svelte';
</script>

<section>
	<Spacer direction="vertical" spacing={15} />

	<Heading align="center" customSize="text-3xl font-extrabold  md:text-5xl lg:text-6xl">
		Welcome to Rarefy
	</Heading>

	<Spacer direction="vertical" spacing={30} />

	<P size="2xl" align="center"
		>The easiest way to track down and buy rare media from across the world.</P
	>
	<P size="2xl" align="center">You want it? <Mark>You got it</Mark></P>
</section>

<style>
	section {
		padding: 1rem;
	}
</style>
