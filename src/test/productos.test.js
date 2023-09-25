const productServices = require("../services/product.services");

describe("Conjunto de pruebas: Servicios de productos", () => {
  it("Debe agregar un producto a la base de datos", async () => {
    //Preparacion

    const testProduct = {
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


    //Ejecucion

    const result = await productServices.create(testProduct);

    //verificacion

    
    expect(result).toBe(expectedResult);
  });

  /* it(""); */
});
