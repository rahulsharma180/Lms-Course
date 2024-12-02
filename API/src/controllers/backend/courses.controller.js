const coursesModel = require("../../models/courses");

exports.create = async(request,response) => {
    
    if(request.body.status == ''){
        request.body.status = 1;
    }

    if(request.body.order == ''){
        request.body.order = 1;
    }   

    data = new coursesModel({
        name : request.body.name,
        image : request.body.image,
        price : request.body.price,
        duration : request.body.duration,
        description : request.body.description,
        status : request.body.status,
        order : request.body.order,
    })

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

}

exports.delete = async(request,response) => {

}

exports.update = async(request,response) => {

}