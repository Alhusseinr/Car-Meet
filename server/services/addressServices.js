const bcrypt = require('bcryptjs');
const db = require('../config/db');

module.exports = {
    createAddress: (eventAddress) => new Promise((resolve, reject) => {
        console.log('services');
        const {address1, address2, city, state, zipcode, eventCode} = eventAddress;

        console.log(eventAddress);

        return db.insert({
            address1,
            address2,
            city,
            state,
            zipcode,
            eventCode
        }).returning('*').into('addresses').then(data => {
            console.log(data[0]);
            return resolve(data[0]);
        }).catch(e => reject(e))
    }),

    pullAddress: (eventCode) => new Promise((resolve, reject) => {
        console.log('services pull adderss');

        return db.select('id')
            .from('addresses')
            .where('eventCode', '=', eventCode)
            .then(data => data ? resolve(data[0]) : reject({ error: 'no address found' }))
            .catch(e => reject(e));

    })
};
