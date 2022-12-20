<script lang="ts">
	import Header from './Header.svelte';
</script>

<Header userSignedIn={false} />
<main>
	<slot />
</main>
