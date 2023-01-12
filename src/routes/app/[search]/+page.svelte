<script lang="ts">
	import type { DashboardSavedSearch, DashboardSearchResult } from '$lib/types/frontend';
	import { Heading, P } from 'flowbite-svelte';
	import Spacer from '$lib/components/Spacer.svelte';

	export let data: DashboardSavedSearch & { SearchResult: DashboardSearchResult[] };

	export let search: DashboardSavedSearch;
	$: search = data;

	export let searchResults: DashboardSearchResult[];
	$: searchResults = data.SearchResult;
	$: console.log(searchResults);
</script>

<div>
	<Heading>
		{search.query}
	</Heading>
	<div>
		<Spacer spacing="15" />
		<P>Created: {search.createdAt.toLocaleString()}</P>

		<div>
			{#each searchResults as result}
				<P>{result.title}</P>
			{/each}
		</div>
	</div>
</div>
