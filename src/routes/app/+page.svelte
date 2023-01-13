<script lang="ts">
	import {
		Alert,
		Button,
		Card,
		Heading,
		Hr,
		Input,
		Label,
		Mark,
		Modal,
		P,
		Search,
		Spinner,
		Toggle
	} from 'flowbite-svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import Plus from 'svelte-icons-pack/cg/CgMathPlus.js';

	import { enhance } from '$app/forms';

	import Spacer from '$lib/components/Spacer.svelte';
	import type { DashboardSavedSearches, DashboardUser } from '$lib/types/frontend';

	// State
	let loading = false;
	let newSearchModalOpen = false;

	// Data from server
	export let data: DashboardUser & { SavedSearch: DashboardSavedSearches[] };
	export let user: DashboardUser;
	$: user = data;

	export let savedSearches: DashboardSavedSearches[];
	$: savedSearches = data.SavedSearch;

	export let form: {
		message?: string;
	};
</script>

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
	<Search size="md" />
	<Button on:click={() => (newSearchModalOpen = true)}
		><Icon src={Plus} /> <Spacer direction="horizontal" spacing="10" /> New</Button
	>
	<Modal title="Add a new query" bind:open={newSearchModalOpen}>
		<form id="new-query" method="post" action="/app?/newQuery" use:enhance>
			<Label>
				<P>Search terms</P>
				<Input placeholder="Junko Ohashi DEF, かとうはつえ, etc." name="query" />
				<Spacer spacing="15" />
				<Toggle checked={true} name="vinylOnly">Vinyl Only</Toggle>

				<Spacer spacing="15" />
				<P>
					This interface is a WIP, please bear with me as more options will be added for
					things like Platform, exclude terms, etc. :)
				</P>
			</Label>
		</form>
		<svelte:fragment slot="footer">
			<Button form="new-query" type="submit" bind:disabled={loading}>
				{#if loading}
					<Spinner size={4} />
				{:else}
					Submit
				{/if}
			</Button>
			<Button color="alternative" on:click={() => (newSearchModalOpen = false)}>Cancel</Button
			>
		</svelte:fragment>
	</Modal>
</div>
<Spacer spacing="30" />

<!-- main content, the saved search cards -->

<div>
	{#if form?.message}
		<Alert>
			{form.message}
			<div slot="icon">
				<Icon src={Plus} />
			</div>
		</Alert>
		<Spacer spacing="15" />
	{/if}
	{#if !savedSearches.length}
		<P align="center" size="xl">You have no saved searches! :(</P>
	{:else}
		<div class="saved-searches">
			{#each savedSearches as search}
				<Card href={`/app/${search.id}`}>
					<Heading tag="h4">
						{search.query}
					</Heading>
					<Spacer spacing="15" />

					<Hr />
					<Spacer spacing="15" />
					<P>
						<b>Format:</b> <i>{search.vinylOnly ? 'Vinyl only' : 'All formats'}</i>
					</P>
				</Card>
			{/each}
		</div>
	{/if}
</div>

<style>
	.saved-searches {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 10px;
	}
</style>
