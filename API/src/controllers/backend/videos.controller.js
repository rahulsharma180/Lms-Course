const coursesModel = require("../../models/videos");

exports.create = async(request,response) => {
    
    if(request.body.status == ''){
        request.body.status = 1;
    }
 

    data = new coursesModel({
        name : request.body.name,
        topic : request.body.topic,
        link : request.body.link,
        status : request.body.status,
    
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