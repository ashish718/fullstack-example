import React, {useState, useEffect} from "react";
import './css/login.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

let LoginAdmin = () => {
    let [otpField, setOtpField] = useState(false)
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState("")
    const [emailError, setemailError] = useState("");
    const [sucessMsg, setSuccessMsg] = useState("")

    const navigate = useNavigate()

    const handleLogin = (e) => {
        //otp match then set email to localstorage
        e.preventDefault()
        if (email == 'admin' && password == '123admin') {
            navigate('/admin-dash')
        }
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
                             <div class="form-group"> <span class="input-icon"><i class="fa fa-lock"></i></span> <input class="form-control" type="password" placeholder="Enter OTP" onChange={(event) => setOtp(event.target.value)}/> </div> 
                             <button class="btn signin" onClick={handleLogin}>Login</button> 
                            
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginAdmin