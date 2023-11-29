

const socket = io.connect('http://192.168.200.29:89');
socket.on('connect', () => {
    console.log('Socket connected'); 
    requestTables();
 
}); 

function requestTables() {
    // console.log('Requesting tables...');
    socket.emit('get_tables');
    // console.log('Tables Received!')

}


// function sfp() {
//     socket.emit('sfp', { sfpselect });
//     console.log('Source File Path Selected')
// }

