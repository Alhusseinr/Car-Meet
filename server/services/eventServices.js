const bcrypt = require('bcryptjs');
const db = require('../config/db');

module.exports = {
    createMeet: (eventInfo) => new Promise((resolve, reject) => {
        const { name, addressId, numberOfAttendees, rules, dateTime } = eventInfo;
        return db.insert({
            name,
            addressId,
            numberOfAttendees,
            rules,
            dateTime
        }).returning('*').into('event').then(data => {
            console.log(data[0]);
            return resolve(data[0]);
        }).catch(e => reject(e))
    }),
};
