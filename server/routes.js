const wrap = require('./asyncWrapper');
const userController = require('./controllers').users;
const eventController = require('./controllers').event;

module.exports = router => {
    router.get('/api/test', wrap(async (req, res) => {
      res.status(200).json("api is working")
    }));

    router.route('/api/user')
        .post(userController.create)
        .get(userController.pullUser)
        .delete(userController.deleteUser);

    router.route('/api/event')
        .post(eventController.create)
        .delete(eventController.deleteEvents)
};
