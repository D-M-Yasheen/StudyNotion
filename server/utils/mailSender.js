const nodemailer = require("nodemailer");

require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        const info = await transporter.sendMail({
            from: `StudyNotion | CodeHelp - by Yasheen`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
    } catch (error) {
        console.error("Mail not Send", error);
    }
}

module.exports = mailSender;