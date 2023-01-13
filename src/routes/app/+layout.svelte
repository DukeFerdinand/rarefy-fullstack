<script>
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import CgArrowLeft from 'svelte-icons-pack/cg/CgArrowLeft.js';
	import { Button, Card } from 'flowbite-svelte';

	import { page } from '$app/stores';
	import Spacer from '$lib/components/Spacer.svelte';
</script>

<Spacer spacing="30" />

<section>
	<div class="main">
		<slot />
	</div>
	<aside>
		<Card>
			{#if !$page.url.toString().endsWith('/app')}
				<Button color="alternative" href="/app">
					<Icon src={CgArrowLeft} />
					<Spacer direction="horizontal" spacing="15" />
					Back to list
				</Button>
				<Spacer spacing="20" />
			{/if}

			<Button color="green" href="/app/reports">Reports</Button>
		</Card>
	</aside>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 200px 1fr;
		grid-gap: 30px;
		padding: 0 30px;
	}

	aside {
		order: -1;
	}

	aside > a {
		margin-left: auto;
		display: block;
	}
</style>
