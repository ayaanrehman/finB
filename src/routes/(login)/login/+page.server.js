import { logIn } from "$lib/database/utility";

export const actions = {
    default: async({request}) => {

        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        console.log('form email is', email);
  
        try {
          const res = await logIn(email, password);

          console.log(res);
      
          if (res.user) {
     
            return{success: true};
          
          } else {
            error = 'Invalid credentials';
            return {error: true}
          }
        } catch (error) {
          error = 'An error occurred'; 
          return {error: true}
          
        }
    },
    options: () => {
      // Set the CORS headers to allow requests from the origin of your Svelte app
      return {
          headers: {
              'Access-Control-Allow-Origin': 'https://icsfinblade.com', // Replace with your actual Svelte app origin
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Allow-Headers': 'Content-Type',
          },
      };
  },

}