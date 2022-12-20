<script lang="ts">
	import Spacer from '$lib/components/Spacer.svelte';
	import { Button, DarkMode } from 'flowbite-svelte';

	export let userSignedIn: boolean;
</script>

<header>
	<h1>Rarefy</h1>
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

	header > h1 {
		font-size: 1.5em;
		font-family: 'Open Sans', sans-serif;

		color: #fff;
	}
</style>
