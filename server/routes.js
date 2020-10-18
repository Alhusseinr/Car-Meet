const wrap = require('./asyncWrapper');
const userController = require('./controllers').users;
const eventController = require('./controllers').event;
const addressController = require('./controllers').address;


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
        .get(eventController.getEvent)
        .delete(eventController.deleteEvent);

    router.route('/api/test')
        .post(addressController.create)
};
