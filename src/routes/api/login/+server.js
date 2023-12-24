import { logIn } from "$lib/database/utility";

export async function POST(event) {
    const data = await event.request.formData();
    const email = data.get('email');
    const password = data.get('password');
    console.log('form email is', email);
    // event.preventDefault(); // Prevent form from being submitted normally
    try {
        const res = await logIn(email, password);

        //   const user = await getUserSession();

        console.log(res);
        //   console.log(user);
        if (res.user) {
            // alert('thank you fo')
            // return redirect(200, '/')
            console.log("logged in")
            // return { success: true};
            window.location.href = "/homepage/";
            return new Response("logged in")
            // navigate('/'); // Redirect to the home page
        } else {
            error = 'Invalid credentials';
            console.log("incorrect credentials")
            return { error: true, message: 'Invalid credentials' }; // Show error message
            // return new Response("incorrect credentials")
        }
    } catch (error) {
        //   console.error(error);??
        error = 'An error occurred'; // Show error message
        console.log("error ocurred")
        return { error: true, message: 'An error occurred' }; // Show error message
        // return new Response("incorrect credentials provided")

    }

}