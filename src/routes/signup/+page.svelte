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

	import Spacer from '$lib/components/Spacer.svelte';
</script>

<form on:submit|preventDefault={validateForm}>
	<!-- <Card padded variant="raised">
		<Textfield label="Name" variant="outlined" size={25} value={name} />
		<Spacer spacing={15} />
		<Textfield label="Email" variant="outlined" size={25} value={name} />
		<Spacer spacing={15} />
	</Card> -->
</form>
