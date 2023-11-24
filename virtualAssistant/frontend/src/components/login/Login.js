import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <div>
      <h1 id="heading" style={styles.header}>
        LogIn
      </h1>

      <div style={styles.container}>
        <div className="container" style={styles.card}>
          <h3 id="heading3">Enter your details</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <br />
              <Form.Control
                style={styles.detailInput}
                type="email"
                ref={emailRef}
                placeholder="Email"
                required
              />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <br />
              <Form.Control
                style={styles.detailInput}
                type="password"
                ref={passwordRef}
                placeholder="Password"
                required
              />
            </Form.Group>
            <br />
            <Button style={styles.buttonStyle} disabled={loading} type="submit">
              Log In
            </Button>
          </Form>
          <div>
            Create an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "450px",
    borderRadius: "20px",
    boxShadow: "rgba(6,57,112, 0.42) 0px 10px 20px -5px",
    margin: "60px",
    marginLeft: "20rem",
    padding: "30px",
    paddingTop: "30px",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  detailInput: {
    height: "35px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid black",
    padding: "5px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  buttonStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#39CCCC",
    borderRadius: "10px",
    width: "300px",
    height: "40px",
    margin: "10px",
    marginBottom: "20px",
    border: "none",
    color: "white",
    fontSize: "15px",
  },
  header: {
    marginLeft: "57%",
    marginTop: "10%",
  },
};
