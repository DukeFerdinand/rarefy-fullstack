<script lang="ts">
	import { page } from '$app/stores'
	import Spacer from '$lib/components/Spacer.svelte';
	import { Button, DarkMode, Heading, A } from 'flowbite-svelte';

	export let userSignedIn: boolean;
</script>

<header>
	<A href="/"><Heading tag="h4">Rarefy</Heading></A>
	<nav>
		<DarkMode />
		<Spacer direction="horizontal" spacing={15} />
		{#if userSignedIn}
			<A href="/logout">Log Out</A>
			<Spacer direction="horizontal" spacing="25" />
		{:else}
			<Button style="width: 100px;" href="/login">Sign in</Button>
		{/if}

		<!-- There has to be a better way to do this... -->
		{#if userSignedIn && !$page.url.toString().endsWith('/app') }

			<Button href="/app">Dashboard</Button>
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
</style>
