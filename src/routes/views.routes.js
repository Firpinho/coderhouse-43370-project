const { Router } = require("express");
const { loggedIn, notLoggedIn } = require("../middlewares/loggedIn");
const logger = require("../utils/log.config")

const router = new Router();

router.get("/login", notLoggedIn, (req, res) => {
  res.render("login");
});

router.get("/register", notLoggedIn, (req, res) => {
  res.render("register");
});

router.get("/profile-github", (req, res) => {
  res.send("logged in with github");
});

router.get("/", loggedIn, (req, res) => {
  const data = {
    name: req.user.name,
  };
  res.render("index", { data });
});

router.get("/loggerTest", (req, res) => {
  logger.info(`Carrito "ID" obtenido.`);
  logger.warn("Se ha intentado obtener un carrito que no existe.");
  logger.error(`Ha ocurrido un error al inentar obtener el carrito`);

  logger.info(`Carrito "ID" creado.`);
  logger.warn("No se ha podido crear el carrito.");
  logger.error(`Ha ocurrido un error al crear el carrito`);

  logger.info(`Se ha agregado el producto "PID" al carrito "CID"`);
  logger.warn(`No se ha podido agregar el producto "PID" al carrito "CID"`);
  logger.info(`Se ha producido un error al intentar agregar el producto "PID" al carrito "CID"`);
});

module.exports = router;
