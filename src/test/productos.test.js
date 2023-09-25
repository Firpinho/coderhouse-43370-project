const productServices = require("../services/product.services");

describe("Conjunto de pruebas: Servicios de productos", () => {
  it("Debe agregar un producto a la base de datos", async () => {
    //Preparacion

    const testProduct = {
      _id: 'some-id',
      name: "Bluetooth Wireless Speaker",
      description:
        "Enjoy your favorite music with this portable and high-quality Bluetooth wireless speaker.",
      price: 59.99,
      thumbnails: [],
      code: "SPK-BT-GRY",
      status: true,
      category: "Electronics",
      stock: 50
    };

    const expectedResult = {
      name: "Bluetooth Wireless Speaker",
      description:
        "Enjoy your favorite music with this portable and high-quality Bluetooth wireless speaker.",
      price: 59.99,
      thumbnails: [],
      code: "SPK-BT-GRY",
      status: true,
      category: "Electronics",
      stock: 50,
      _id: 'some-id',
      __v: 0
    };

    //Ejecucion

    const result = await productServices.create(testProduct);

    //verificacion

     expect(result).toBe(expectedResult);
  });

  /* it(""); */
});
