import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";  
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import UserDashboard from "./Components/UserDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import My404Component from "./Components/My404Component";
import Summary from "./Components/Summary";
import Transaction from "./Components/Transaction";

import 'bootstrap/dist/css/bootstrap.min.css';
import './Components/css/loader'

function App() {
  return (
    // <div className="App">
    //   <Landing/>
    // </div>
    <Router>
                <div className="App">
                    
                    <Routes>
                        <Route
                            path="/"
                            element={<Landing />}
                        ></Route>
                        <Route
                            path="/login"
                            element={<Login />}
                        ></Route>
                        <Route
                            path="/user"
                            element={<Summary />}
                        >
                        </Route>
                        <Route
                            path="/admin-dash"
                            element={<AdminDashboard />}
                        >
                        </Route>

                        {/* <Route
                            path="/user/summary"
                            element={<Summary />}
                        >
                        </Route> */}

                        <Route
                            path="/user/transactions"
                            element={<Transaction />}
                        >
                        </Route>
                        <Route path='*' exact={true} element={<My404Component/>} />
                    </Routes>
                </div>
            </Router>
  );
}

export default App;
