const { expect } = require("chai");
const { init } = require("../../persistence/daos/mongodb/connection");
const mongoose = require("mongoose");
const mongoCartDao = require("../../persistence/daos/mongodb/cart.dao");
const mongoProductDao = require("../../persistence/daos/mongodb/product.dao");
const logger = require("../../utils/log.config");

const cartDao = new mongoCartDao();
const productDao = new mongoProductDao();

describe("Tests unitarios: DAO de carritos", () => {
  before(async () => {
    await init();
    await mongoose.connection.collections["carts"].drop();
    await mongoose.connection.collections["products"].drop();
    console.log("Coleccion carritos limpia");
  });

  after(async () => {
    console.log("Pruebas terminadas limiando colecciones...");
    await mongoose.connection.collections["carts"].drop();
    await mongoose.connection.collections["products"].drop();
    console.log("Colecciones vacias :)");
  });
  /**
   * CREATE CART
   */
  it("Debe crear un carrito", async () => {
    const newCart = await cartDao.create();

    expect(newCart).to.have.property("_id");
    expect(newCart.products).to.have.length(0);
  });
  /**
   * GET CART
   */
  it("Debe obtener un carrito existente", async () => {
    const newCart = await cartDao.create();
    const cartID = newCart._id;
    const getCart = await cartDao.getById(cartID);

    expect(getCart).to.have.property("_id");
    expect(getCart.products).to.have.length(0);
  });
  /**
   * ADD PRODUCT
   */
  it("Debe agregar un producto al carrito", async () => {
    const product = {
      name: "Women's Leather Handbag",
      description:
        "A stylish and spacious leather handbag for women, perfect for everyday use and special occasions.",
      price: 129.95,
      thumbnails: [],
      code: "HANDBAG-WM-BLK",
      status: true,
      category: "Fashion",
      stock: 30,
    };

    const createdProduct = await productDao.create(product);
    const productID = createdProduct._id;

    const newCart = await cartDao.create();
    const cartID = newCart._id;

    const addProduct = await cartDao.addProduct(cartID, productID.toString());

    expect(addProduct.products).to.have.length(1);
    expect(addProduct.products[0].product.toString()).to.be.equal(
      productID.toString()
    );
    expect(addProduct.products[0].quantity).to.be.equal(1);

    setTimeout(async () => {
      const addProductAgain = await cartDao.addProduct(
        cartID,
        productID.toString()
      );
      expect(addProductAgain.products[0].quantity).to.be.equal(2);
    }, 500);
  });
  /**
   * DELETE PRODUCT
   */
  it("Debe eliminar un producto del carrito", async () => {
    const product = {
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

    const createdProduct = await productDao.create(product);
    const productID = createdProduct._id;

    const newCart = await cartDao.create();
    const cartID = newCart._id;

    await cartDao.addProduct(cartID, productID.toString());

    setTimeout(async () => {
      const addProductAgain = await cartDao.addProduct(
        cartID,
        productID.toString()
      );
      expect(addProductAgain.products[0].quantity).to.be.equal(2);

      const removeProduct = await cartDao.removeProduct(
        cartID,
        productID.toString()
      );

      expect(removeProduct.products).to.have.length(1);
      expect(removeProduct.products[0].product.toString()).to.be.equal(
        productID.toString()
      );
      expect(removeProduct.products[0].quantity).to.be.equal(1);
    }, 500);
  });
  /**
   * UPDATE PRODUCT QUANTITY
   */
  it("Debe modificar la cantidad de un producto en el carrito", async () => {
    const product = {
      name: "Men's Casual Sneakers",
      description:
        "Comfortable and trendy casual sneakers for men, suitable for various everyday activities.",
      price: 69.0,
      thumbnails: [],
      code: "SNEAKERS-MEN-WHT",
      status: true,
      category: "Fashion",
      stock: 25,
    };

    const createdProduct = await productDao.create(product);
    const productID = createdProduct._id;

    const newCart = await cartDao.create();
    const cartID = newCart._id;

    await cartDao.addProduct(cartID, productID.toString());

    setTimeout(async () => {
      const modifiedQantity = await cartDao.updateQuantity(
        cartID,
        productID.toString(),
        5
      );
      expect(modifiedQantity.products[0].quantity).to.be.equal(5);
    }, 500);
  });
  /**
   * UPDATE CART PRODUCTS
   */
  it("Debe sobrescribir el carrito con los nuevos productos", async () => {
    const product = {
      name: "Women's Leather Coat",
      description:
        "A stylish and spacious leather Coat for women, perfect for everyday use and special occasions.",
      price: 129.95,
      thumbnails: [],
      code: "COAT-WM-BLK",
      status: true,
      category: "Fashion",
      stock: 30,
    };

    const second_product = {
      name: "Bluetooth Wireless Speaker (Silver)",
      description:
        "Enjoy your favorite music with this portable and high-quality Bluetooth wireless speaker.",
      price: 59.99,
      thumbnails: [],
      code: "SLVR-SPK-BT-GRY",
      status: true,
      category: "Electronics",
      stock: 50,
    };

    const createdProduct = await productDao.create(product);
    const createdProduct_second_product = await productDao.create(second_product);

    const productID = createdProduct._id.toString();
    const secondProductID = createdProduct_second_product._id.toString();

    const newCart = await cartDao.create({
      products: [
        {
          product: productID,
          quantity: 1,
        },
      ],
    });

    expect(newCart.products).to.have.length(1);
    expect(newCart.products[0].product.toString()).to.be.equal(productID);
    expect(newCart.products[0].quantity).to.be.equal(1);


    const updatedCart = await cartDao.update(newCart._id, {
        products: [
          {
            product: secondProductID,
            quantity: 1,
          },
        ],
      })

      expect(updatedCart.products).to.have.length(1);
      expect(updatedCart.products[0].product.toString()).to.be.equal(secondProductID);
      expect(updatedCart.products[0].quantity).to.be.equal(1);
  });

});
