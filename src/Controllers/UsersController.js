require("dotenv").config();
const { userModel } = require("../Models/Student");
const ErrorController = require("../Controllers/Middlewares/ErrorController");
const {
  sendRegisterationOTPonEmail,
} = require("../Controllers/Middlewares/UserRegisterationEmailOTP");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const jwt = require("jsonwebtoken");

var createDOC = async (data) => {
  try {
    const hashPassword = await bcrypt.hash(data.password, 10);
    data.password = hashPassword;
    // Object.assign(data,{password: hashPassword})      // Replace password value in data

    const userDOC = new userModel(data);
    // here jwt token can create middleware
    const result = await userDOC.save();
    return {
      status: 200,
      messages: ["Please check Email for OTP"],
      userId: result._id,
    };
  } catch (error) {
    //   console.log(error);
    return ErrorController(error);
  }
};

const UserRegisteration = async (req, res) => {
  try {
    const result = await createDOC(req.body);
    // middleware for sending otp in email
    await sendRegisterationOTPonEmail(result.userId);
    // console.log(result)
    res.send(result);
  } catch (err) {
    return res.send({
      status: 500,
      messages: ["Server Internal Error"],
      Error: err,
    });
  }
};

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    var result = await userModel.findOne({ email: email });
    if (result !== null) {
      const isMatch = await bcrypt.compare(password, result.password);
      if (result.email === email && isMatch) {
        const authToken = jwt.sign(
          { userId: result._id },
          process.env.SECRET_KEY,
          { expiresIn: 10 }
        );
        res.send({
          status: 200,
          authToken,
          messages: ["Login Successfully !"],
        });
      } else {
        res.status(400).send({ status: 400, messages: ["Invalid Cerdential"] });
      }
    } else {
      res.send({ status: 400, messages: ["You are not a Registered User"] });
    }
  } catch (error) {
    res.send({
      status: 500,
      Errors: error,
      messages: ["An unknown error occurred."],
    });
  }
};

module.exports = { UserRegisteration, UserLogin };
