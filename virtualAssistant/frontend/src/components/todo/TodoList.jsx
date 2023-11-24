import React from "react";
import { useState, useEffect } from "react";
import { ReactDOM } from "react";
import TaskComponent from "./TaskComponent";
import AddTaskComponent from "./AddTaskComponent";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function TodoList() {
  const [addingTask, setAddingTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [task, setTask] = useState();
  const [category, setCategory] = useState("study");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(new Date());
  const { currentUser } = useAuth();

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

  const handleAddTask = () => {
    console.log("Added task");
    window.location.reload(false);
  };
  const cancelAddTask = () => {
    setAddingTask(false);
    setEditing(false);
  };
  const handleUpdateTask = (id) => {
    console.log(id);
    const fetchSingleData = async () => {
      try {
        const response = await fetch("http://localhost:3001/getTask", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({ id: id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        console.log(json);
        setTask(json);
        setEditing(true);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchSingleData();
  };

  const handleUpdateDoneTask = (id) => {
    console.log(id);
    const fetchSingleData = async () => {
      try {
        const response = await fetch("http://localhost:3001/updateTaskDone", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({ id: id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        console.log(json);
        setTask(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchSingleData();
  };

  const completedUpdate = async () => {
    setEditing(false);
    window.location.reload(false);
  };

  if (!currentUser) return <Navigate replace to="/login" />;
  return (
    <div className="todoDiv">
      <h1 id="heading">To Do</h1>
      <h3 id="heading3">Your Tasklist</h3>
      {!addingTask &&
        !editing &&
        tasks.map((task, index) => (
          <TaskComponent
            key={index.toString()}
            task={{
              title: task.title,
              description: task.description,
              category: task.category,
              time: task.time,
              id: task._id,
              isDone: task.isDone,
            }}
            selectedId={selectedId}
            handleUpdateTask={() => handleUpdateTask(task._id)}
            handleUpdateDoneTask={() => handleUpdateDoneTask(task._id)}
          />
        ))}
      {addingTask && !editing && (
        <AddTaskComponent
          handleAddTask={handleAddTask}
          cancelAddTask={cancelAddTask}
          addingNow={addingTask}
        />
      )}
      {editing && !addingTask && (
        <AddTaskComponent
          handleAddTask={handleAddTask}
          cancelAddTask={cancelAddTask}
          completedUpdate={completedUpdate}
          addingNow={addingTask}
          updatingNow={editing}
          task={task}
        />
      )}
      {!addingTask && !editing && (
        <img
          src="/assets/add.png"
          style={styles.addButton}
          onClick={() => setAddingTask(true)}
        />
      )}
    </div>
  );
}

const styles = {
  addButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    height: "80px",
    width: "80px",
    boxShadow: "rgba(6,57,112, 0.42) 0px 10px 20px -5px",
    borderRadius: "40px",
  },
};

export default TodoList;
