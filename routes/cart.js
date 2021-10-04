const cartRouter = require('express').Router();

const {
    addToCart,
    removeFromCart,
    getPendingItemsByUser,
    getCompletedItemsByUser,
    checkout,
    changeQuantity
} = require('../db/index');

cartRouter.post('/add', async (req, res, next) => {
    const { userId, alcoholId } = req.body;
    const cartItem = await addToCart(userId, alcoholId);

    res.send(cartItem);
})

cartRouter.delete('/remove', async (req, res, next) => {
    const { userId, alcoholId } = req.body;
    const cartItem = await removeFromCart(userId, alcoholId);

    res.send(cartItem);
})

cartRouter.get('/pending/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const cartItems = await getPendingItemsByUser(userId);

    res.send(cartItems);
})

cartRouter.get('/completed/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const cartItems = await getCompletedItemsByUser(userId);

    res.send(cartItems);
})

cartRouter.patch('/checkout/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const cartItems = await checkout(userId);

    res.send(cartItems);
})

cartRouter.patch('/quantity/:cartId/:quantity', async (req, res, next) => {
    const { cartId, quantity } = req.params;
    const cartItems = await changeQuantity(cartId, quantity);

    res.send(cartItems);
})

module.exports = cartRouter;