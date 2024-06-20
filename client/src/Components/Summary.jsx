import React, {useState, useEffect} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import UserDashboard from "./UserDashboard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Stack from 'react-bootstrap/Stack';
import moment from "moment";
import Card from 'react-bootstrap/Card';


const Summary = () => {
    const [user, setUser] = useState([])
    const [transaction, setTransaction] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const emailExist = localStorage.getItem('user-email')
        console.log(emailExist, "email exust")
        if (!emailExist) {
            navigate('/login')
            return
        }else{
            fetchUser(emailExist)
            fetchUserTransaction(emailExist)
        }
    },[])

    const fetchUser = async (email) => {
        await axios({
            method: 'get',
            url: '/user/detail?email='+email,
            
          }).then(data=>{
            console.log(data, "login data")
            if (data.status === 200 && data.data.data.length > 0) {
                setUser(data.data.data)
            }
            else{
                alert('something went wrong with user' + email)
            }
          }).catch(error=>{
            console.log(error, "request user detail issue.")
          })
    }

    const fetchUserTransaction = async (email) => {
        await axios({
            method: 'get',
            url: '/user/transaction?email='+email,
            
          }).then(data=>{
            console.log(data, "login data")
            if (data.status === 200 && data.data.data.length > 0) {
                let sliceArray = data.data.data.slice(0,1)
                setTransaction(sliceArray)
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
             {/* <div>
      <header>
        <div className="container">
          <img src="../images/logo.svg" alt="logo" className="logo" />

          <Nav variant="tabs" defaultActiveKey="/user/summary">
                <Nav.Item>
                    <Nav.Link className="nav-item" href="/user/summary">Account information</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="nav-item" href="/user/transaction">Transactions</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                    Transfer
                    </Nav.Link>
                </Nav.Item>
           </Nav>

          
          
          <Link to="/" className=" nav-btn">Logout</Link>
          
        </div>
      </header>
    </div> */}
        <UserDashboard/>
        
                <>
                    <br/>
                        <Row>
                            <Col xs={8}>
                            <Stack direction="horizontal" gap={3} className="text-end">
                            <div className="p-2"><h2>Welcome</h2></div>
                            <div className="p-2 ">Login as: {localStorage.getItem('user-email')}</div>
                            <div className="vr" />
                            <div className="p-2">Last login: {moment(localStorage.getItem('last-login')).format('MMMM DD YYYY hh:mm:ss')}</div>
                            </Stack>
                            </Col>
                            <Col xs={4}>
                            <Card
          bg='light'
          key='light'
          text='dark'
          style={{ width: '18rem' }}
          className="mb-2"
        >
          
          <Card.Body>
            <Card.Title>Active Balance</Card.Title>
            <Card.Text>
              {user.length > 0 ? `$${user[0].balance}` : ''}
            </Card.Text>
          </Card.Body>
        </Card>
                            
                            </Col>
                        </Row>
                       
                    
                    
                        <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>last transaction</Accordion.Header>
        <Accordion.Body>
        {transaction && transaction.length > 0 ? (<>
            
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-2">Date</div>
                
                <div className="col col-3">Description</div>
                <div className="col col-4">Amount</div>
                <div className="col col-5">Payment Status</div>
          
              </li>
          
              {transaction.map(trans=>(
                  <li className="table-row">
                      
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
        </Accordion.Body>
      </Accordion.Item>
      
    </Accordion>
                        
                </>    
           
    </>
    )
}

export default Summary