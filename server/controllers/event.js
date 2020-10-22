const eventServices = require('../services/eventServices');
const addressServices = require('../services/addressServices');

module.exports = {
    create(req, res) {
        console.log("controller");
        const eventInfo = { name, addressId, numberOfAttendees, rules, dateTime, eventCode, address1, address2, city, state, zipcode } = req.body;
        eventInfo.eventCode = (Math.floor(Math.random() * 1000) + 1000);
        const eventAddress = {
            address1: eventInfo.address1,
            address2: eventInfo.address2,
            city: eventInfo.city,
            state: eventInfo.state,
            zipcode: eventInfo.zipcode,
            eventCode: eventInfo.eventCode
        };
        console.log(eventInfo);

        eventServices
            .pullEvent(eventInfo)
            .then(event => {
                if(event) {
                    eventInfo.eventCode = (Math.floor(Math.random() * 1000) + 1000);
                    eventAddress.eventCode = eventInfo.eventCode;
                    console.log(eventAddress, eventInfo);
                    addressServices
                        .createAddress(eventInfo)
                        .then(data => {
                           console.log(data);
                           eventInfo.addressId = data.id;
                           eventServices
                               .createMeet(eventInfo)
                               .then(meet => { return res.status(200).json({ meet }) })
                               .catch(e => res.status(400).json({ error: e }))
                        });
                } else {
                    eventAddress.eventCode = eventInfo.eventCode;
                    console.log("here", eventInfo);
                    addressServices
                        .createAddress(eventInfo)
                        .then(data => {
                            console.log(data);
                            eventInfo.addressId = data.id;
                            eventServices
                                .createMeet(eventInfo)
                                .then(meet => { return res.status(200).json({ meet }) })
                                .catch(e => res.status(400).json({ error: e }))
                        });
                }
            }).catch(e => res.status(400).json({ error: e }))
    },

    getEvent(req, res) {
        console.log('controller');
        const eventInfo = { eventCode } = req.body;
        console.log(eventInfo);

        eventServices
            .pullEvent(eventInfo)
            .then(event => {
                if(event) {
                    return res.status(200).json({ event });
                }
                return res.status(400).json({ msg: 'no event found' })
            })
            .catch(e => {
                return res.status(400).json({ error: e })
            })

    },

    getAllEvents(req, res) {
        console.log('controller');
        eventServices
            .pullAllEvents()
            .then(events => {
                res.status(200).json(events)
            })
            .catch(e => res.status(400).json(e))
    },

    updateEvent(req, res) {
        const { eventCode, name, numberOfAttendees, rules, dateTime } = req.body;
        const eventInfo = { eventCode, name, numberOfAttendees, rules, dateTime };
        console.log(eventInfo);

        return eventServices
            .updateEvent(eventInfo)
            .then(() => { return res.status(200).json({ msg: 'user updated' })})
            .catch(e => { return res.status(400).json({ msg: 'something went wrong updating event info'})})
    },



    deleteEvent(req, res) {
        const eventInfo = { eventCode } = req.body;
        console.log(eventInfo);

        eventServices
            .deleteEvent(eventCode)
            .then(() => {
                return res.status(200).json({ msg: 'event deleted' })
            })
            .catch(e => res.status(400).json(e))
    },
};

