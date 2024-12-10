const coursesModel = require("../../models/courses");

exports.create = async(request,response) => {
    console.log(request.body);
    // console.log(request.file); /// for single image
    console.log(request.files); /// for multiple images

    
    
    if(request.body.status == ''){
        request.body.status = 1;
    }

    if(request.body.order == ''){
        request.body.order = 1;
    }   

    data = new coursesModel({
        name : request.body.name,
        // image : request.body.image,
        // image : request.file.filename,
        price : request.body.price,
        duration : request.body.duration,
        description : request.body.description,
        status : request.body.status,
        order : request.body.order,
    })

    if(request.file != undefined){
        if(request.file.filename != ''){
            data.image = request.file.filename;
        }
    }
    await data.save(data).then((result) => {
        const res = {
            status : true,
            message : 'Record created successfully.',
            result : result
        }
    
        response.send(res);

    }).catch((error) => {
        error_messages = [];

        for( let field in error.errors){
            error_messages.push(error.errors[field].message)
        }

        const res = {
            status : false,
            message : 'Something went wrong !!',
            error_message : error_messages
        }
    
        response.send(res);
    })


}

exports.view = async(request,response) => {
 try{

    const condition = {
        deleted_at : null,
    }
    
    
    if(request.body.name != undefined){
    if(request.body.name != ''){
        condition.name = new RegExp(request.body.name,'i')
    }}

    if(request.body.price != undefined){
    if(request.body.price != ''){
        condition.price = request.body.price
    }}

    if(request.body.duration != undefined){
    if(request.body.duration != ''){
        condition.duration = new RegExp(request.body.duration,'i')
    }}

    if(request.body.status != undefined){    
    if(request.body.status != ''){
        condition.status  = request.body.status;
    }}
    // if(request.body.status != ''){
    //                 condition.push({status : request.body.status});
    //               }

    const courseData = await coursesModel.find(condition).sort({order: 'asc'},{_id:'desc'});

    if (courseData.length != 0) {
        const resp = {
          status: true,
          message: "Record Found Succefully!!",
          imagePath:'http://localhost:5007/uploads/courses/',
          data: courseData,
        };
  
        response.send(resp);
      } else {
        const resp = {
          status: false,
          message: "No Record Found",
        };
  
        response.send(resp);
      }
    } catch (error) {
      const resp = {
        status: false,
        message: "Something went wrong",
      };
  
      response.send(resp);
    }
  
  

}







exports.details = async(request,response) => {
  try {
    const courseData = await coursesModel.findById(request.params.id);

    const resp = {  
      status: true,
      message: "Record Found Succefully!!",
      data: courseData,
    };

    response.send(resp);
  } catch (error) {
    const resp = {
      status: false,
      message: "Something went wrong",
    };

    response.send(resp);
  }
}



exports.update = async(request,response) => {


    if(request.body.status == ''){
        request.body.status = 1;
    }

    if(request.body.order == ''){
        request.body.order = 1;
    }   

    data = {
        name : request.body.name,
        price : request.body.price,
        duration : request.body.duration,
        description : request.body.description,
        status : request.body.status,
        order : request.body.order,
    }
   
    if(request.file != undefined){
        if(request.file.filename != ''){
            data.image = request.file.filename;
        }
    }
    await coursesModel.updateOne(

        {
            _id : request.params.id
        //  _id : request.body.id

        },
        {
            $set : data

        }
    ) .then((result) => {
        const res = {
            status : true,
            message : 'Record Update successfully.',
            result : result
        }
    
        response.send(res);

    }).catch((error) => {
        error_messages = [];

        for( let field in error.errors){
            error_messages.push(error.errors[field].message)
        }

        const res = {
            status : false,
            message : 'Something went wrong !!',
            error_message : error_messages
        }
    
        response.send(res);
    })







}

exports.changeStatus = async(request,response) => {

    const course = await coursesModel.findOne({
        _id : request.body.id,
        deleted_at : null
    }); 
   if (course == null){
        const res = {
        status : false,
        message : 'Id Not Find !!',
       
    }

    response.send(res);

   }
    await coursesModel.updateOne(

        {
            _id : request.body.id
        },
        {
            $set : {status: request.body.status}

        }
    ) .then(() => {
        const res = {
            status : true,
            message : 'Change Status successfully.',
            
        }
    
        response.send(res);

    }).catch((error) => {
       

        const res = {
            status : false,
            message : 'Something went wrong !!',
           
        }
    
        response.send(res);
    }) 
}


exports.delete = async(request,response) => {

    const course = await coursesModel.findOne({
        _id : request.body.id,
        deleted_at : null
    });
   if (course == null){
        const res = {
        status : false,
        message : 'Id Not Find !!',
       
    }

    response.send(res);

   }
    await coursesModel.updateOne(

        {
            _id : request.body.id
        },
        {
            $set : {deleted_at: Date.now()}

        }
    ) .then(() => {
        const res = {
            status : true,
            message : 'Record delete successfully.',
            
        }
    
        response.send(res);

    }).catch((error) => {
       

        const res = {
            status : false,
            message : 'Something went wrong !!',
           
        }
    
        response.send(res);
    })  
}




exports.multipleDelete = async(request,response) => {



    
    await coursesModel.updateMany(

        {
            _id :{ $in : request.body.ids}
        },
        {
            $set : {deleted_at: Date.now()}

        }
    ) .then(() => {
        const res = {
            status : true,
            message : 'Record delete successfully.',
            
        }
    
        response.send(res);

    }).catch((error) => {
       

        const res = {
            status : false,
            message : 'Something went wrong !!',
           
        }
    
        response.send(res);
    })  
}