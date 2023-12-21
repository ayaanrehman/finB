// import { goto } from "$app/navigation";
// import { logIn } from "$lib/database/utility";
// import { getUserSession } from "../../../lib/database/utility.js";

// export const load = async() => {
//     // const { email, password } = request.body;
//     // const res = await logIn('ayaan@icsarabia.com', '12345678');
//     // // console.log(res);

//     // if(res.user){
//     //     return {
//     //         user: res.user
//     //     };
//     // }


    
    
//     // if (user) {
//     //     return {
//     //         status: 200,
//     //         body: user,
//     //     };
//     // } else {
//     //     return {
//     //         status: 401,
//     //         body: "Invalid credentials",
//     //     };
//     // }
// }

// export const actions = {
//     default: async({request}) => {

//         const data = await request.formData();
//         const email = data.get('email');
//         const password = data.get('password');
//         console.log('form email is', email);
//         // event.preventDefault(); // Prevent form from being submitted normally
//         try {
//           const res = await logIn(email, password);

//         //   const user = await getUserSession();

//           console.log(res);
//         //   console.log(user);
//           if (res.user) {
//             // alert('thank you fo')
//             // return redirect(200, '/')
//             return{success: true};
//             // navigate('/'); // Redirect to the home page
//           } else {
//             error = 'Invalid credentials';
//             return {error: true} // Show error message
//           }
//         } catch (error) {
//         //   console.error(error);??
//           error = 'An error occurred'; // Show error message
//           return {error: true}
          
//         }
//     }
// }