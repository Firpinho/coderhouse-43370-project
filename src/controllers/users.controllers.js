const userServices = require("../services/user.services");
const { transporter, mailOptions } = require("../services/email.services");
const { loggedIn } = require("../middlewares/loggedIn");

const HttpResponse = require("../utils/http.response");
const logger = require("../utils/log.config");
const { transport } = require("winston");

const httpResponse = new HttpResponse();

const logged = async (req, res, next) => {
  try {
    if (loggedIn) res.status(200).redirect("http://localhost:8080/");
    else res.status(400).redirect("http://localhost:8080/login");
  } catch (error) {
    next(error.message);
  }
};

const logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const user = await userServices.getCurrent(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const setPremium = async (req, res, next) => {
  try {
    const user = await userServices.setPremium(req.params.id);
    logger.info(user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const sendPasswordMail = async (req, res, next) => {
  try {
    const { mail } = req.body;
    const userExists = await userServices.getByEmail(mail);

    if (userExists) {
      mailOptions.to = mail;
      const response = await transporter.sendMail(mailOptions);
      logger.info(`target mail :::::: ${mail}`);
      logger.info("mail enviado");
      res.json(response);
    }

    return httpResponse.NOT_FOUND(res, `No existe ningun usuario con este mail.`);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  logged,
  logout,
  getCurrent,
  setPremium,
  sendPasswordMail,
};
