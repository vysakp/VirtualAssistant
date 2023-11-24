import React, { useState, useEffect } from "react";
import { ReactDOM } from "react-dom";
import TodoList from "../src/components/todo/TodoList";
import styleSheet from "./style.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Calendar from "./components/calendar/Calendar";
import Sidebar from "./components/todo/Sidebar";
import Signup from "./components/login/Signup";
// import { Container } from 'react-bootstrap'
import Dashboard from "./components/login/Dashboard";
import Login from "./components/login/Login";
import { AuthProvider } from "../src/contexts/AuthContext";
import VoiceNotes from "./components/voicenotes/VoiceNotes";
import VoiceCommand from "./components/voicecommands/VoiceCommand";
function App() {
  return (
    <div className="wholeApp">
      <Sidebar />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* <Route path="/" element={<LoginPage />} /> */}
            <Route exact path="/todolist" element={<TodoList />} />
            <Route exact path="/calendar" element={<Calendar />} />
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/voicenotes" element={<VoiceNotes />} />
            <Route path="/voicecommand" element={<VoiceCommand />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      {/* <div style={styles.todolist}>
        <TodoList />
      </div> */}
    </div>
  );
}

const styles = {
  todolist: {
    marginLeft: "40%",
    width: "100%",
  },
  image: {
    height: "250px",
    width: "250px",
    marginLeft: "15%",
    paddingBotton: "10%",
    // borderRadius: "40px",
  },
};

export default App;
