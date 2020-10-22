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
        .put(userController.updateUser)
        .delete(userController.deleteUser);
    router.get('/api/user/all', userController.list);

    router.route('/api/event')
        .post(eventController.create)
        .get(eventController.getEvent)
        .delete(eventController.deleteEvent)
        .put(eventController.updateEvent);
    router.get('/api/event/all', eventController.getAllEvents);
};
