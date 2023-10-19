const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Coderhouse Ecommerce API',
            version: '1.0.0',
            description: 'Backend de aplicacion ecommerce '
        },
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ]
    },
    apis: ['./src/docs/*.yml']
}


module.exports = {info}