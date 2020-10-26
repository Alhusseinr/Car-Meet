const userServices = require('../services/userServices');
const bcrypt = require("bcryptjs");
const auth = require('../auth');

module.exports = {
    create(req, res) {
        const userInfo = { name, username, email, dob, password, followers, following, posts, active } = req.body;
        userInfo.followers = 0;
        userInfo.following = 0;
        userInfo.posts = 0;
        userInfo.active = true;
        console.log(userInfo);

        userServices
            .getUser(userInfo)
            .then(user => {
                if(user) {
                    return res.status(400).json({
                        msg: 'This email is already linked to an account'
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
    },

    pullUser(req, res) {
        const userInfo = { name, username, email, dob, password, followers, following, posts, active } = req.body;
        console.log(userInfo);

        userServices
            .getUser(userInfo)
            .then(user => {
                if(user) {
                    return res.status(200).json({
                        user
                    });
                }

                return res.status(400).json({
                    msg: 'no user with the provided email'
                })
            })
            .catch(e => {
                return res.status(400).json({ error: e })
            })
    },

    list(req, res) {
        return userServices
            .getAllUsers()
            .then(users => {
                return res.status(200).json(users)
            })
            .catch(e => res.status(400).json(e))
    },

    updateUser(req, res) {
        const { id, username, email, password } = req.body;
        const userInfo = { id, username, email, password };
        console.log("controller info", userInfo);
        return userServices
            .updateUser(userInfo)
            .then(() => { return res.status(200).json({ msg: 'user updated' })})
            .catch(e => { return res.status(400).json({ msg: 'no bueno', e })})
    },

    deleteUser(req, res) {
        const userInfo = { id, username, email } = req.body;
        console.log(userInfo);

        userServices
            .deleteUser(id, username, email)
            .then(() => {
                return res.status(200).json({ msg: 'user deleted' })
            })
            .catch(e => res.status(400).json(e))
    },

    login(req, res) {
        const userInfo = { email, password } = req.body;
        userServices
            .getUser(userInfo)
            .then(user => {
                const payload = {};
                if(user) {
                    if(bcrypt.compareSync(password, user.password)) {
                        payload.user = {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                        };
                        const data = auth.createJWT(payload.user);
                        payload.Token = 'Bearer ' + data;
                        return res.status(200).json(payload);
                    }
                    return res.status(400).json({ msg: 'Wrong email or password' });
                }
                return res.status(400).json({ msg: 'User does no exist' });
            })
            .catch(e => {
                return res.status(400).json({ msg: 'Something went wrong: ' + e })
            })
    }
};
