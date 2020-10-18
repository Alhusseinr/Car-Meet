const bcrypt = require('bcryptjs');
const db = require('../config/db');

module.exports = {
    createMeet: (eventInfo) => new Promise((resolve, reject) => {
        console.log("Services");
        const { name, addressId, numberOfAttendees, rules, dateTime, eventCode } = eventInfo;

        return db.insert({
            name,
            addressId,
            numberOfAttendees,
            rules,
            dateTime,
            eventCode
        }).returning('*').into('events').then(data => {
            console.log(data[0]);
            return resolve(data[0]);
        }).catch(e => reject(e))
    }),

    pullEvent: (eventInfo) => new Promise((resolve, reject) => {
        console.log('services');
        const { eventCode } = eventInfo;

        return db.select('*')
            .from('events')
            .where('eventCode', '=', eventCode)
            .then(event => event ? resolve(event[0]) : reject({ error: 'no event found' }))
            .catch(e => reject(e));
    }),

    deleteEvent: (id) => new Promise((resolve, reject) => {
        db.select('id')
            .from('events')
            .where('id', '=', id)
            .then(data => {
                console.log(data[0] === undefined);
                if (data[0] !== undefined) {
                    return db.select('id')
                        .from('events')
                        .where('id', '=', id)
                        .del()
                        .then(user => resolve({ user, msg: 'event deleted' }))
                        .catch(e => reject(e))
                }
                return reject({ msg: 'event does not exist' })
            })
            .catch(e => reject(e))
    })
};
