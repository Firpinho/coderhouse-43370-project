const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
const {fakerES:faker} = require("@faker-js/faker")


describe("Sessions and users", () => {
    beforeEach(async () => {
      await mongoose.connection.collections["users"].drop();
    });
  
    test("[POST] /register", async () => {
      const user = {
          name: faker.person.fullName(),
          password: "Passw0rd",
          email: faker.internet.email()
      }
    
      const response = await request(app).post('/api/user/register').send(user);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe(user.name);
    });

    test("[GET] /premium", async () => {
        const user = {
            name: faker.person.fullName(),
            password: "Passw0rd",
            email: faker.internet.email()
        }
      
        const newUser = await request(app).post('/api/user/register').send(user);
        const userID = newUser.body._id;
        const response = await request(app).get(`/api/user/premium/${userID}`).send(user);
        expect(response.body.premium).toBe(true);
    })

    test("[POST] /login", async () => {
        const user = {
            name: faker.person.fullName(),
            password: "Passw0rd",
            email: 'jhondoe@gmail.com'
        }
      
        const newUser = await request(app).post('/api/user/register').send(user);
        const userID = newUser.body._id;
        await request(app).get(`/api/user/premium/${userID}`).send(user);
        await request(app).get('/api/user/logout');
        const response = await request(app).post('/api/user/login').send({email: 'jhondoe@gmail.com', password: "Passw0rd"});
    });
  });  


describe("Products", () => {
  beforeEach(async () => {
    await mongoose.connection.collections["products"].drop();
  });

  test("[POST] /create", async () => {
     const product = {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.number.int({max:500}),
        thumbnails: [],
        code: faker.string.uuid(),
        status: true,
        category: faker.word.sample(5),
        stock: faker.number.int({min:30, max:150})
    } 

    const response = await request(app).post('/api/products').send(product);
    expect(response.body.status).toBe(200)
    expect(response.body.data).toHaveProperty('_id')
    expect(response.body.data.name).toBe(product.name)
  });
});


describe("Carts", () => {
    beforeEach(async () => {
      await mongoose.connection.collections["products"].drop();
    });
  
    test("[POST] /create", async () => {
      const response = await request(app).post('/api/cart');
      expect(response.body.status).toBe(200)
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data.products).toHaveLength(0) 
    });
  });