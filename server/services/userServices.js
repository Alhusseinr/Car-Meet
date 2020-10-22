const bcrypt = require('bcryptjs');
const db = require('../config/db');

module.exports = {
    createUser: (userInfo) => new Promise((resolve, reject) => {
        const { name, username, email, dob, password, followers, following, posts, active } = userInfo;
        const hash = bcrypt.hashSync(password, 10);
        return db.insert({
            name,
            username,
            email,
            dob,
            password: hash,
            followers,
            following,
            posts,
            active,
        }).returning('*').into('users').then(data => {
            console.log(data[0]);
            return resolve(data[0]);
        }).catch(e => reject(e));
    }),

    getUser: (userInfo) => new Promise((resolve, reject) => {
        const { email } = userInfo;

        return db.select('*')
            .from('users')
            .where('email', '=', email)
            .then(user => user ? resolve(user[0]) : reject({ error: 'no user found' }))
            .catch(e => reject(e));
    }),

    getAllUsers: () => new Promise((resolve, reject) => {
        db.select('*')
            .from('users')
            .then(users => resolve(users))
            .catch(e => reject(e))
    }),

    updateUser: (userInfo) => new Promise((resolve, reject) => {
        console.log("service info", userInfo);
        const { id, username, email, password } = userInfo;

        const payload = {};
        if (username) { payload.username = username; }
        if (email) { payload.email = email; }
        if (password) { payload.password = password }

        console.log("payload", payload);

        db.select('*')
            .from('users')
            .where('id', '=', id)
            .update(payload)
            .then(result => resolve(result))
            .catch(e => reject({ msg: 'from services', e }))
    }),

    deleteUser: (id, username, email) => new Promise((resolve, reject) => {
        db.select('id', 'username', 'email')
            .from('users')
            .where('id', '=', id).andWhere('username', '=', username).andWhere('email', '=', email)
            .then(data => {
                console.log(data[0] === undefined);
                if (data[0] !== undefined) {
                    return db.select('id', 'username', 'email')
                        .from('users')
                        .where('id', '=', id).andWhere('username', '=', username).andWhere('email', '=', email)
                        .del()
                        .then(user => resolve({ user, msg: 'user deleted' }))
                        .catch(e => reject(e))
                }
                return reject({ msg: 'user does not exist' })
            })
            .catch(e => reject(e))
    })
};
