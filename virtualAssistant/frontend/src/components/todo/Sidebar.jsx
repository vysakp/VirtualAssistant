import React from "react";
import { useState, useEffect } from "react";
import { ReactDOM } from "react";

import {
  faPlus,
  faXmark,
  faHouse,
  faListCheck,
  faCalendar,
  faMicrophone,
  faMicrophoneLines,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

function Sidebar() {
  library.add(
    faPlus,
    faXmark,
    faHouse,
    faListCheck,
    faCalendar,
    faMicrophone,
    faMicrophoneLines,
    faNoteSticky
  );
  const handleTodo = () => {
    window.location.href = "/todolist";
  };
  return (
    <div style={{ height: "100%", width: "25%" }}>
      <div id="navbar">
        <img src="/assets/assistantAlt.png" style={styles.image} />
        <div id="navlinks">
          <a href="/" style={styles.linkDiv}>
            <FontAwesomeIcon icon="fa-solid fa-house" style={styles.icon} />
            Dashboard
          </a>

          <a href="/todolist" style={styles.linkDiv}>
            <FontAwesomeIcon icon="fa-list-check" style={styles.icon} />
            Todolist
          </a>
          <a href="/calendar" style={styles.linkDiv}>
            <FontAwesomeIcon icon="fa-calendar" style={styles.icon} />
            Calendar
          </a>
          <a href="/voicenotes" style={styles.linkDiv}>
            <FontAwesomeIcon
              icon="fa-solid fa-note-sticky"
              style={styles.icon}
            />
            Voice Notes
          </a>
          <a href="/voicecommand" style={styles.linkDiv}>
            <FontAwesomeIcon icon="fa-microphone-lines" style={styles.icon} />
            Voice Commands
          </a>
        </div>
        <p
          style={{
            color: "white",
            marginTop: "280px",
            marginLeft: "10px",
            letterSpacing: "3px",
          }}
        >
          Virtual Assistant / Team 22
        </p>
      </div>
    </div>
  );
}

const styles = {
  image: {
    height: "250px",
    width: "250px",
    marginLeft: "9%",
    paddingBotton: "10%",
    // borderRadius: "40px",
  },
  linkDiv: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  icon: {
    fontSize: "20px",
  },
};

export default Sidebar;
