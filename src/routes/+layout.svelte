<script lang="ts">
	import '../app.postcss';
	import type { LayoutParams } from './$types';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';

	import './styles.css';

	export let data: LayoutParams;

	$: ({ user } = data);
</script>

<Header userSignedIn={!!user} />
<main>
	<slot />
</main>
<Footer />
