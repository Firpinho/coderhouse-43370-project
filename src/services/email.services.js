const {createTransport} = require('nodemailer');
const config = require('../config');

const transporter = createTransport({
    service: 'gmail',
    port: config.MAIL_PORT,
    secure: true,
    auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS
    }
});

const mailOptions = { from: config.MAIL_USER } 

//`Entra a este link para restablecer tu contraseña: {link} (El link expira en 1 hora)` 
const send = async (target, subject, content, token = null) => {
    mailOptions.to = target
    mailOptions.subject = subject
    mailOptions.html = content

    transporter.sendMail(mailOptions)
    if(token) return token
}



module.exports = {
    send
};