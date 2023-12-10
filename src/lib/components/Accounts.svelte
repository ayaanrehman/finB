<script>
// import { onMount } from 'svelte';
import { supabase } from "$lib/supabase.js";


export let userDetails;

let newPassword = '';
let newName = '';
let userName = userDetails.email;

console.log('user name is', userName);

async function changePassword() {
    // Update user password using Supabase API
    await supabase.auth.update({ password: newPassword });
    newPassword = '';
}

async function changeName() {
    // Update user name using Supabase API
    await supabase.auth.update({ data: { name: newName } });
    newName = '';
}
   
</script>

<main>
    <h1>Account Settings</h1>

    {#if userName}
        <h2>Welcome, {userName}!</h2>

        <h3>Change Password</h3>
        <input type="password" bind:value={newPassword} placeholder="New Password" />
        <button on:click={changePassword}>Change Password</button>

        <h3>Change Name</h3>
        <input type="text" bind:value={newName} placeholder="New Name" />
        <button on:click={changeName}>Change Name</button>
    {:else}
        <p>Loading user data...</p>
    {/if}
</main>
 