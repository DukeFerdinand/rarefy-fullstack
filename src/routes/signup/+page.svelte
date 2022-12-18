<script>
	let name = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let inviteCode = ''; // add invite code variable
	let errorMessage = '';

	function validateForm() {
		if (name.trim() === '') {
			errorMessage = 'Please enter a name';
			return;
		}
		if (email.trim() === '') {
			errorMessage = 'Please enter an email';
			return;
		}
		if (password.trim() === '') {
			errorMessage = 'Please enter a password';
			return;
		}
		if (confirmPassword.trim() === '') {
			errorMessage = 'Please confirm your password';
			return;
		}
		if (password !== confirmPassword) {
			errorMessage = 'Passwords do not match';
			return;
		}

		// validate invite code if necessary
		// ...

		// if form is valid, send request to server to create new account
		// ...
	}
</script>

<form on:submit|preventDefault={validateForm}>
	<label for="name">Name:</label>
	<input type="text" bind:value={name} />

	<label for="email">Email:</label>
	<input type="email" bind:value={email} />

	<label for="password">Password:</label>
	<input type="password" bind:value={password} />

	<label for="confirmPassword">Confirm Password:</label>
	<input type="password" bind:value={confirmPassword} />

	<label for="inviteCode">Invite Code:</label>
	<input type="text" bind:value={inviteCode} />

	<button type="submit">Sign Up</button>

	{#if errorMessage}
		<div class="error">{errorMessage}</div>
	{/if}
</form>

<style>
	.error {
		color: red;
	}
</style>
