const eventServices = require('../services/eventServices');

module.exports = {
    create(req, res) {
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
    }
};
