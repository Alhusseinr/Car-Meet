const bcrypt = require('bcryptjs');
const db = require('../config/db');

module.exports = {
    createUser: (userInfo) => new Promise((resolve, reject) => {
        const { name, username, email, dob, password, followers, follwoing, posts, active } = userInfo;
        const hash = bcrypt.hashSync(password, 10);

        return db.insert({
            name,
            username,
            email,
            dob,
            passowrd: hash,
            followers: 0,
            follwoing: 0,
            posts: 0,
            active: true
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
}