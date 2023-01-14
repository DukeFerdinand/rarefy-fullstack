<script lang="ts">
	import type { DashboardSavedSearch, DashboardSearchResult } from '$lib/types/frontend';
	import {
		A,
		Button,
		Heading,
		Img,
		P, Select,
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
	import * as SortUtils from './sortUtils';

	let sortBy: SortUtils.Option = SortUtils.Option.NewlyListed;
	let sortByOptions = [
		{
			value: SortUtils.Option.HasBuyoutOption,
			name: "Has Buyout Option"
		},
		{
			value: SortUtils.Option.LowestPrice,
			name: "Lowest Price First"
		},
		{
			value: SortUtils.Option.HighestPrice,
			name: "Highest Price First"
		},
		{
			value: SortUtils.Option.NewlyListed,
			name: "Newly Listed"
		},
		{
			value: SortUtils.Option.EndingSoonest,
			name: "Ending Soonest"
		},
	]

	export let data: DashboardSavedSearch & { SearchResult: DashboardSearchResult[] };

	export let search: DashboardSavedSearch;
	$: search = data;

	export let searchResults: DashboardSearchResult[];
	$: searchResults = SortUtils.sortBy(sortBy ?? SortUtils.Option.NewlyListed, data.SearchResult);
</script>

<div class='w-full'>
	<Heading>
		{search.query}
	</Heading>
	<div>
		<Spacer spacing="15" />
		<P>Created: {search.createdAt.toLocaleString()}</P>
        <!--	Controls	-->
		<div class='mt-10 flex'>
			<div class='ml-auto w-60'>
				<Select placeholder='Sort By...' items={sortByOptions} bind:value={sortBy}/>
			</div>
		</div>

		<div>
			<Spacer spacing="25" />
			<Table style='table-layout: auto'>
				<TableHead>
					<TableBodyCell>Listing</TableBodyCell>
					<TableHeadCell>Thumbnail</TableHeadCell>
					<TableHeadCell class='whitespace-nowrap'>Price</TableHeadCell>
					<TableHeadCell class='whitespace-nowrap'>Buyout Price</TableHeadCell>
					<TableHeadCell class='whitespace-nowrap'>Listing Title</TableHeadCell>
					<TableHeadCell class='whitespace-nowrap'>Start Date</TableHeadCell>
					<TableHeadCell class='whitespace-nowrap'>End Date</TableHeadCell>
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
									<P class='whitespace-nowrap'>{result.currentPrice}</P>
								</TableBodyCell>
								<TableBodyCell>
									{#if result.buyoutPrice}
										<P color='text-red-500' class='whitespace-nowrap'>{result.buyoutPrice}</P>
									{:else}
										<P>-</P>
									{/if}
								</TableBodyCell>
								<TableBodyCell>
									<P class='w-60'>{result.title}</P>
								</TableBodyCell>
								<TableBodyCell>
									<P class='whitespace-nowrap'>
										{result.startDate.toLocaleDateString()}
										<br />
										{result.startDate.toLocaleTimeString()} JST
									</P>
								</TableBodyCell>
								<TableBodyCell>
									<P class='whitespace-nowrap'>
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
									No search results yet!<br /> Searches are run at 9AM and 9PM JST,
									so please check back later :)
								</P>
							</TableBodyCell>
						</TableBodyRow>
					{/if}
				</TableBody>
			</Table>
		</div>
	</div>
</div>
