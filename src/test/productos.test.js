const {expect} = require('chai')
const mongoose = require('mongoose');
const productServices = require("../services/product.services");

describe("Tests unitarios: Servicios de productos", () => {
  before(async () => {
    await mongoose.connection.collections['products'].drop();
    console.log('Coleccion productos limpia');
  })

  /**
  * GET ALL
  */
  it("Debe listar todos los productos en la base de datos", async () => {
    const products = await productServices.getAll();
      
    expect(products.status).to.be.equal('success')
    expect(Array.isArray(products.payload)).to.be.equal(true);
    expect(products.payload.length === 0).to.be.equal(true);
    expect(products.payload).to.have.length(0);
  });
  /**
   * ADD PRODUCT
   */
  it("Debe agregar un producto a la base de datos", async () => {
    const newProduct =   {
      name: "Coffee Maker Machine",
      description: "Brew delicious coffee with this easy-to-use coffee maker machine for your home or office.",
      price: 89.95,
      thumbnails: [],
      code: "COFFEE-MKR-BLK",
      status: true,
      category: "Home",
      stock: 12
    }

    const createdProduct = await productServices.create(newProduct)

    expect(createdProduct).to.have.property('_id')
  });
  /**
   * GET BY ID
   */
  it("Debe obtener un determinado producto de la base de datos por ID", async () => {
    const newProduct = {
      name: "Indoor Plants Set",
      description: "Add a touch of nature to your home with this beautiful set of indoor plants.",
      price: 39.50,
      thumbnails: [],
      code: "PLANTS-SET-IND",
      status: true,
      category: "Home",
      stock: 20
    }
    const createdProduct = await productServices.create(newProduct)

    const productID = createdProduct._id;

    const getProduct = await productServices.getById(productID)

    expect(getProduct._id.toString() === productID.toString()).to.be.equal(true)
  });
  /**
   * UPDATE
   */
  it("Debe actualizar los datos de un determinado producto en la base de datos", async () => {
    const product =   {
      name: "Gaming Mouse",
      description: "Enhance your gaming experience with this ergonomic and high-precision gaming mouse.",
      price: 34.99,
      thumbnails: [],
      code: "MOUSE-GM-RED",
      status: true,
      category: "Electronics",
      stock: 15
    }
    const modProduct =   {
      name: "Gaming Mouse",
      description: "Enhance your gaming experience with this ergonomic and high-precision gaming mouse.",
      price: 34.99,
      thumbnails: [],
      code: "MOUSE-GM-RED",
      status: true,
      category: "Electronics",
      stock: 15
    }


    /*
      todo: hacer operaciones
    */

  });
  /**
   * DELETE
  */
  it("Debe eliminar un producto de la base de datos", async () => {

  });
});
