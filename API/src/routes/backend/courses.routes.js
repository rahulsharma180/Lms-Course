const express = require('express');
const route = express.Router();
const courseController = require('../../controllers/backend/courses.controller')

module.exports = app => {
    route.post('/add',courseController.create);

    route.post('/view',courseController.view);

    route.post('/details/:id',courseController.details);

    route.put('/change-status/',courseController.changeStatus);

    // route.put('/update/:id',courseController.update);
    route.put('/update/',courseController.update);


    route.delete('/delete/',courseController.delete);

    app.use('/api/backend/courses',route);

}