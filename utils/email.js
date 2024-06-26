const nodemailer = require('nodemailer');

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSKEY
  }
});



module.exports.sendEmail = async(receiver, otp) => {
    // Email options
    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: receiver,
        subject: 'login code',
        // text: `login code is ${otp}`,
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Easybank</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing Easybank. Use the following OTP to complete your Sign Up or Login procedures. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />Easybank</p>
          <hr style="border:none;border-top:1px solid #eee" />
        </div>
      </div>`
    };

    return new Promise((resolve, reject) => {
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            } else {
                resolve(console.log('✅ Email sent:', info.response))
            }
        });
    })
    
    
}