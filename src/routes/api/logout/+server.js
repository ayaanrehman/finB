import { signOut } from "$lib/database/utility";

export async function POST() {
    try {
        const res = await signOut();
        if (res) {

            return new Response("logged out")
            // navigate('/'); // Redirect to the home page
        } else {
            error = 'Invalid credentials';
            console.log("incorrect credentials")
            return { error: true, message: 'Invalid credentials' }; // Show error message
        }
    } catch (error) {
        //   console.error(error);??
        error = 'An error occurred'; // Show error message
        console.log("error ocurred")
        return { error: true, message: 'An error occurred' }; // Show error message

    }

}