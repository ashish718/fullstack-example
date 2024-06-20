const moment = require('moment')
const {getOtp} = require('../services/database/otpService')
const jwt = require('jsonwebtoken');
const {
    addProfile
} = require('../services/database/userService')
let {sendEmail} = require('../utils/email')

//send otp
exports.send = async(req, res, next) => {
    try {
        console.log(req.body, " req.body---");
        if (!req.body.email || req.body.email =='') {
            return res.status(422).json({message: "email required", success: false})
        }
        //generate otp
        const genOtp = Math.floor(1000 + Math.random() * 9000);
        
        //save otp and phone 
        const saveObj = {
            email: req.body.email,
            otp: genOtp,
            created_at: moment(),
            updated_at: moment()
        }

        const sendOtp = await addProfile(saveObj)

        const otpNotification = await sendEmail(req.body.email, genOtp)

        return res.status(200).json({message: 'otp sent', success: true, otp: genOtp})
    } catch (error) {
        next(error)
    }
}


//verify otp and generate auth token
exports.verify = async(req, res, next) => {
    try {
        if (!req.body.email || req.body.phemailone =='' || !req.body.otp || req.body.otp == '') {
            return res.status(422).json({message: "email and otp required", success: false})
        }
        
        const emailExist = await getOtp(req.body.email)

        if (emailExist.length > 0) {
            
            //check the updated at time, less than 5minutes
            const now = moment()
            const duration = moment.duration(now.diff(emailExist[0].updated_at))
            const mins = duration.asMinutes();

            if (mins > 5) {
                return res.status(401).json({message: 'time exceed, please resend', success: false})
            }

            if (emailExist[0].otp != req.body.otp) {
                return res.status(200).json({ message: 'otp not match', success: false})
            }

            //jwt sign in
            const genToken = jwt.sign({
                data: {email: req.body.email}
              }, process.env.SECRET_KEY, { expiresIn: '10h' });
            
            res.status(200).json({message: 'otp verified', success: true, token: genToken})
        }
        else{
            return res.status(404).json({message: "email not found, resend otp", success: false})
        }
    } catch (error) {
        next(error)
    }
}