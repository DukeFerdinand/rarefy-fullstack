<script>
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import CgArrowLeft from 'svelte-icons-pack/cg/CgArrowLeft.js';
	import { Button, P } from 'flowbite-svelte';

	import { page } from '$app/stores';
	import Spacer from '$lib/components/Spacer.svelte';
</script>

<Spacer spacing="30" />

<section>
	<div class="main">
		<slot />
	</div>
	<aside>
		<div class='flex flex-row items-center'>
			{#if !$page.url.toString().endsWith('/app')}
				<Button class='flex-grow-0' color="alternative" href="/app">
					<Icon src={CgArrowLeft} />
					<Spacer direction="horizontal" spacing="15" />
					Back to list
				</Button>
				<Spacer spacing="20" direction='horizontal' />
			{/if}

			<Spacer auto direction='horizontal' />
			<P>Pages:</P>
			<Spacer spacing="20" direction='horizontal' />

			<Button class='flex-grow-0' color="green" href="/app/reports">Reports</Button>
		</div>
	</aside>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 1fr;
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
