const { expect } = require("chai");
const {init} = require('../persistence/daos/mongodb/connection')
const mongoose = require("mongoose");
const mongoProductDao = require("../persistence/daos/mongodb/product.dao");

const productDao = new mongoProductDao();

describe("Tests unitarios: DAO de productos", () => {

  before(async () => {
    await init()
    await mongoose.connection.collections["products"].drop();
    console.log("Coleccion productos limpia");
  });

  after(async () => {
    console.log("Pruebas terminadas limiando colecciones...");
    await mongoose.connection.collections["products"].drop();
    console.log("Colecciones vacias :)");
  });
  /**
   * GET ALL
   */
  it("Debe listar todos los productos en la base de datos", async () => {
    const products = await productDao.getAll();

    expect(Array.isArray(products.docs)).to.be.equal(true);
    expect(products.docs.length === 0).to.be.equal(true);
    expect(products.docs).to.have.length(0);
  });
  /**
   * ADD PRODUCT
   */
  it("Debe agregar un producto a la base de datos", async () => {
    const newProduct = {
      name: "Coffee Maker Machine",
      description:
        "Brew delicious coffee with this easy-to-use coffee maker machine for your home or office.",
      price: 89.95,
      thumbnails: [],
      code: "COFFEE-MKR-BLK",
      status: true,
      category: "Home",
      stock: 12,
    };

    const createdProduct = await productDao.create(newProduct);

    expect(createdProduct).to.have.property("_id");
  });
  /**
   * GET BY ID
   */
  it("Debe obtener un determinado producto de la base de datos por ID", async () => {
    const newProduct = {
      name: "Indoor Plants Set",
      description:
        "Add a touch of nature to your home with this beautiful set of indoor plants.",
      price: 39.5,
      thumbnails: [],
      code: "PLANTS-SET-IND",
      status: true,
      category: "Home",
      stock: 20,
    };
    const createdProduct = await productDao.create(newProduct);

    const productID = createdProduct._id;

    const getProduct = await productDao.getById(productID);

    expect(getProduct._id.toString() === productID.toString()).to.be.equal(
      true
    );
  });
  /**
   * UPDATE
   */
  it("Debe actualizar los datos de un determinado producto en la base de datos", async () => {
    const product = {
      name: "Gaming Mouse",
      description:
        "Enhance your gaming experience with this ergonomic and high-precision gaming mouse.",
      price: 34.99,
      thumbnails: [],
      code: "MOUSE-GM-RED",
      status: true,
      category: "Electronics",
      stock: 15,
    };
    const modProduct = {
      name: "Gaming Mouse (Color Red)",
    };

    const createdProduct = await productDao.create(product);

    const productID = createdProduct._id;

    const updatedProduct = await productDao.update(productID, modProduct);

    expect(updatedProduct.name).to.be.equal(modProduct.name);
  });
  /**
   * DELETE
   */
  it("Debe eliminar un producto de la base de datos", async () => {
    const product = {
      name : "Men's Casual Sneakers",
      description : "Comfortable and trendy casual sneakers for men, suitable for various everyday activities.",
      price : 69.00,
      thumbnails : [],
      code : "SNEAKERS-MEN-WHT",
      status : true,
      category : "Fashion",
      stock : 25
    };

    const createdProduct = await productDao.create(product);

    const productID = createdProduct._id;

    const deletedProduct = await productDao.delete(productID);

    expect(deletedProduct._id.toString()).to.be.equal(productID.toString());
  });

});
