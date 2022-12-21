<script lang="ts">
	import Spacer from '../../lib/components/Spacer.svelte';
	import { Card, Heading, Input, Label, P, Button } from 'flowbite-svelte';

	export let userSignedIn: boolean;
</script>

<div>
	<Card size={'lg'} style="margin: 0 auto;" padding="xl">
		<form method="POST">
			<Heading customSize="text-2xl font-extrabold  md:text-4xl lg:text-5xl">
				Login to Rarefy
			</Heading>
			<Label>
				<P size="lg">Email</P>
				<Input required label="Email" type="email" name="email" id="email" />
			</Label>
			<Spacer direction="vertical" spacing={15} />
			<Label>
				<P size="lg">Password</P>
				<Input required label="Password" type="password" name="password" id="password" />
			</Label>
			<Spacer direction="vertical" spacing={15} />
			<div style="display: flex; justify-content: flex-end;">
				<Button size="lg" type="submit">Login</Button>
			</div>
		</form>
	</Card>
	<Spacer direction="vertical" spacing={150} />
</div>


