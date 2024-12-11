const express = require('express');
const route = express.Router();
const userController = require('../../controllers/frontend/users.controller')

module.exports = app => {
   

    route.post('/send-mail',userController.sendMail);

    route.post('/register',userController.register);
    route.post('/login',userController.login);


    app.use('/api/frontend/users',route);

}