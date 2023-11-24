import { React, useState } from "react";
import { ReactDOM } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import DateTimePicker from "react-datetime-picker";
import { useAuth } from "../../contexts/AuthContext";
// import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

function AddTaskComponent({
  handleAddTask,
  cancelAddTask,
  completedUpdate,
  updatingNow = false,
  task,
}) {
  library.add(faPlus, faXmark);
  const [category, setCategory] = useState("study");
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(new Date());
  const [changingCategory, setChanginCategory] = useState(false);
  const { currentUser } = useAuth();

  const handleAdding = async () => {
    console.log(currentUser.uid);
    setTimeout(function () {
      console.log("Paused");
    }, 5000);
    const taskToAdd = {
      title: title,
      description: description,
      time: time,
      category: category,
      isDone: false,
      username: currentUser.uid,
    };
    try {
      const response = await fetch("http://localhost:3001/addTask", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(taskToAdd),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      handleAddTask();
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateTask = async () => {
    console.log(id);
    try {
      const response = await fetch("http://localhost:3001/updateTask", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          id: id,
          category: category,
          title: title,
          description: description,
          time: time,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      completedUpdate();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {updatingNow && <p style={styles.cardTitle}>Update Task</p>}
        {!updatingNow && <p style={styles.cardTitle}>Add New Task</p>}
        <img
          src={
            updatingNow
              ? changingCategory
                ? "/assets/" + category + ".jpg"
                : "/assets/" + task.category + ".jpg"
              : "/assets/" + category + ".jpg"
          }
          style={styles.taskCategoryImage}
        />
        <select
          name="role"
          id="role"
          required
          onChange={(event) => {
            setCategory(event.target.value);
            setChanginCategory(true);
          }}
          style={styles.dropdown}
          defaultValue={updatingNow ? task.category : "study"}
        >
          <option value="study">Study</option>
          <option value="meeting">Meeting</option>
          <option value="exercise">Exercise</option>
          <option value="chill">Chill</option>
          <option value="doctorvisit">Doctor's Visit</option>
          <option value="shopping">Shopping</option>
        </select>
        <p style={{ marginBottom: "5px" }}>Add Title</p>
        <input
          type="text"
          onChange={(event) => {
            setTitle(event.target.value);
            if (updatingNow) setId(task._id);
          }}
          required={true}
          // value={updatingNow ? task.title : ""}
          placeholder={updatingNow ? task.title : "I will be doing..."}
          style={styles.input}
        />
        <p style={{ marginBottom: "5px" }}>Add Description</p>
        <input
          type="text"
          onChange={(event) => {
            setDescription(event.target.value);
            if (updatingNow) setId(task._id);
          }}
          required={true}
          // value={updatingNow ? task.description : ""}
          placeholder={updatingNow ? task.description : "Add Description"}
          style={styles.input}
        />
      </div>
      <div style={styles.timepicker}>
        <DateTimePicker
          value={time}
          onChange={(value) => setTime(value)}
          locale="en-IN"
          required
        />
      </div>
      <div style={styles.buttonHolder}>
        {!updatingNow && (
          <div
            style={{
              ...styles.button,
              backgroundColor: "#39CCCC",
              color: "white",
            }}
            onClick={handleAdding}
          >
            <p>New</p>
            <FontAwesomeIcon icon="fa-plus" style={styles.icon} />
          </div>
        )}
        {updatingNow && (
          <div
            style={{
              ...styles.button,
              backgroundColor: "#39CCCC",
              color: "white",
            }}
            onClick={updateTask}
          >
            <p>Update</p>
            <FontAwesomeIcon icon="fa-plus" style={styles.icon} />
          </div>
        )}
        <div
          style={{
            ...styles.button,
            backgroundColor: "#F05D5E",
            color: "white",
          }}
          onClick={cancelAddTask}
        >
          <p>Cancel</p>
          <FontAwesomeIcon icon="fa-xmark" style={styles.icon} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: "8px",
    width: "100px",
    height: "40px",
    margin: "10px",
    marginTop: "20px",
    marginBottom: "20px",
  },
  buttonHolder: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: "25px",
    marginBottom: "10px",
    marginTop: "0px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  container: {
    height: "600px",
    width: "25rem",
    borderRadius: "20px",
    boxShadow: "rgba(6,57,112, 0.42) 0px 10px 20px -5px",
    marginBottom: "20px",
    padding: "10px",
    alignItems: "center",
    // overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
  },
  dropdown: {
    padding: "10px",
    borderRadius: "8px",
    margin: "10px",
  },
  icon: {
    paddingLeft: "5px",
  },
  input: {
    height: "40px",
    marginLeft: "10px",
    width: "300px",
    borderRadius: "8px",
    border: "1px solid black",
    padding: "5px",
  },
  taskCategoryImage: {
    height: "150px",
    width: "150px",
    borderRadius: "30px",
    marginLeft: "20%",
    marginRight: "20%",
  },
  timepicker: {
    marginTop: "0px",
    marginBottom: "0px",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default AddTaskComponent;
