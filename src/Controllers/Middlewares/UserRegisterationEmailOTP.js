require("dotenv").config();
const { userModel } = require("../../Models/Student");
const nodemailer = require("nodemailer");

const sendRegisterationOTPonEmail = async (userId) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      // port: 587,
      service: 'gmail',
      auth: {
        // user: testAccount.user, // generated ethereal user
        // pass: testAccount.pass, // generated ethereal password
        user: "ajcse2@gmail.com",
        pass: "etfoegoziroowczf"
      },
    });

    // mail options
    const mailOptions = {
      from: '"Ashish" <ajcse2@gmail.com>',
      to: "ashish1001ashu@yopmail.com",
      subject: "Verify Your Email",
      html: `<p>Enter <b>${otp}</b> in the gopher app to verify email address and complete your registeration. </p>
               <p>This otp <b>expires in 2 minutes</b>. </p> `,
    };
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // Store otp in Database
    const user = await userModel.findOne({ _id: userId });
    Object.assign(user, { useremailotp: otp, createduseremailotp: Date.now() });
    const userDOC = new userModel(user);
    await userDOC.save();
  } catch (err) {
    console.log(err);
  }
};

const verifyRegisterationEmailOTP = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const date = new Date(user.createduseremailotp);
    const mili = date.getTime();
    const EXPIRE_OTP_TIME = 120000; // 1sec=1000milisec so this is in milisec

    if (mili >= Date.now() - EXPIRE_OTP_TIME) {
      if (user.useremailotp === req.body.otp) {
        res.send({ status: 200, messages: ["Registered Successfully!"] });
      } else {
        res.send({ status: 403, messages: ["OTP do not match"] });
      }
    } else {
      res.send({
        status: 403,
        messages: ["OTP is expired, Please resend again"],
      });
    }
  } catch (err) {
    // console.log(err)
    res.send({ status: 403, messages: ["UserId not found"], Error: err });
  }
};

const resendRegisterationEmailOTP = async (req, res) => {
  try {
    if (req.body.userId) {
      await sendOTPverificationEmail(req.body.userId);
      res.send({ status: 200, messages: ["Please check Email for OTP"] });
    } else {
      res.send({ status: 403, messages: ["UserId not found"] });
    }
  } catch (err) {
    res.send({
      status: 500,
      messages: ["Failed Process internally "],
      Error: err,
    });
  }
};

module.exports = {
  sendRegisterationOTPonEmail,
  verifyRegisterationEmailOTP,
  resendRegisterationEmailOTP,
};
