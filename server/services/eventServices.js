const bcrypt = require('bcryptjs');
const db = require('../config/db');

module.exports = {
    createMeet: (eventInfo) => new Promise((resolve, reject) => {
        console.log("Services");
        const { name, addressId, numberOfAttendees, rules, dateTime } = eventInfo;

        return db.insert({
            name,
            addressId,
            numberOfAttendees,
            rules,
            dateTime
        }).returning('*').into('events').then(data => {
            console.log(data[0]);
            return resolve(data[0]);
        }).catch(e => reject(e))
    }),

    deleteEvent: (eventInfo) => new Promise((resolve, reject) => {
        console.log("services");

        const { id } = eventInfo;

        return db.select('id')
            .from('events')
            .where('id', '=', id)
            .del()
            .then(event => resolve({ event, msg: 'event deleted'}))
            .catch(e => reject(e))
    })
};
