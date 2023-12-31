<script>
	import { adminAuthClient, supabase } from '$lib/supabase.js';
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
	
			if (data) {
				const { user } = data; // get the user object
				const { id } = user; // get the user id
				// console.log('ID:' , id);

				const { data: bucketData, error: bucketError } = await supabase.storage.createBucket(id, {
					public: true,
					// allowedMimeTypes: [ 'image/png' ],
					// fileSizeLimit: 1024
				});

				if (bucketError) {
					console.error('Error creating bucket:', bucketError);
				} else {
					console.log('Bucket created successfully:', bucketData);
				}
  			}
			successMessage = 'User Created Successfully. Redirecting to Login Page...';
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
		{#if successMessage}
		<p class="successmsg">
			{successMessage}
		</p>
		{/if}
		<p>
			<!-- {#if form?.error}Invalid Username or Password{/if} -->
		</p>
		<div class="userhelper">
			<a style="color: bisque;" href="/login/">Back to Login</a>
		</div>
	</div>
</main>

<style>
		.successmsg {
		border: none;
		border-radius: 20px;
		background-color: rgb(74, 165, 74);
		padding: 10px;
		padding-right: 50px;
		position: relative;
		display: inline-block;
		color: white;
		width: max-content;
	}
	.successmsg::before {
		content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="white"><path d="M7.687 14.4l-5.087-5.099 1.518-1.518 3.568 3.58 7.069-7.069 1.518 1.518z"/></svg>');
		position: absolute;
		right: -10px;
		top: 50%;
		transform: translateY(-50%);
		z-index: 1;
	}

	.successmsg::after {
		content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green"><path d="M7.687 14.4l-5.087-5.099 1.518-1.518 3.568 3.58 7.069-7.069 1.518 1.518z"/></svg>');
		position: absolute;
		background-color: green;
		height: 100%;
		right: 0px;
		top: 50%;
		transform: translateY(-50%);
	}

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
