<script>
    import {Card} from "flowbite-svelte";
    import Spacer from "../../lib/components/Spacer.svelte";
</script>

<Spacer spacing="30" />

<section>
	<div class="main">
		<slot />
	</div>
	<aside>
		<Card style="margin: 0 auto; height: 700px; width: 250px">Add sidebar link here...</Card>
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
	}


</style>