const bcrypt = require('bcrypt');
const saltRounds = 10;




exports.hash = (myPlaintextPassword) => {
    return new Promise((resolve, reject) => {
        // let condition = false;
        bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                reject(err)
            }
            resolve(hash)

        });
    })
}


exports.comparison = (myPlaintextPassword, hash) => {
    return new Promise((resolve, reject) => {
        // let condition = false;\
        console.log("===");
        console.log(myPlaintextPassword);
        console.log(hash)
        console.log("===");
        const result1 = bcrypt.compare(myPlaintextPassword, hash, (err, same) => {
            if (err) {
                reject(err)
            } else {
                // console.log(same);
                resolve(same)
            }
        })

        // Store hash in your password DB.
        // if (result1) {
        //     resolve(result1)
        // } else {

        // }
    });
}