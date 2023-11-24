import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import HighlightComponent from "../todo/HighlightComponent";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/getTasks", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            username: currentUser ? currentUser.uid : "abc",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        console.log(json);
        setTasks(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/getEvents", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            username: currentUser ? currentUser.uid : "abc",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        console.log(json);
        setEvents(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const getDate = (time) => {
    var date = new Date(time);
    console.log("db:" + date);
    return date.getDate();
  };
  const getTodayDate = () => {
    var date = new Date();
    console.log(date);
    return date.getDate();
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <div>
      <div style={styles.container}>
        <h1 style={styles.welcomeText}>Welcome</h1>

        <div>
          {error && <Alert variant="danger">{error}</Alert>}
          {/* {currentUser.email} */}
          {currentUser && (
            <Button
              style={styles.buttonStyle}
              variant="link"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          )}
          {!currentUser && (
            <Button
              style={styles.buttonStyle}
              variant="link"
              onClick={() => (window.location.href = "/login")}
            >
              LogIn
            </Button>
          )}
        </div>
      </div>
      {currentUser && (
        <h1 style={styles.highlightsHeader}>Today's Highlights</h1>
      )}
      <div style={styles.highlights}>
        {tasks.map(
          (task, index) =>
            getDate(task.time) == getTodayDate() && (
              <HighlightComponent
                key={index.toString()}
                task={{
                  title: task.title,
                  description: task.description,
                  category: task.category,
                  time: task.time,
                  id: task._id,
                  isDone: task.isDone,
                }}
              />
            )
        )}

        {events.map(
          (event, index) =>
            getDate(event.date) == getTodayDate() && (
              <HighlightComponent
                key={index.toString()}
                task={{
                  title: event.title,
                }}
              />
            )
        )}
      </div>
    </div>
  );
}

const styles = {
  welcomeText: {
    fontSize: "70px",
    marginLeft: "20px",
    marginTop: "5%",
  },
  buttonStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#39CCCC",
    borderRadius: "10px",
    width: "100px",
    height: "40px",
    margin: "10px",
    marginBottom: "20px",
    border: "none",
    color: "white",
    fontSize: "15px",
    marginLeft: "700px",
    marginTop: "-75px",
  },
  container: {
    backgroundImage: "url('/assets/bgimg.png')",
    height: "90%",
    width: "120%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    marginLeft: "50px",
  },
  highlightsHeader: {
    marginLeft: "37%",
    marginBottom: "30px",
  },
  highlights: {
    width: "100%",
    justifyContent: "center",
    marginLeft: "30%",
    alignItems: "center",
  },
};
