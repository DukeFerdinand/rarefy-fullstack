<section>
	<h1>Welcome to Rarefy</h1>
	<div>
		<h2>Sign in</h2>
		<form class="form">
			<div>
				<label for="email">Email</label>
				<input type="email" name="email" id="email" />
			</div>
			<div>
				<label for="password">Password</label>
				<input type="password" name="password" id="password" />
			</div>

			<a href="/signup">Or create an account</a>

			<button type="submit">Sign in</button>
		</form>
	</div>
</section>

<style>
	section {
		padding: 1em;
	}

	.form {
		background-color: var(--background-color-secondary);

		padding: 1rem;
		border-radius: 1rem;
	}

	.form > div {
		display: flex;
		flex-direction: column;
	}

	.form label {
		color: #fff;

		margin-top: 0.5rem;
	}

	.form input {
		margin-top: 0.5rem;
		padding: 0.5rem;
		border-radius: 0.5rem;
	}

	.form button {
		margin-top: 0.5rem;
		padding: 0.5rem;
		border-radius: 0.5rem;
		border: 0;
		font-size: 1rem;
		padding: 0.5rem 1rem;

		background-color: var(--primary);
		cursor: pointer;
	}

	input {
		/* Basic styles */
		border: 1px solid #333;
		color: #ccc;
		background-color: var(--background-color);
		border-radius: 4px;
		padding: 8px;
		font-size: 16px;
		width: 300px;
	}

	/* Placeholder text */
	input::placeholder {
		color: #999;
	}

	/* Focused input */
	input:focus {
		border-color: #ccc;
		outline: none;
	}

	/* Invalid input */
	input:invalid {
		border-color: #f00;
	}
</style>
