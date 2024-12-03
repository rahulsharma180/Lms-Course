const express = require('express');
const route = express.Router();
const courseController = require('../../controllers/backend/videos.controller')

module.exports = app => {
    route.post('/add',courseController.create);

    route.post('/view',courseController.view);

    route.put('/update/:id',courseController.update);

    route.delete('/delete/:id',courseController.delete);

    app.use('/api/backend/videos',route);

}