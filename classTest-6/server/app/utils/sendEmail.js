require("dotenv").config();

const transporter = require("./../config/mailConfig");

const sendEmail = async (req, userDetails) => {

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userDetails.email,
        subject: "Delivery of system-generated login credentials",
        text: "",
        html: `<h3>Dear ${userDetails.name.split(" ")[0]},</h3>
        <p>Your login credentials are given below</p>
        <h6>Email ID : ${userDetails.email}</h6>
        <h6>Password : ${userDetails.password}</h6>
        <p>Click the below link to login</p>
        <a href="http://localhost:5173/" target="_blank">Click here</a>`,
    });
}

module.exports = sendEmail;