<script>
	import { adminAuthClient } from '$lib/supabase.js';
	import { goto } from '$app/navigation';

	let emailuser = '';
	let passworduser = '';
	let nameuser = '';
	let phoneuser = '';
	let successMessage = '';
	let confirmPassword = '';
    let errors = [];

	async function signUp() {
		if (emailuser === '' || passworduser === '' || nameuser === '') {
            errors = 'Please fill all the fields';
			throw new Error('Please fill all the fields');
		} else if (passworduser.length < 8) {
            errors = 'Password must be at least 8 characters';
			throw new Error('Password must be at least 8 characters');
		} else if (phoneuser.length < 13 && phoneuser.length > 0) {
            errors = 'Phone number must be at least 10 characters';
			throw new Error('Phone number must be at least 10 characters');
		} else if (phoneuser.length > 14 && phoneuser.length > 0) {
            errors = 'Phone number must be at most 10 characters';
			throw new Error('Phone number must be at most 10 characters');
		} else if (!emailuser.includes('@')) {
            errors = 'Please enter a valid email';
			throw new Error('Please enter a valid email');
		} else if (passworduser !== confirmPassword) {
            errors = 'Passwords do not match';
			throw new Error('Passwords do not match');
		} else {
			const { data, error } = await adminAuthClient.createUser({
				email: emailuser,
				password: passworduser,
				phone: phoneuser,
				user_metadata: { name: nameuser },
                email_confirm: true,
                phone_confirm: true
			});
			successMessage = 'User Created Successfully. Redirecting to Login Page';
            // console.log("Data: ", data, "Error: ", error);
			setTimeout(() => {
				successMessage = '';
			}, 3000);

			setTimeout(() => {
				emailuser = '';
				passworduser = '';
				nameuser = '';
				phoneuser = '';
                confirmPassword = '';
			}, 100);
			setTimeout(() => {
				goto('/login/');
			}, 3000);
		}
	}
</script>

<main style="margin-left: 1%;">
	<div class="form-container">
		<img width="10%" height="auto" src="/images/finblade.png" alt="finblade" />

		<h3 style="color: white;">Create New User</h3>

        <h4 style="color: red;">{errors}</h4>

		<form>
			<div class="input-group">
				<span>Name: </span>
				<input type="text" name="name" bind:value={nameuser} placeholder="Enter your name" />
			</div>
			<div class="input-group">
				<span>Email: </span>
				<input
					type="email"
					name="email"
					bind:value={emailuser}
					placeholder="Enter your email"
				/>
			</div>
			<div class="input-group">
				<span>Phone (Optional): </span>
				<input type="text" name="phone" bind:value={phoneuser} placeholder="Enter your phone" />
			</div>
			<div class="input-group">
				<span>Password: </span>
				<input
					type="password"
					name="password"
					bind:value={passworduser}
					placeholder="Enter your password"
				/>
			</div>
			<div class="input-group">
				<span>Confirm Password: </span>
				<input
					type="password"
					name="confirmPassword"
					bind:value={confirmPassword}
					placeholder="Confirm your password"
				/>
			</div>

			<button type="submit" on:click={() => {
                signUp();
            }}>Submit</button>
		</form>
		<p style="color: white;">
			{#if successMessage}{successMessage}{/if}
		</p>
		<p>
			<!-- {#if form?.error}Invalid Username or Password{/if} -->
		</p>
		<div class="userhelper">
			<a style="color: bisque;" href="/login/">Back to Login</a>
		</div>
	</div>
</main>

<style>
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: left;
		width: 40%;
		color: white;
	}

	input {
		margin-bottom: 1em;
		border-radius: 5px;
		border: none;
		padding: 0.5em;
		background-color: #3d3d3d;
		color: white;
		width: 50%;
	}

	button {
		color: white;
		background-color: rgb(39, 118, 179);
		border-color: rgba(255, 255, 255, 0.5);
		height: 2em;
		cursor: pointer;
		margin-top: 3em;
		border: none;
		width: 50%;
		align-self: center;
	}

	.input-group {
		display: flex;
		align-items: center;
		gap: 1em;
		width: 100%;
		margin-bottom: 1em;
		justify-content: space-between;
	}

	.error {
		border-color: red;
	}
</style>
