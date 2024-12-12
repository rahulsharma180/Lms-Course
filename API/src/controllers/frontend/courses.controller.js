const coursesModel = require("../../models/courses");
var jwt = require('jsonwebtoken');
var secretKey = '123456'


exports.view = async(request,response) => {

  // if (request.body.token==undefined){
  //     var resp = { 
  //     status: false,
  //     message: "Token Required!!", };
  //    response.send(resp);
  
  // }else(request.body.token =='')
  // {
  //   var resp = {  
  //     status: false,
  //     message: " Token not find!!",
  //    };
  //    response.send(resp);
  // }


  console.log(request.headers.authorization.split(' ')[1]);
    // Validate token chatgpt code
    // if i send token in body formencoded
    // if (!request.body.token) {
    //   return response.send({
    //     status: false,
    //     message: "Token Required!!",
    //   });
    // }

    if (!request.headers.authorization.split(' ')[1]) {
      return response.send({
        status: false,
        tokken_error : true,
        message: "Token Required!!",
      });
    }

    // not working wscube tech method kikuki userdetail fetch nhi kiya
  // jwt.verify(request.body.token, secretKey, function(error, result) {

  //   if(error){
  //     console.log(error);
  //     const resp = {   
  //           status: false,
  //           message: " Incorrect Token!!",
  //          };
  //          response.send(resp);
      
  //   }else{
  //     console.log(result)
  //     var userDetails = result
  //   }

  // });

  //ChatGpt method
 // Verify token asynchronously
 let userDetails;
 try {
   userDetails = await new Promise((resolve, reject) => {
     jwt.verify(request.headers.authorization.split(' ')[1], secretKey, (error, result) => {
       if (error) {
         reject("Incorrect Token!!");
       } else {
         resolve(result);
       }
     });
   });
 } catch (error) {
   return response.send({
     status: false,
     message: error,
   });
 }

 
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
          userDetails : userDetails, ///ssssss user data send
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
      console.log(error);
      
      response.send(resp);
    }
  
  

}







