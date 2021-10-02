const apiRouter = require('express').Router();
const usersRouter = require('./users');
const alcoholRouter = require('./alcohol');
const cartRouter = require('./cart');

apiRouter.get('/', (req, res, next) => {
    res.send({
        message: "API is running!"
    });
})

apiRouter.use('/users', usersRouter);
apiRouter.use('/alcohol', alcoholRouter);
apiRouter.use('/cart', cartRouter);

module.exports = apiRouter;