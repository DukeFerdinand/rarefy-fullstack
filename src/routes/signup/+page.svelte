<script lang="ts">
	import { enhance } from '$app/forms';
	import { Card, Heading, Input, Label, P, Button, Alert, Mark } from 'flowbite-svelte';

	import Spacer from '$lib/components/Spacer.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div>
	<Card size={'lg'} style="margin: 0 auto;" padding="xl">
		<form method="POST" use:enhance>
			<Heading customSize="text-2xl font-extrabold  md:text-4xl lg:text-5xl">
				Sign up with Rarefy
			</Heading>
			<Spacer spacing="15" />
			<P size="2xl">Start tracking rares <Mark>today.</Mark></P>
			<Spacer spacing="30" />
			{#if form?.errorMessage}
				<Alert color="red" style="margin-bottom: 1rem;">
					{form.errorMessage} :(
				</Alert>
				<Spacer spacing="15" />
			{/if}
			<Label>
				<P size="lg">Username</P>
				<Input required label="Username" type="text" name="username" id="username" />
			</Label>
			<Spacer direction="vertical" spacing={15} />
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
			<Label>
				<P size="lg">Invite Code</P>
				<Input required label="Invite Code" type="text" name="inviteCode" id="inviteCode" />
			</Label>

			<Spacer direction="vertical" spacing={15} />
			<div style="display: flex; justify-content: flex-end;">
				<Button size="lg" type="submit">Login</Button>
			</div>
		</form>
	</Card>
	<Spacer direction="vertical" spacing={150} />
</div>
