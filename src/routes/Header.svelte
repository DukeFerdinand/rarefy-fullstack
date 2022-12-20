<script lang="ts">
	import Button from '@smui/button';

	export let userSignedIn: boolean;
</script>

<header>
	<h1>Rarefy</h1>
	<nav>
		{#if userSignedIn}
			<a href="/dashboard">Dashboard</a>
			<a href="/logout">Log Out</a>
		{:else}
			<a href="/signup">Sign Up</a>
			<Button variant="unelevated" href="/">Sign in</Button>
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

	header > h1 {
		font-size: 1.5em;
		font-family: 'Open Sans', sans-serif;

		color: #fff;
	}
</style>
