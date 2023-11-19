

const socket = io.connect('http://192.168.200.29:89');
socket.on('connect', () => {
    console.log('Socket connected'); 
    requestTables();
 
}); 

function requestTables() {
    console.log('Requesting tables...');
    socket.emit('get_tables');
    console.log('Tables Received!')
    // socket.emit('receive_plot');
    // console.log("Image Requested")
}


// export function sr(xy) {
//     // socket.emit('sr', { xy });
//     console.log('Structure Retreiver Selected')
// }

function sfp() {
    socket.emit('sfp', { sfpselect });
    console.log('Source File Path Selected')
}

// function em() {
//     socket.emit('em', { emselect });
//     console.log('Execute Method Selected')
// }

// function rate() {
//     socket.emit('rate', { rating });
//     console.log('Rating Submitted')
// }

// function temp() {
//     socket.emit('temp', { tempselect });
//     console.log('Temperature Set!')
// }


// function populateFinance() {
//     console.log('Population Started');
//     socket.on('table', (data) => {
//     tab = [data.tablelist]
//     // console.log('Tables:', tabs)
//     return tab
//     });
// }

// function requestTables() {
//     // console.log('Requesting tables...');
//     return new Promise((resolve) => {
//         socket.emit('get_tables');
//         socket.on('table', (data) => {
//             // console.log('Tables:', data.tablelist);
//             resolve(data.tablelist);
//         });
//     });
// }

// async function populateFinance() {
//     try {
//         const tab = await requestTables();
//         // console.log('Tabs:', tab);
//         return tab;
//     } catch (error) {
//         console.error('Error:', error);
//         return null;
//     }
// }




// Call the function to fetch and generate links


// function generateSupabaseFileLink(title) {
//     // Assuming your files are stored in a specific folder in Supabase storage
//     return `https://your-supabase-project-url.net/storage/v1/bucket-name/${title}`;
// }
