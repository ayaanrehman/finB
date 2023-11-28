<script>
    import { logIn } from "$lib/database/utility";
	import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    
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
        console.log('done');
       window.location.href = '/';
      }
    })

   
</script>

<!-- <h1>{user.email}</h1> -->
<!-- {#if error}
    <p>{error}</p>
{/if} -->
<main>
  <img src="/images/finblade.png" />
  <form method="POST">
    <input type="email" name="email" bind:value={email} placeholder="Enter your email"/>
    <input type="password" name="password" bind:value={password} placeholder="Enter your password"/>
    <button type="submit">Submit</button>
  </form>
  <p>{#if form?.success}Logged In{/if}</p>
  <p>{#if form?.error}Please try again{/if}</p>
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