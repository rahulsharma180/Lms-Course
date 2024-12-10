const express = require('express');
const route = express.Router();
const userController = require('../../controllers/frontend/users.controller')

module.exports = app => {
   

    route.post('/send-mail',userController.sendMail);

   

    app.use('/api/frontend/mail',route);

}