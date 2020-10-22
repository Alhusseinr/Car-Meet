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
            .where('events.eventCode', '=', eventCode)
            .innerJoin('addresses', 'addresses.eventCode', 'events.eventCode')
            .then(event => event ? resolve(event[0]) : reject({ error: 'no event found' }))
            .catch(e => reject(e));
    }),

    pullAllEvents: () => new Promise((resolve, reject) => {
       console.log('services');
       return db.select('*')
           .from('events')
           .innerJoin('addresses', 'addresses.eventCode', 'events.eventCode')
           .then(events => events ? resolve(events) : reject({ error: 'there are no events' }))
           .catch(e => reject(e))
    }),

    updateEvent: (eventInfo) => new Promise((resolve, reject) => {
        console.log('services');
        const { eventCode, name, numberOfAttendees, rules, dateTime } = eventInfo;

        const payload = {};
        if (name) { payload.name = name; }
        if (numberOfAttendees) { payload.numberOfAttendees = numberOfAttendees; }
        if (rules) { payload.rules = rules; }
        if (dateTime) { payload.dateTime = dateTime }
        console.log("payload", payload);

        db.select('*')
            .from('events')
            .where('eventCode', '=', eventCode)
            .update(payload)
            .then(updatedEvent => resolve(updatedEvent))
            .catch(e => reject({ msg: 'from services: ', e }))

    }),

    deleteEvent: (eventCode) => new Promise((resolve, reject) => {
        db.select('eventCode')
            .from('events')
            .where('eventCode', '=', eventCode)
            .then(data => {
                console.log(data[0] === undefined);
                if (data[0] !== undefined) {
                    return db.select('eventCode')
                        .from('events')
                        .where('eventCode', '=', eventCode)
                        .del()
                        .then(event => resolve({ event, msg: 'event deleted' }))
                        .catch(e => reject(e))
                }
                return reject({ msg: 'event does not exist' })
            })
            .catch(e => reject(e))
    })
};
