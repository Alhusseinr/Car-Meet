const wrap = require('./asyncWrapper');
const userController = require('./controllers').users;
const path = require("path");

module.exports = router => {
    router.get('/api/test', wrap(async (req, res) => {
      res.status(200).json("api is working")
    }));

    router.route('/api/user')
        .post(userController.create)
        .get(userController.pullUser)
        .delete(userController.deleteUser)
};
