import { useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  faPlus,
  faXmark,
  faHouse,
  faListCheck,
  faCalendar,
  faMicrophone,
  faMicrophoneLines,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
function VoiceCommand() {
  const commands = [
    {
      command: "search *",
      callback: (website) => {
        window.open(
          "https://www.google.com/search?q=" + website.split(" ").join("%20")
        );
      },
    },
    {
      command: "open *",
      callback: (website) => {
        window.open("http://" + website.split(" ").join(""));
      },
    },
  ];
  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const micRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Oops! No Support for Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    micRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    micRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  library.add(
    faPlus,
    faXmark,
    faHouse,
    faListCheck,
    faCalendar,
    faMicrophone,
    faMicrophoneLines
  );
  return (
    <div style={styles.container}>
      <div>
        <div ref={micRef} onClick={handleListing}>
          <FontAwesomeIcon icon="fa-microphone" style={styles.icon} />
        </div>
        <div>{isListening ? "Listening..." : "Click to start Listening"}</div>
        {isListening && (
          <button style={styles.resetButton} onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>
      {transcript && (
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <div style={styles.trans}>{transcript}</div>
          </div>
          <button style={styles.resetButton} onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  resetButton: {
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
  },
  icon: {
    fontSize: "100px",
    margin: "20px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  trans: {
    width: "100%",
  },
};

export default VoiceCommand;
