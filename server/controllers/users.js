const userServices = require('../services/userServices');

module.exports = {
    create(req, res) {
        const userInfo = { name, username, email, dob, password, followers, follwoing, posts, active } = req.body;
        console.log(userInfo);

        userServices
            .getUser(userInfo)
            .then(user => {
                if(user) {
                    return res.status(400).json({
                        msg: 'This email is already linked to an exsiting account'
                    })
                }

                return userServices
                    .createUser(userInfo)
                    .then(user => {
                        return res.status(200).json({
                            user
                        });
                    })
                    .catch(e => res.status(400).json({ error: e }))
            })
            .catch(e => {
                return res.status(400).json({ error: e })
            });
    }
};
