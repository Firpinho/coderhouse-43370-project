const userServices = require("../services/user.services");
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

const resetPasswordMail = async (req, res, next) => {
  try {
    const { mail } = req.body;
    const token = await userServices.resetPassword(mail);
    
    if (!token) return httpResponse.NOT_FOUND(res, `No se ha podido enviar el mail.`);
    
    res.cookie('passwordtoken', token)
    return httpResponse.OK(res, token);

  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try { 
    const user = req.userID
    const { password } = req.body;
    const updatedUser = await userServices.updatePassword(user, password);
    if (updatedUser) return httpResponse.OK(res, updatedUser);
    else return httpResponse.INTERNAL_SERVER_ERROR(res, `Ha ocurrido un error al cambiar la contraseña`)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  logged,
  logout,
  getCurrent,
  setPremium,
  resetPasswordMail,
  updatePassword
};