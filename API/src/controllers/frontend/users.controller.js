const { request, response } = require("express");
const nodemailer = require("nodemailer");
const usersModel = require("../../models/users");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

var secretKey = '123456'  

exports.sendMail = async (request, response) => {
  const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // host: "gmail",

    // port: 587,
    // secure: false, // true for port 465, false for other ports
    service: "gmail",
    auth: {
      // user: "maddison53@ethereal.email",
      // pass: "jn7jnAPss4f63QBp6D",
      user: "ravideveloper0071@gmail.com",

      pass: "ihkfaqqvlnpdovcb",
    },
  });

  try {
    const info = await transporter.sendMail({
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
      error: error,
    };

    response.send(resp);
  }
};

exports.register = async (request, response) => {
  const data = new usersModel({
    name: request.body.name,
    email: request.body.email,
    mobile_number: request.body.mobile_number,
    // password : request.body.password,
    password: bcrypt.hashSync(request.body.password, 10),
  });

  await data
    .save()
    .then((result) => {

      var token =  jwt.sign({
        // email: result.email
        userData: result

      }, secretKey, { expiresIn: '1h' });
      const resp = {
        status: true,
        message: "Record create succesfully",
        token : token,
        // result: result, // for test purpose not use in frontend
      };
      response.send(resp);
    })
    .catch((error) => {
      const resp = {
        status: false,
        message: "Something went wrong",
      };

      response.send(resp);
    });
};

exports.login = async (request, response) => {
  var user = await usersModel
    .findOne({
      email: request.body.email,
    })

    .then((result) => {
      if (result) {
        var compare = bcrypt.compareSync(
          request.body.password,
          result.password
        );

        if (compare) {

        var token =  jwt.sign({
          // email: result.email
          userData: result

        }, secretKey, { expiresIn: '1h' });
          var resp = {
            status: true,
            token : token,
            message: "login succesfully",
        // result: result, // for test purpose not use in frontend
      };
        } else {
          var resp = {
            status: false,
            message: "Invaild password",
            result: result,
          };
        }

       
      } else {
        var resp = {
          status: false,
          message: "Record not found succesfully",
          result: result,
        };
      }
      response.send(resp);
    })
    .catch((error) => {
      const resp = {
        status: false,
        message: "Something went wrong",
      };

      response.send(resp);
    });
};
