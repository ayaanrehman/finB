
// export function srn() {
//     let filename = "None";
//     socket.emit('sr', { filename });
//     socket.emit('sfp', { filename });
//     console.log(filename)
//     console.log('Structure Retreiver & Source File Path are Set to None')
// } 

// export function sr(filename) {
//     socket.emit('sr', { filename });
//     console.log(filename)
//     console.log('Structure Retreiver Selected')
// }

// export function sfp(filename) {
    
//     socket.emit('sfp', { filename });
//     console.log(filename)
//     console.log('Source File Path Selected')
// }

export function rate(inputRating) {
    socket.emit('rate', { inputRating });
    console.log(inputRating)
    console.log('Rating Submitted')
}

export function temp(creative) {
    socket.emit('temp', { creative });
    console.log(creative)
    console.log('Temperature Set!')
}


//For Admin Page
export function em() {
    socket.emit('em', { emselect });
    console.log('Execute Method Selected')
}

