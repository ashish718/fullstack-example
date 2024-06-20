const userSchema = require('../../models/userSchema')

 
//save OTP
module.exports.saveOtp = async(otpObj) => {
    return new Promise(async (resolve,reject)=>{
        const emailExist = await otpSchema.find({email: otpObj.email})
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
            const user = new userSchema(otpObj)
            user.save().then(result => {
                resolve(result)
            }).catch(error=>{
                reject(error)
            })
        }
    })
}

//get otp by phone for verify
// module.exports.getOtp = async(phone) => {
//     return new Promise((resolve, reject) => {
//         userSchema.find({phone}).then(data=>{
//             resolve(data)
//         }).catch(error=>{
//             reject(err)
//         })
//         })
    
// }

//get otp by email for verify
module.exports.getOtp = async(email) => {
    return new Promise((resolve, reject) => {
        userSchema.find({email}).then(data=>{
            resolve(data)
        }).catch(error=>{
            reject(err)
        })
        })
    
}