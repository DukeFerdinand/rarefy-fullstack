<script lang="ts">
    import {Button, Card, Heading} from "flowbite-svelte";
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import Plus from 'svelte-icons-pack/cg/CgMathPlus.js';

    import Spacer from "$lib/components/Spacer.svelte";

    interface ISavedSearch {
        id: string
        name: string
        query: string
        createdAt: Date
        updatedAt: Date
        vinylOnly: boolean
        userId: string
    }

    export let data: {
        savedSearches: ISavedSearch[]
    }

    $: savedSearches = data.savedSearches;
</script>

<Spacer spacing="30" />
<section>
	<div class="main">
		<div>
			<Heading>Your saved searches</Heading>
			<Button><Icon src={Plus} /> <Spacer direction="horizontal" spacing="10" /> Add</Button>
		</div>
		<Spacer spacing="30" />

		{#if !savedSearches.length}
			<Card>
				<p class="no-searches">You have no saved searches :(</p>
			</Card>

		{/if}
	</div>
	<aside>
		<Card style="margin: 0 auto; height: 700px; width: 250px">
			Add sidebard details here...
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
	}

	aside {
		order: -1;
	}
</style>