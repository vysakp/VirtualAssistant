const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const TaskModel = require("./Task");
const NoteModel = require("./Note");
const EventModel = require("./Event");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  dbName: "ssdproject",
});

app.post("/addTask", async (req, res) => {
  console.log(req.body);
  const task = req.body;
  const newTask = TaskModel(task);
  await newTask.save();
  res.json(task);
});

app.post("/getTasks", (req, res) => {
  TaskModel.find({ username: req.body.username }, (err, result) => {
    if (err) {
      console.log("error");
      res.json(err);
    } else {
      res.json(result);
    }
  }).sort({ _id: -1 });
});

app.post("/getTask", (req, res) => {
  TaskModel.findOne({ _id: req.body.id }, (err, result) => {
    if (err) {
      console.log("error");
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/updateTask", (req, res) => {
  console.log(req.body.id);
  TaskModel.updateOne(
    { _id: req.body.id },
    {
      title: req.body.title,
      isDone: req.body.isDone,
      description: req.body.description,
      category: req.body.category,
      time: req.body.time,
    },
    (err, result) => {
      if (err) {
        console.log("error");
        res.json(err);
      } else {
        console.log("RESULT:" + result);
        res.json("Successfully updated !");
      }
    }
  );
});

app.post("/updateTaskDone", (req, res) => {
  console.log(req.body.id);
  TaskModel.findOne({ _id: req.body.id }, (err, result) => {
    if (err) {
      console.log("error");
      res.json(err);
    } else {
      // res.json(result);
      TaskModel.updateOne(
        { _id: req.body.id },
        {
          isDone: !result.isDone,
        },
        (err, result) => {
          if (err) {
            console.log("error");
            res.json(err);
          } else {
            console.log("RESULT:" + result);
            res.json("Successfully updated !");
          }
        }
      );
    }
  });
});

app.post("/deleteTask", (req, res) => {
  TaskModel.deleteOne({ _id: req.body.id }, (err, result) => {
    if (err) {
      console.log("error");
      res.json(err);
    } else {
      console.log(result);
      res.json("Successfully updated !");
    }
  });
});

//-----FOR NOTES-------
app.post("/addNote", async (req, res) => {
  console.log(req.body);
  const note = req.body;
  const newNote = NoteModel(note);
  await newNote.save();
  res.json(note);
});

app.post("/getNotes", (req, res) => {
  NoteModel.find({ username: req.body.username }, (err, result) => {
    if (err) {
      console.log("error");
      res.json(err);
    } else {
      res.json(result);
    }
  }).sort({ _id: -1 });
});

app.post("/updateNote", (req, res) => {
  console.log(req.body.id);
  NoteModel.updateOne(
    { _id: req.body.id },
    {
      title: req.body.title,
      description: req.body.description,
      time: req.body.time,
    },
    (err, result) => {
      if (err) {
        console.log("error");
        res.json(err);
      } else {
        res.json("Successfully updated !");
      }
    }
  );
});

app.post("/deleteNote", (req, res) => {
  NoteModel.deleteOne({ _id: req.body.id }, (err, result) => {
    if (err) {
      console.log("error");
      res.json(err);
    } else {
      console.log(result);
      res.json("Successfully updated !");
    }
  });
});

//-----EVENTS-----
app.post("/addEvent", async (req, res) => {
  console.log(req.body);
  const event = req.body;
  const newEvent = EventModel(event);
  await newEvent.save();
  res.json(event);
});

app.post("/getEvents", (req, res) => {
  EventModel.find({ username: req.body.username }, (err, result) => {
    if (err) {
      console.log("error");
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/deleteEvent", (req, res) => {
  EventModel.deleteOne(
    { username: req.body.username, date: req.body.date },
    (err, result) => {
      if (err) {
        console.log("error");
        res.json(err);
      } else {
        console.log(result);
        res.json("Successfully updated !");
      }
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log("server working");
});
