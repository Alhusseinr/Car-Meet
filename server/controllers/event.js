const eventServices = require('../services/eventServices');

module.exports = {
    create(req, res) {
        console.log("controller");
        const eventInfo = { name, addressId, numberOfAttendees, rules, dateTime, eventCode } = req.body;
        eventInfo.eventCode = (Math.floor(Math.random() * 1000) + 1000);
        console.log(eventInfo);

        eventServices
            .pullEvent(eventInfo)
            .then(event => {
                if(event) {
                    eventInfo.eventCode = (Math.floor(Math.random() * 1000) + 1000);

                    eventServices
                        .createMeet(eventInfo)
                        .then(meet => {
                            return res.status(200).json({
                                meet
                            })
                        })
                        .catch(e => res.status(400).json({ error: e }))
                } else {
                    eventServices
                        .createMeet(eventInfo)
                        .then(meet => {
                            return res.status(200).json({
                                meet
                            })
                        })
                        .catch(e => res.status(400).json({ error: e }))
                }
            }).catch(e => res.status(400).json({ error: e }))
    },

    getEvent(req, res) {
        console.log('controller');
        const eventInfo = {eventCode} =req.body;
        console.log(eventInfo);

        eventServices
            .pullEvent(eventInfo)
            .then(event => {
                if(event) {
                    return res.status(200).json({
                        event
                    });
                }

                return res.status(400).json({
                    msg: 'no event found'
                })
            })
            .catch(e => {
                return res.status(400).json({
                    error: e
                })
            })

    },

    deleteEvent(req, res) {
        const eventInfo = { id } = req.body;
        console.log(eventInfo);

        eventServices
            .deleteEvent(id)
            .then(() => {
                return res.status(200).json({ msg: 'event deleted' })
            })
            .catch(e => res.status(400).json(e))
    }
};
