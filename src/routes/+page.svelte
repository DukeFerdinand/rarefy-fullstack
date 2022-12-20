<script lang="ts">
	import Spacer from '$lib/components/Spacer.svelte';
	import { Heading, P } from 'flowbite-svelte';
</script>

<section>
	<Spacer direction="vertical" spacing={15} />

	<Heading level={2} align="center">Welcome to Rarefy</Heading>

	<Spacer direction="vertical" spacing={15} />

	<P size="xl" align="center">The easiest way to track and collect rare media.</P>
</section>

<style>
	section {
		padding: 1rem;
	}
</style>
