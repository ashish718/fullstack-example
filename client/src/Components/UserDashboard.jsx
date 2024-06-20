import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const UserDashboard = () => {
    const [open, setOpen] = useState(false);

    const [user, setUser] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        const emailExist = localStorage.getItem('user-email')
        console.log(emailExist, "email exust")
        if (!emailExist) {
            navigate('/login')
            return
        }else{
            fetchUser(emailExist)
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

    function handleLogout(){
        localStorage.removeItem("user-email");
        localStorage.removeItem("last-login");
        navigate('/login')
    }

    return(<div>
        {/* <div>
      <header>
        <div className="container">
          <img src="../images/logo.svg" alt="logo" className="logo" />

           <nav className={` navbar ${open ? "active" : ""}  `}>
            <ul className="nav-items ">
              <li className="nav-item selected ">
                <a href="home.html">Home</a>
              </li>
              <li onClick={() => setOpen(false)} className="nav-item">
                <a href="#about">About</a>
              </li>
              <li className="nav-item">
                <a href="service.html">Contact</a>
              </li>
              <li className="nav-item">
                <a href="contact.html">Blog</a>
              </li>
              <li className="nav-item">
                <a href="career.html">Careers</a>
              </li>
            </ul>
          </nav> 
          <Nav variant="tabs" >
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

<Navbar bg="light" data-bs-theme="light" sticky="top">
        <Container >
          <Navbar.Brand href="/user"><img src="../images/logo.svg" alt="logo" className="logo" /></Navbar.Brand>
          <Nav >
            <Nav.Link href="/user">Home</Nav.Link>
            <Nav.Link href="/user/transactions">Transaction</Nav.Link>
            <Nav.Link disabled>Transfer</Nav.Link>
          </Nav>

          <div style={{ display: "inline-block", textAlign: "center"}}>
          <small style={{verticalAlign: "middle", marginRight: "8px"}}>Hello {user.length > 0 ? user[0].name || user[0].email : ''}</small>  
          <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
          </div>
        </Container>
      </Navbar>
    <div>
        
    </div>
    </div>
    )
}

export default UserDashboard