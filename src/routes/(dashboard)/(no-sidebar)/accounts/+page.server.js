{/* <script>
	// import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase.js';
	import { adminAuthClient } from '$lib/supabase.js';
	// import { changeName } from '$lib/database/utility.js';
	// import { changePassword } from '$lib/database/utility.js';

	export let userDetails;

    $: user.name = userDetails?.user_metadata?.name;
    $: user.email = userDetails?.email;

    let user = { name: '', email: '', mobile: '', password: '' };
    let newValues = { name: '', email: '', mobile: '', password: '' };
    let successMessage = '';

    function changeField(field) {
        user[field] = newValues[field];
        successMessage = `Success, changed ${field} to ${newValues[field]}`;
        setTimeout(() => {
            successMessage = '';
        }, 3000);
        newValues[field] = '';
    }
    </script>
<main style="backdrop-filter: brightness(0.5); padding-left: 1em;">
	<h1>Account Settings</h1>

	{#if user.name}
    <h2>Name: {user.name}</h2>
    <h2 style="top: 2em;">Email: {user.email}</h2>

    <h3>Change Name</h3>
    <input type="text" bind:value={newValues.name} placeholder="New Name" />
    <button on:click={() => changeField('name')}>Change Name</button>

    <h3>Change Password</h3>
    <input type="password" bind:value={newValues.password} placeholder="New Password" />
    <button on:click={() => changeField('password')}>Change Password</button>

    <h3>Change Email</h3>
    <input type="text" bind:value={newValues.email} placeholder="New Email" />
    <button on:click={() => changeField('email')}>Change Email</button>
    

    <h3>Change Mobile</h3>
    <input type="text" bind:value={newValues.mobile} placeholder="New Mobile" />
    <button on:click={() => changeField('mobile')}>Change Mobile</button>

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
</style> */}
