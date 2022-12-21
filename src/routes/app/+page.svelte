<script lang="ts">
    import {Button, Card, Heading, P} from "flowbite-svelte";
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import Plus from 'svelte-icons-pack/cg/CgMathPlus.js';

    import Spacer from "$lib/components/Spacer.svelte";
    import type {DashboardSavedSearches, DashboardUser} from "$lib/types/frontend";

    export let data: DashboardUser & {SavedSearch: DashboardSavedSearches[]};

    export let user: DashboardUser;
    $: user = data;

    export let savedSearches: DashboardSavedSearches[];
    $: savedSearches = data.SavedSearch
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
				Here's how your search game is going
			</P>
		</div>
		<Spacer spacing="30" />
		<div style="display: flex; justify-content: flex-end">
<!--			<Input placeholder="Search">-->
<!--				<Icon slot="left" icon={Plus} />-->
<!--			</Input>-->
			<Button><Icon src={Plus} /> <Spacer direction="horizontal" spacing="10" /> Add</Button>
		</div>
		<Spacer spacing="30" />


		{#if !savedSearches.length}
			<P size="15">You have no saved searches :(</P>
		{/if}

<!--		<Card>-->
<!--			<Heading tag="h4">Add a new search</Heading>-->
<!--			<Spacer spacing="15" />-->
<!--		</Card>-->

	</div>
	<aside>
		<Card style="margin: 0 auto; height: 700px; width: 250px">
			Add sidebar link here...
		</Card>
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

	aside {
		order: -1;
	}
</style>