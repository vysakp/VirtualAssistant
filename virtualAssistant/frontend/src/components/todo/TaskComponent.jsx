import { React, useState } from "react";
import { ReactDOM } from "react";

function TaskComponent({
  task,
  selectedId,
  handleUpdateTask,
  handleUpdateDoneTask,
}) {
  const [completed, setCompleted] = useState(task.isDone);
  const [editing, setEditing] = useState(false);

  const handleTaskClick = () => {
    console.log("Menu opened");
    setEditing(!editing);
  };

  const handleDelete = async () => {
    console.log("Deleted");
    try {
      const response = await fetch("http://localhost:3001/deleteTask", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ id: task.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log("error", error);
    }
    setEditing(!editing);
    window.location.reload(false);
  };

  // const handleEdit = () => {
  //   console.log("Edit Menu opened");
  //   setEditing(!editing);
  // };
  const getDateFromString = (dateString) => {
    dateString = dateString.toLocaleString();
    var date = new Date(dateString);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ":" + minutes.substr(-2);

    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0");
    var yyyy = date.getFullYear();
    var today = dd + "/" + mm + "/" + yyyy;
    return today + "\xa0\xa0\xa0\xa0\xa0" + formattedTime;
  };

  return (
    <div style={styles.container}>
      <div style={styles.imgTextHolder}>
        <img
          src={"/assets/" + task.category + ".jpg"}
          style={{
            ...styles.taskCategoryImage,
            filter: completed ? "grayscale(100%)" : "grayscale(0%)",
          }}
          onClick={handleTaskClick}
        />
        <div style={styles.textOnly}>
          <p style={styles.time}>{getDateFromString(task.time)}</p>
          <p
            style={{
              ...styles.title,
              textDecoration: completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </p>
          <p
            style={{
              ...styles.description,
              textDecoration: completed ? "line-through" : "none",
            }}
          >
            {task.description}
          </p>
        </div>
      </div>
      <div style={{ flexDirection: "row" }}>
        {!editing && (
          <img
            src="/assets/check.png"
            style={{
              ...styles.checkMark,
              filter: completed ? "grayscale(0%)" : "grayscale(100%)",
            }}
            onClick={() => {
              handleUpdateDoneTask();
              setCompleted(!completed);
            }}
          />
        )}
        {editing && (
          <div
            style={{
              width: "20%",
              marginLeft: "20px",
            }}
          >
            <img
              src="/assets/delete.png"
              style={styles.smallButton}
              onClick={handleDelete}
            />
            <img
              src="/assets/edit.png"
              style={styles.smallButton}
              onClick={handleUpdateTask}
            />
            <img
              src="/assets/cancel.png"
              style={styles.smallButton}
              onClick={() => setEditing(!editing)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "150px",
    // width: "45%",
    borderRadius: "20px",
    boxShadow: "rgba(6,57,112, 0.42) 0px 10px 20px -5px",
    marginBottom: "20px",
    padding: "10px",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  checkMark: {
    height: "80px",
    width: "80px",
    filter: "grayscale(100%)", //make this normal on click and task image grey
    marginRight: "20px",
    // backgroundColor: "grey",
  },
  description: {
    fontSize: "18px",
    marginBottom: "0px",
    color: "rgba(6,57,112, 0.42)",
    marginTop: "0px",
    maxWidth: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  imgTextHolder: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "10px",
    flexWrap: "wrap",
    width: "80%",
    marginLeft: "5px",
    // backgroundColor: "yellow",
  },
  taskCategoryImage: {
    height: "115px",
    width: "115px",
    borderRadius: "30px",
  },
  textOnly: {
    padding: "20px",
    paddingLeft: "30px",
    // backgroundColor: "red",
    maxWidth: "60%",
  },
  time: {
    fontSize: "20px",
    marginBottom: "0px",
  },
  title: {
    fontSize: "20px",
    marginBottom: "0px",
    marginTop: "0px",
    // backgroundColor: "blue",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  smallButton: {
    height: "40px",
    width: "40px",
    marginRight: "-12px",
    paddingTop: "5px",
  },
};

export default TaskComponent;
