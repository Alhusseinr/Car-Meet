const eventServices = require('../services/eventServices');

module.exports = {
    create(req, res) {
        console.log("controller");
        const eventInfo = { name, addressId, numberOfAttendees, rules, dateTime } = req.body;
        console.log(eventInfo);

        eventServices
            .createMeet(eventInfo)
            .then(meet => {
                return res.status(200).json({
                    meet
                })
            })
            .catch(e => res.status(400).json({ error: e }))
    },

    deleteEvents(res, req) {
        console.log('controller');
        const eventInfo = { id, name } = req.body;

        eventServices
            .deleteEvent(id, name)
            .then(() => {
                return res.status(200).json({ msg: 'event deleted' })
            })
            .catch(e => res.status(400).json(e))
    }
};
