const moment = require('moment')
const {
    addProfile, 
    getProfileByEmail, 
    updateProfile,
    addLogin,
    getLogin,
    addTransaction,
    getTransaction
} = require('../services/database/userService')

/* ------------ User Profile ------------ */

//create user and detail
exports.userCreate = async(req, res, next) => {
    try {
        if ( !req.body.email) {
            return res.status(422).json({message: "email is required."})
        }
        let userObject = {
            created_at: moment(),
            update_at: moment(),
            status: true,
            ...req.body
        }

        const user = await addProfile(userObject)

        return res.status(200).json({message: 'user profile created success', data: user, success: true})

    } catch (error) {
        next(error)
    }
}

//update user profile details
exports.updateUser = async(req, res, next) => {
    try {
        const updateObj = {
            update_at: moment(),
            ...req.body
        }
        const userUpdate = await updateProfile(updateObj, req.body.email)

        return res.status(200).json({message: 'user update sucessfully', success: true})
    } catch (error) {
        next(error)
    }
}

//get user profile
exports.getUser = async(req, res, next) => {
    try {
        const userData = await getProfileByEmail(req.query.email)

        return res.status(200).json({message: 'user Data', data:userData, success: true})
    } catch (error) {
        next (error)
    }
}

//create user login
exports.userLogin = async(req, res, next) => {
    try {
        if ( !req.body.email) {
            return res.status(422).json({message: "email is required."})
        }
        let loginObject = {
            created_at: moment(),
            update_at: moment(),
            ...req.body
        }

        const user = await addLogin(loginObject)

        return res.status(200).json({message: 'user profile created success', data: user, success: true})

    } catch (error) {
        next(error)
    }
}

//get user login
exports.getUserLogin = async(req, res, next) => {
    try {
        const userData = await getLogin(req.query.email)

        return res.status(200).json({message: 'user Data', data:userData, success: true})
    } catch (error) {
        next (error)
    }
}

//create user transaction
exports.userTransaction = async(req, res, next) => {
    try {
        if ( !req.body.email) {
            return res.status(422).json({message: "email is required."})
        }
        let transObject = {
            update_at: moment(),
            created_at: moment(),
            ...req.body
        }

        const user = await addTransaction(transObject)

        return res.status(200).json({message: 'user profile created success', data: user, success: true})

    } catch (error) {
        next(error)
    }
}

//get user transaction
exports.getUserTransaction = async(req, res, next) => {
    try {
        const userData = await getTransaction(req.query.email)

        return res.status(200).json({message: 'user Data', data:userData, success: true})
    } catch (error) {
        next (error)
    }
}