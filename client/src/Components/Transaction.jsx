import React, {useState, useEffect} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import UserDashboard from "./UserDashboard";
import './css/transaction.scss'
import Container from 'react-bootstrap/Container';
import moment from "moment";

const Transaction = () => {
    const [transaction, setTransaction] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        const emailExist = localStorage.getItem('user-email')
        console.log(emailExist, "email exust")
        if (!emailExist) {
            navigate('/login')
            return
        }else{
            fetchUserTransaction(emailExist)
        }
    },[])

    const fetchUserTransaction = async (email) => {
        await axios({
            method: 'get',
            url: '/user/transaction?email='+email,
            
          }).then(data=>{
            console.log(data, "login data")
            if (data.status === 200 && data.data.data.length > 0) {
                setTransaction(data.data.data)
            }
            else{
                alert('something went wrong with user transaction' + email)
            }
          }).catch(error=>{
            console.log(error, "request user transaction issue.")
          })
    }


    return (
        <>
             

        <UserDashboard/>
            
            {transaction && transaction.length > 0 ? (<>
            
  <ul className="responsive-table">
    <li className="table-header">
      <div className="col col-1">Id</div>
      <div className="col col-2">Date</div>
      
      <div className="col col-3">Description</div>
      <div className="col col-4">Amount</div>
      <div className="col col-5">Payment Status</div>

    </li>

    {transaction.map(trans=>(
        <li className="table-row">
            <div className="col col-1" data-label="Id">
          {trans._id}
        </div>
        <div className="col col-2" data-label="Date">
          {moment(trans.created_at).format('MMMM DD')}
        </div>
        <div className="col col-3" data-label="Description">
          {trans.merchant || ''}
        </div>
        <div className="col col-4" data-label="Amount">
        ${trans.amount}
        </div>
        <div className="col col-5" data-label="Payment Status">
        {trans.type}
        </div>
      </li>
    ))}
    
    </ul>

            
            </>) : null}
        </>
    )
}

export default Transaction