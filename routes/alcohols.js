const alcoholsRouter = require('express').Router();

const {
    getAllAlcohols,
    getAlcoholById
} = require('../db/index');

alcoholsRouter.get('/', async (req, res, next) => {
    const alcohols = await getAllAlcohols();

    res.send(alcohols);
})

alcoholsRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    const alcohol = await getAlcoholById(id);

    res.send(alcohol);
})

module.exports = alcoholsRouter;