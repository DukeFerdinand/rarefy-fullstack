<script lang="ts">
	import type { DashboardSavedSearch, DashboardSearchResult } from '$lib/types/frontend';
	import {
		A,
		Button,
		Heading,
		Img,
		P,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import CgMoreVerticalAlt from 'svelte-icons-pack/cg/CgMoreVerticalAlt.js';

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
			<Spacer spacing="25" />
			<Table>
				<TableHead>
					<TableBodyCell />
					<TableHeadCell>Thumbnail</TableHeadCell>
					<TableHeadCell>Listing Title</TableHeadCell>
					<TableHeadCell>Start Date</TableHeadCell>
					<TableHeadCell>End Date</TableHeadCell>
					<TableHeadCell>Actions</TableHeadCell>
				</TableHead>
				<TableBody>
					{#if searchResults.length > 0}
						{#each searchResults as result}
							<TableBodyRow>
								<TableBodyCell>
									<A href={result.url}>Link to listing</A>
								</TableBodyCell>
								<TableBodyCell>
									<Img
										alt={result.title}
										src={result.images[0]}
										style="width: 100px; border-radius: 10px"
									/>
								</TableBodyCell>
								<TableBodyCell>
									<P>{result.title}</P>
								</TableBodyCell>
								<TableBodyCell>
									<P>
										{result.startDate.toLocaleDateString()}
										<br />
										{result.startDate.toLocaleTimeString()} JST
									</P>
								</TableBodyCell>
								<TableBodyCell>
									<P>
										{result.endDate.toLocaleDateString()}
										<br />
										{result.endDate.toLocaleTimeString()} JST
									</P>
								</TableBodyCell>
								<TableBodyCell>
									<Button color="alternative">
										<Icon src={CgMoreVerticalAlt} />
									</Button>
								</TableBodyCell>
							</TableBodyRow>
						{/each}
					{:else}
						<TableBodyRow>
							<TableBodyCell colspan="4">
								<P style="text-align: center">
									No search results yet!<br /> Searches are run at 9AM and 9PM JST, so please check back
									later :)
								</P>
							</TableBodyCell>
						</TableBodyRow>
					{/if}
				</TableBody>
			</Table>
		</div>
	</div>
</div>
