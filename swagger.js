const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Carboncell_assignment',
        description: 'Carboncell_assignment'
    },
    host: 'localhost:3000',
    schemes: ['http']
}

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/route.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./src/routes/route')
})