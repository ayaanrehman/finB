<script>
	import { adminAuthClient } from '$lib/supabase.js';

	export let userDetails;

	let newPassword = '';
	let confirmPassword = '';
	let newName = '';
	let newPhone = '';
	let newEmail = '';
	let userName = '';
	let userEmail = '';
	let errors = '';
	$: {
		userName = userDetails?.user_metadata?.name;
		userEmail = userDetails?.email;
	}

	//fsfsd
	//fdsss

	

	let successMessage = '';
	// console.log('User Details: ', userDetails);

	async function changePassword() {
		if (newPassword !== confirmPassword) {
			errors = 'Passwords do not match';
            setTimeout(() => {
				successMessage = '';
				errors = '';
			}, 3000);
			throw new Error('Passwords do not match');
		} else if (newPassword.length < 8) {
			errors = 'Password must be at least 8 characters';
            setTimeout(() => {
				successMessage = '';
				errors = '';
			}, 3000);
			throw new Error('Password must be at least 8 characters');
		} else {
			const { data: user, error } = await adminAuthClient.updateUserById(userDetails.id, {
				password: newPassword
			});
			successMessage = 'Password Changed Successfully';
			setTimeout(() => {
				successMessage = '';
				errors = '';
			}, 3000);

			setTimeout(() => {
				newPassword = '';
                confirmPassword = '';
			}, 100);
		}
	}

	async function changeName() {
		const { data: user, error } = await adminAuthClient.updateUserById(userDetails.id, {
			user_metadata: { name: newName }
		});

		successMessage = 'Name Changed Successfully to: ' + user?.user?.user_metadata?.name;
		userName = user?.user?.user_metadata?.name;
		setTimeout(() => {
			successMessage = '';
			errors = '';
		}, 3000);

		setTimeout(() => {
			newName = '';
		}, 100);
	}

	async function changeEmail() {
		if (!newEmail.includes('@')) {
			errors = 'Please enter a valid email';
            setTimeout(() => {
				successMessage = '';
				errors = '';
			}, 3000);
			throw new Error('Please enter a valid email');
		} else {
			const { data: user, error } = await adminAuthClient.updateUserById(userDetails.id, {
				email: newEmail
			});
			successMessage = 'Email Changed Successfully to: ' + user?.user?.email;
			userEmail = user?.user?.email;
			setTimeout(() => {
				successMessage = '';
				errors = '';
			}, 3000);

			setTimeout(() => {
				newEmail = '';
			}, 100);
		}
	}

	async function changeMobile() {
		if (newPhone.length < 13 && newPhone.length > 0) {
			errors = 'Phone number must be at least 10 characters';
            setTimeout(() => {
				successMessage = '';
				errors = '';
			}, 3000);
			throw new Error('Phone number must be at least 10 characters');
		} else if (newPhone.length > 14 && newPhone.length > 0) {
			errors = 'Phone number must be at most 10 characters';
            setTimeout(() => {
				successMessage = '';
				errors = '';
			}, 3000);
			throw new Error('Phone number must be at most 10 characters');
		} else {
			const { data: user, error } = await adminAuthClient.updateUserById(userDetails.id, {
				phone: newPhone
			});
			successMessage = 'Mobile Changed Successfully to: ' + user?.user?.phone;
			setTimeout(() => {
				successMessage = '';
				errors = '';
			}, 3000);

			setTimeout(() => {
				newPhone = '';
			}, 100);
		}
	}
</script>

<main style="backdrop-filter: brightness(2); padding-left: 1em;">
	<h1>Account Settings</h1>

	<h4 style="color: red;">{errors}</h4>

	{#if userEmail}
		<h2>Name: {userName}</h2>
		<h2 style="top: 2em;">Email: {userEmail}</h2>

		<h3>Change Name</h3>
		<input type="text" autocomplete="off" bind:value={newName} placeholder="New Name" />
		<button
			on:click={() => {
				changeName();
			}}>Change Name</button
		>

		<h3>Change Password</h3>
		<input type="password" bind:value={newPassword} placeholder="New Password" />
		<input
			type="password"
			name="confirmPassword"
			bind:value={confirmPassword}
			placeholder="Confirm your password"
		/>
		<button on:click={changePassword}>Change Password</button>

		<h3>Change Email</h3>
		<input type="text" autocomplete="off" bind:value={newEmail} placeholder="New Email" />
		<button
			on:click={() => {
				changeEmail();
			}}>Change Email</button
		>

		<h3>Change Mobile</h3>
		<input type="text" autocomplete="off" bind:value={newPhone} placeholder="New Mobile" />
		<button
			on:click={() => {
				changeMobile();
			}}>Change Mobile</button
		>

		{#if successMessage}
			<span>{successMessage}</span>
		{/if}
	{:else}
		<p>Loading user data...</p>
	{/if}
</main>

<style>
	button {
		background-color: #1e1e1e;
		color: white;
		border: none;
		border-radius: 0.5em;
		padding: 0.5em 1em;
		margin: 0.5em;
		font-size: 1em;
		cursor: pointer;
	}

	input {
		background-color: #1e1e1e;
		color: white;
		border: none;
		border-radius: 0.5em;
		padding: 0.5em 1em;
		margin: 0.5em;
		font-size: 1em;
		cursor: pointer;
	}

	span {
		color: #ffffff;
		font-size: 1em;
		margin: 0.5em;
		position: absolute;
		top: 0;
		margin-left: auto;
		margin-right: auto;
		background-color: rgb(84, 179, 76);
		padding: 1em;
		border-radius: 5px;
	}
</style>
