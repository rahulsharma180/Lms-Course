const express = require('express');
const route = express.Router();
const courseController = require('../../controllers/backend/courses.controller')
const multer  = require('multer')
const uploads = multer({ dest: 'uploads/courses' })
const path = require ('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/courses')
    },
    filename: function (req, file, cb) {
        console.log(path.extname(file.originalname))
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, 'course-' +Date.now()+ path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })

module.exports = app => {
    // route.post('/add',upload.none(),courseController.create);
    // route.post('/add',upload.single('image'),courseController.create);
    // route.post('/add',upload.array('images',3),courseController.create);
    const cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 8 }])

    route.post('/add',cpUpload,courseController.create);

    route.post('/view',uploads.none(),courseController.view);

    route.post('/details/:id',uploads.none(),courseController.details);

    route.put('/change-status/',uploads.none(),courseController.changeStatus);

    route.put('/update/:id',uploads.none(),courseController.update);
    // route.put('/update/',courseController.update);


    route.put('/delete/',uploads.none(),courseController.delete);
    route.put('/multiple-delete/',uploads.none(),courseController.multipleDelete);   

    app.use('/api/backend/courses',route);

}