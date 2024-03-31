const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
// const fs = require('fs')
// const path = require('path')

module.exports = {
    createUser : async (req, res) => {
        try {
            const {email} = req.body
            const findUniqueEmail = await userModel.findOne({email : email})     
            if (findUniqueEmail) {
                return res.status(400).send({ status: true, msg: "One user is availble with this email  .. so please try different email" })
            }
            let saveData = await userModel.create(req.body)
            return res.status(201).send({ status: true, msg: "Data created successfully", Data: saveData })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    login : async (req, res) => {
        try {
            let { email, password } = req.body
            let findUser = await userModel.findOne({email, password});
            if (!findUser) {
                return res.status(404).send({ status: false, message: "Invalid login credentials" });
            }
            let token = jwt.sign({ email: findUser.email }, "Secret-key")        
            res.setHeader("token", token)
            return res.status(200).send({ Message: "LoggedIn successfully", Token: token })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    updateUser : async (req, res) => {
        try {
            let {userId} = req.params
            let data = req.body
            if (Object.keys(data).length < 1) {
                return res.status(400).send({ status: false, message: "Please enter data whatever you want to update" })
            }
            data['updatedAt'] = Date.now()
            let updateData = await userModel.findByIdAndUpdate(userId, data, {new: true})
            if (!updateData) {
                return res.status(404).send({ status: false, msg: "User not found" })
            }
            return res.status(200).send({ status: true, Data: updateData })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    deleteUser : async (req, res) => {
        try {
            let deleteData = await userModel.findByIdAndDelete(req.params.userId)
            if (!deleteData) {
                return res.status(404).send({ status: false, msg: "User not found" })
            }
            return res.status(204).send({ status: true, msg: 'User deleted successfully'})
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },
}

