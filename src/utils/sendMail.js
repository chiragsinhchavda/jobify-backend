const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const sendMail = (emails) => {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_HOST_USER,
                pass: process.env.EMAIL_HOST_PASSWORD
            }
        });

        const token = jwt.sign({
            email: emails,
        }, 'emailSecretKey', { expiresIn: '10m' });  
        
        const mailConfigurations = {
            from: process.env.EMAIL_HOST_USER,
            to: emails,
            subject: 'Email Verification | Jobify',
            text: `Hi! There, You have verify your email.
                   Please follow the given link to verify your email
                   ${process.env.BASE_URL_CONSOLE}/verify/${token} 
                   Thanks`
        };

        transporter.sendMail(mailConfigurations, function(error, info){
            if (error) throw Error(error);
            console.log('Email Sent Successfully');
        });
    } catch (error) {
        console.log("Send Mail Error ->>>>>>>>>>>>", error)
    }
}

module.exports = { sendMail }