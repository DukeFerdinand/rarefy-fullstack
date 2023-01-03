<script>
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import CgArrowLeft from 'svelte-icons-pack/cg/CgArrowLeft.js';
	import { Button } from 'flowbite-svelte';

	import { page } from '$app/stores';
	import Spacer from '$lib/components/Spacer.svelte';
</script>

<Spacer spacing="30" />

<section>
	<div class="main">
		<slot />
	</div>
	<aside>
		{#if !$page.url.toString().endsWith('/app')}
			<Button href="/app">
				<Icon src={CgArrowLeft} />
				<Spacer direction="horizontal" spacing="15" />
				Back to list
			</Button>
			<br />
		{/if}
		other links here
	</aside>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 400px 1fr;
		grid-gap: 30px;
		padding: 0 30px;
	}

	aside {
		order: -1;

		margin: 0 auto;
		height: 700px;
		width: 250px;
	}

	aside > a {
		margin-left: auto;
		display: block;
	}
</style>
