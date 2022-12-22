<script lang="ts">
	import { Button, Card, Heading, Mark, P, Search } from 'flowbite-svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import Plus from 'svelte-icons-pack/cg/CgMathPlus.js';

	import Spacer from '$lib/components/Spacer.svelte';
	import type { DashboardSavedSearches, DashboardUser } from '$lib/types/frontend';

	export let data: DashboardUser & { SavedSearch: DashboardSavedSearches[] };

	export let user: DashboardUser;
	$: user = data;

	export let savedSearches: DashboardSavedSearches[];
	$: savedSearches = data.SavedSearch;
</script>

<Spacer spacing="30" />
<section>
	<div class="main">
		<div>
			<Heading>
				Hey {user.username}
			</Heading>
			<Spacer spacing="15" />
			<P size="xl">
				How strong is your <Mark>rare</Mark> game?
			</P>
		</div>
		<Spacer spacing="30" />
		<div class="flex gap-2">
			<Search size="md">
				<Button size="sm">Search</Button>
			</Search>
			<Button><Icon src={Plus} /> <Spacer direction="horizontal" spacing="10" /> New</Button>
		</div>
		<Spacer spacing="30" />

		<div class="saved-searches">
			{#if !savedSearches.length}
				<P align="center" size="xl">You have no saved searches! :(</P>
			{:else}
				<Card>add items here..</Card>
			{/if}
		</div>
	</div>
	<aside>
		<Card style="margin: 0 auto; height: 700px; width: 250px">Add sidebar link here...</Card>
	</aside>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 400px 1fr;
	}

	.main {
		min-height: 30vh;
		padding: 0 30px;
	}

	.control-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.control-bar > button {
		flex: 1;
		flex-shrink: 0;
	}

	aside {
		order: -1;
	}
</style>
