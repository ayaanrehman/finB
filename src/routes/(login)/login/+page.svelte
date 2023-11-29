<script>
  import { logIn } from "$lib/database/utility";
	import { onMount } from "svelte";
  import { goto } from '$app/navigation';
    
    export let data;

    export let form;
    // let { user } = data;
    // console.log(user);

    let email = '';
    let password = '';
   
    // if(form?.success){
    //   navigate('/');
    // }
    onMount( () => {
      if(form?.success){
        goto('/');
      }
    })

   
</script>

<main>
  <img src="/images/finblade.png" alt="finblade"/>
  <form method="POST">
    <input type="email" name="email" bind:value={email} placeholder="Enter your email"/>
    <input type="password" name="password" bind:value={password} placeholder="Enter your password"/>
    <button type="submit" style="color: white; background-color: maroon; border-radius: 10px; border-color: rgba(255,255,255,0.5);">Submit</button>
  </form>
  <p style="color: white;">{#if form?.success}Authentication Successful{/if}</p>
  <p style="color: white;">{#if form?.error}Please try again{/if}</p>
</main>


<style>
  main{
    display: flex;
    flex-direction: column;
    width:100%;
    height: 100vh;
    gap:10px;
    justify-content: center;
    align-items: center;
  }
  form{
    display: flex;
    flex-direction: column;
    gap:10px;
  }
  form input{
    font-size:18px;
  }
</style>