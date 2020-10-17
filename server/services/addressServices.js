const bcrypt = require('bcryptjs');
const db = require('../config/db');

module.exports = {
    createAddress: (eventAddress) => new Promise((resolve, reject) => {
        console.log('services');
        const {address1, address2, city, state, zipcode} = eventAddress;

        return db.insert({
            address1,
            address2,
            city,
            state,
            zipcode
        }).returning('*').into('addresses').then(date => {
            console.log(data[0]);
            return resolve(data[0]);
        }).catch(e => reject(e))
    })
}
