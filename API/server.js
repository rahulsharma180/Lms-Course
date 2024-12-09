const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.use('/uploads/courses', express.static('uploads/courses'))

server.get('/',(request, response) => {
    response.send('Server Working Fine......');
})

// Backend Routes 
// require('./src/routes/backend/categories.routes')(server);
require('./src/routes/backend/courses.routes')(server);
require('./src/routes/backend/videos.routes')(server);

// Frontend Routes 

require('./src/routes/frontend/courses.routes')(server);


server.get('*',(request, response) => {
    response.send('Page Not found......');
})

mongoose.connect('mongodb://127.0.0.1:27017/lms').then(() => {    
    server.listen('5007',() => {
        console.log('Database connected!') 
    });
}).catch((error) => {
    console.log('Database not connected!')
    console.log(error)
});



