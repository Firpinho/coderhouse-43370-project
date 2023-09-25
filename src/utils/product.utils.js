const {fakerES:faker} = require("@faker-js/faker")

faker.seed(244);

const generate_product = () => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.number.int({max:500}),
        thumbnails: [],
        code: faker.string.uuid(),
        status: true,
        category: faker.word.sample(5),
        stock: faker.number.int({min:30, max:150})
    }
}

module.exports = generate_product;