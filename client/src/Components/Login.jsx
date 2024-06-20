import React, {useState, useEffect} from "react";
import './css/login.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import moment from "moment";

let Login = () => {
    let [otpField, setOtpField] = useState(false)
    let [email, setEmail] = useState('')
    let [otp, setOtp] = useState("")
    const [emailError, setemailError] = useState("");
    const [sucessMsg, setSuccessMsg] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        const emailExist = localStorage.getItem('user-email')
        console.log(emailExist, "email exust")
        if (emailExist) {
            console.log("kjshjd");
            navigate('/user')
            return
        }
    }, [])

    const handleRequestOtp = (e) => {
        e.preventDefault()
        if (!email || email.length<5) {
            setemailError("Email Not Valid");
            setTimeout(()=>{
                setemailError('')   
            }, 10000)
            return;
        } 
        axios({
            method: 'post',
            url: '/otp/send',
            data: {
              "email": email
            }
          }).then(data=>{
            console.log(data, "data resonse")
            setSuccessMsg("OTP sent sucessfully")
            setOtpField(true)
            setTimeout(()=>{
                setSuccessMsg('')
            }, 5000)
          }).catch(error=>{
            console.log(error, "request otp banking issue.")
          })
    }

    const handleLogin = (e) => {
        //otp match then set email to localstorage
        e.preventDefault()
        if (otp.length < 4) {
            setemailError("OTP length must be 4")
            setTimeout(()=>{
                setemailError('')
            }, 10000)
            return 
        }
        axios({
            method: 'post',
            url: '/otp/verify',
            data: {
              "email": email,
              "otp": otp
            }
          }).then(data=>{
            console.log(data, "login data")
            if (data.status === 200 && data.data.success == true) {
                localStorage.setItem('user-email', email)
                localStorage.setItem('last-login', moment())
                setSuccessMsg("Successfully verified")
                setTimeout(()=>{
                    setSuccessMsg('')
                }, 6000)
                navigate('/user')
            }
            else{
                setemailError("Email and OTP doesn't match")
                setTimeout(()=>{
                    setemailError('')
                }, 10000)
            }
          }).catch(error=>{
            console.log(error, "request otp banking issue.")
          })
    }



    return(
        
        <div class="form-bg" style={{overflowY: "auto"}}>
            <small id="passworderror" className="text-danger form-text">
                                {emailError}
                            </small>
                            <small id="passworderror" className="text-success form-text">
                                {sucessMsg}
                            </small>
            <div class="container-fluid">
                <div class="row justify-content-center p-md-4 mx-auto">
                    <div class="col-lg-offset-3 col-lg-6 col-md-offset-2 col-md-8">
                        <div class="form-container">
                        <div class="form-icon"> <i class="fa fa-user-circle"></i> <span class="signup">Single signin with email otp </span> </div>
                        <form class="form-horizontal">
                            <h3 class="title">Member Login</h3>
                            <div class="form-group"> <span class="input-icon"><i class="fa fa-envelope"></i></span> <input class="form-control" type="email" placeholder="Email Address" value={email} onChange={(event) => setEmail(event.target.value)}/> </div>
                            {otpField === true? <div class="form-group"> <span class="input-icon"><i class="fa fa-lock"></i></span> <input class="form-control" type="password" placeholder="Enter OTP" onChange={(event) => setOtp(event.target.value)}/> </div> : null}
                            {otpField === true ? <button class="btn signin" onClick={handleLogin}>Login</button> : <button class="btn signin" onClick={handleRequestOtp}>Request OTP</button> }
                            
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login