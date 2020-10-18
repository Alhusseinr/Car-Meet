const addressServices = require('../services/addressServices');

module.exports = {
    create(req, res) {
        const eventAddress = { address1, address2, city, state, zipcode } = req.body;

        addressServices
            .createAddress(eventAddress)
            .then(address => res.status(200).json(address.id))
            .catch(e => res.status(400).json({ error: e }))
    }
};
