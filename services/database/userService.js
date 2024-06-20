const userSchema = require('../../models/userSchema')
const transactionSchema = require('../../models/transactionSchema')
const loginSchema = require('../../models/loginSchema')

//get user profile by phone number
module.exports.getProfileByEmail = async(email)=>{
    return new Promise((resolve, reject) => {
        userSchema.find({email}).then(data=>{
            resolve(data)
        }).catch(error=>{
            reject(error)
        })
    })
}

//add new user profile
// module.exports.addProfile = async(addObj) => {
//     return new Promise((resolve, reject) => {
//             const users = new userSchema(addObj)
//             users.save().then(data=>{
//                 resolve(data)
//             }).catch(error=>{
//                 reject(error)
//             })
             
//     })
// }

module.exports.addProfile = async(otpObj) => {
    return new Promise(async (resolve,reject)=>{
        const emailExist = await userSchema.find({email: otpObj.email})
        if (emailExist.length>0) {
            //otp phone found, now update the otp and updated_at only
            userSchema.findOneAndUpdate({_id: emailExist[0]._id}, {"$set": {otp: otpObj.otp, updated_at: otpObj.updated_at}}, {returnDocument: true})
            .then(updatedDoc => {
                resolve(updatedDoc)
            }).catch(error=>{
                reject(error)
            })
        }else{
            //add new otp 
            const users = new userSchema(otpObj)
            users.save().then(result => {
                resolve(result)
            }).catch(error=>{
                reject(error)
            })
        }
    })
}

//update new user profile
module.exports.updateProfile = async(updObj, email) => {
    console.log({updObj, email}, "updObj, email")
    return new Promise((resolve, reject) => {
        userSchema.findOneAndUpdate({email}, {'$set':updObj}, { returnNewDocument: true })
        .then(updateDoc => {
            resolve(updateDoc)
        })
        .catch(error => {
            reject(error)
        })
    })
}

//delete user prile, not yet decided.


//get user logins
module.exports.getLogin = async(email)=>{
    return new Promise((resolve, reject) => {
        loginSchema.find({email}).then(data=>{
            resolve(data)
        }).catch(error=>{
            reject(error)
        })
    })
}

//add user login
module.exports.addLogin = async(addObj) => {
    return new Promise((resolve, reject) => {
            const login = new loginSchema(addObj)
            login.save().then(data=>{
                resolve(data)
            }).catch(error=>{
                reject(error)
            })
             
    })
}

//get user transaction
module.exports.getTransaction = async(email)=>{
    return new Promise((resolve, reject) => {
        transactionSchema.find({email}).sort({_id:-1}).then(data=>{
            resolve(data)
        }).catch(error=>{
            reject(error)
        })
    })
}

//add user transactions
module.exports.addTransaction = async(addObj) => {
    return new Promise((resolve, reject) => {
            const transaction = new transactionSchema(addObj)
            transaction.save().then(data=>{
                resolve(data)
            }).catch(error=>{
                reject(error)
            })
             
    })
}