const nodemailer = require("nodemailer");

exports.sendMail = async(request,response) => {
 


const transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  // host: "gmail",

  // port: 587,
  // secure: false, // true for port 465, false for other ports
  service : 'gmail',
  auth: {
    // user: "maddison53@ethereal.email",
    // pass: "jn7jnAPss4f63QBp6D",
      user: "ravideveloper0071@gmail.com",
      
       pass: "ihkfaqqvlnpdovcb",
    

  },
});

try { const info = await transporter.sendMail({
  from: '"Maddison Foo Koch 👻" <ravideveloper0711@gmail.com>', // sender address
  to: " rahulsharma18072022@gmail.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
});
  

const resp = {
  status: true,
  message: "Record Found Succefully!!",
 };

response.send(resp);


} catch (error) {
  
  const resp = {
    status: false,
    message: "Record Found Succefully!!",
    error : error
   };

  response.send(resp);


}


  
  

}







