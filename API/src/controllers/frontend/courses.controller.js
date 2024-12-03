const coursesModel = require("../../models/courses");



exports.view = async(request,response) => {
 try{

    const condition = {
        deleted_at : null,
        status : 1
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

  
    

    const courseData = await coursesModel.find(condition).sort({order: 'asc'},{_id:'desc'});

    if (courseData.length != 0) {
        const resp = {
          status: true,
          message: "Record Found Succefully!!",
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







