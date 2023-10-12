const {createTransport} = require('nodemailer');
const config = require('../config');

const transporter = createTransport({
    host: config.MAIL_HOST,
    port: config.MAIL_PORT,
    auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS
    }
});

const mailOptions = {
    from: config.MAIL_USER,
    subject: 'Cambio de contraseña',
    html: `Entra a este link para restablecer tu contraseña: {link} (El link expira en 1 hora)` 
}

module.exports = {
    mailOptions,
    transporter
};