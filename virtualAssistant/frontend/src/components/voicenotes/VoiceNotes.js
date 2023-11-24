import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import style from "./style.css";
import {
  faPlus,
  faCircleXmark,
  faHouse,
  faListCheck,
  faCalendar,
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Navigate } from "react-router-dom";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";
const VoiceNotes = () => {
  const [listening, setListening] = useState(false);
  const [note, setNote] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [voice, setVoice] = useState("");
  const [typed, setTyped] = useState();
  const [savedNotesList, setSavedNotesList] = useState([]);
  const { currentUser } = useAuth();
  const port = "3001";

  library.add(
    faPlus,
    faCircleXmark,
    faHouse,
    faListCheck,
    faCalendar,
    faMicrophone,
    faMicrophoneSlash
  );
  const handleListen = () => {
    if (listening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
        setNote((prev) => prev + voice);
        setVoice("");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setVoice(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = async () => {
    console.log(note);
    const noteObject = {
      title: noteTitle,
      description: note,
      time: new Date(),
      username: currentUser ? currentUser.uid : "abc",
    };
    // setSavedNotesList([...savedNotesList, noteObject]);
    setVoice("");
    setNote("");

    try {
      const response = await fetch("http://localhost:" + port + "/addNote", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(noteObject),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      alert("Note saved");
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    console.log("ID:" + id);
    try {
      const response = await fetch("http://localhost:" + port + "/deleteNote", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);

      window.location.reload(false);
      // const newList = savedNotesList.filter((ele) => ele._id == id);
      // setSavedNotesList(newList);
    } catch (err) {
      console.log(err);
    }
  };
  const handleKeyPress = useCallback((event) => {
    if (event.ctrlKey === true && event.key == "m") {
      console.log(`Key pressed: ${event.key}`);
      setListening((pre) => !pre);
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
  useEffect(() => {
    handleListen();
  }, [listening]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:" + port + "/getNotes", {
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
        setSavedNotesList(json);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
  }, []);
  if (!currentUser) return <Navigate replace to="/login" />;
  return (
    <div className="mainDivVN">
      <h1 className="voicenote_heading">Voice Notes</h1>
      <div className="outerdiv1">
        <div className="div2">
          <h2 className="head2">Your Notes</h2>

          <div className="div3">
            {savedNotesList.map((noteOb, index) => (
              <div className="noteDiv1" key={index}>
                <p className="noteTitle">{noteOb.title}</p>
                {/* <p className="noteDate">{noteOb.time.toLocaleString()}</p> */}
                <p className="">{noteOb.description}</p>
                <button
                  title="delete"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete ? "))
                      handleDelete(noteOb._id);
                  }}
                  className="deleteButton"
                >
                  <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="div4">
          <div className="div5">
            <h2 className="newNote">New Note</h2>

            <button
              title={listening ? "stop (Ctrl + M)" : "start (Ctrl + M)"}
              className="micBtn"
              onClick={() => setListening((prevState) => !prevState)}
            >
              {listening ? (
                <FontAwesomeIcon icon="fa-solid fa-microphone-slash" />
              ) : (
                <FontAwesomeIcon icon="fa-solid fa-microphone" />
              )}
            </button>
            <div className="midTextDiv">
              <textarea
                id="message"
                rows="4"
                className="midTextDivTA"
                value={voice}
                disabled
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              ></textarea>
            </div>
            <input
              className="noteTitleInput"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Add title"
            ></input>
            <textarea
              id="message"
              rows="15"
              className="noteTextArea"
              placeholder="Start typing here..."
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
            ></textarea>

            <button
              onClick={handleSaveNote}
              disabled={!note}
              className="saveBtn"
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default VoiceNotes;
