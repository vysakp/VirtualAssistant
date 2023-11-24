import React from "react";
import Signup from "./Signup";
import { Container } from 'react-bootstrap'
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom'
import Dashboard from "./Dashboard";
import Login from "./Login"

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center"
    style={{minHeigth: "100vh"}}>

      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" element={<Dashboard/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>

    </Container>
  
  )
}

export default App;
