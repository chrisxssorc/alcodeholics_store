const apiRouter = require('express').Router();
const usersRouter = require('./users');
const alcoholsRouter = require('./alcohols');
const cartRouter = require('./cart');

apiRouter.get('/', (req, res, next) => {
    res.send({
        message: "API is running!"
    });
})

apiRouter.use('/users', usersRouter);
apiRouter.use('/alcohols', alcoholsRouter);
apiRouter.use('/cart', cartRouter);

module.exports = apiRouter;