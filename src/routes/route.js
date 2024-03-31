const express = require("express")
const router = express.Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger-output.json');

const {createUser, login, updateUser, deleteUser} = require('../controllers/userController')
const {fetchData} = require('../controllers/dataController')
const {authentication, authorization} = require('../middlewares/auth')

router.post('/createUser', createUser)
router.post('/login', login)
router.get('/fetchData/:userId', authentication, fetchData)
router.put('/updateUser/:userId', authentication, authorization, updateUser)
router.delete('/deleteUser/:userId', authentication, authorization, deleteUser)

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.all("/*", function (req, res) { 
    return res.status(400).send({ status: false, message: "invalid http request" });
});

module.exports = router