<script lang="ts">
	import Spacer from '$lib/components/Spacer.svelte';
	import { Button, DarkMode, Heading } from 'flowbite-svelte';

	export let userSignedIn: boolean;
</script>

<header>
	<Heading tag="h4">Rarefy</Heading>
	<nav>
		<DarkMode />
		<Spacer direction="horizontal" spacing={15} />

		{#if userSignedIn}
			<a href="/dashboard">Dashboard</a>
			<a href="/logout">Log Out</a>
		{:else}
			<Button href="/">Sign in / Sign up</Button>
		{/if}
	</nav>
</header>

<style>
	header {
		padding: 1em;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	header > nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	header > nav > a {
		flex-shrink: 0;
	}
</style>
