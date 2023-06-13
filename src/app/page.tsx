"use client";

import React, { useState } from "react";
import Label from "@/components/Label";
import Table from "@/components/Table";
import { Card } from "@/components/Card";

import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

interface Task {
  title: string;
  time: number;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [timeRequired, setTimeRequired] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [errOpen, setErrOpen] = React.useState(false);

  const handleErrOpen = () => {
    setErrOpen(true);
  };
  const handleErrClose = () => {
    setErrOpen(false);
  };

  const handleAddTask = () => {
    if (taskTitle.trim() === "" || timeRequired.trim() === "") {
      setErrorMessage("Task title and time required should not be empty");
      setErrOpen(true);
      return;
    }

    const numericValue = parseInt(timeRequired, 10);
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 24) {
      setErrorMessage(
        "Time required should be a numeric value between 0 and 24"
      );
      setErrOpen(true);
      return;
    }

    if (taskTitle.length > 128) {
      setErrorMessage("Task title should not exceed 128 characters");
      setErrOpen(true);
      return;
    }

    const newTask: Task = {
      title: taskTitle,
      time: numericValue,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskTitle("");
    setTimeRequired("");
    setErrorMessage("");
  };

  const handleDeleteTask = (index: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  };

  const calculateTotalTasks = () => tasks.length;

  const calculateTotalDays = () => {
    const totalHours = tasks.reduce((total, task) => total + task.time, 0);
    const totalDays = Math.ceil(totalHours / 8);
    return totalDays;
  };

  const calculateTotalHours = () =>
    tasks.reduce((total, task) => total + task.time, 0);
    

  return (
    <div>
      <Label content={"Task Management App"} size={24} bold={true} />
      <div style={{ display: "flex", margin: "20px 0px" }}>
        <Card type_id={0} value={calculateTotalTasks().toString().padStart(3, "0")} />
        <Card type_id={0} value={calculateTotalDays().toString().padStart(3, "0")} />
        <Card type_id={0} value={calculateTotalHours().toString().padStart(3, "0")} />
      </div>
      <div style={{ display: "flex", marginBottom: "20px"}}>
        <div
          style={{ width: "200px", display: "flex", flexDirection: "column" }}
        >
          <Label content={"Task title"} size={12} bold={false} />
          <OutlinedInput
            placeholder="Should not be empty"
            sx={{ height: "40px" }}
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>
        <div
          style={{
            width: "200px",
            marginLeft: "40px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Label content={"Time Required(in Hrs)"} size={12} bold={false} />
          <OutlinedInput
            placeholder="Should be between 0-24"
            sx={{ height: "40px" }}
            value={timeRequired}
            onChange={(e) => setTimeRequired(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          onClick={handleAddTask}
          style={{ marginTop: "12px", marginLeft: "40px" }}
        >
          Add
        </Button>
      </div>
      <Dialog
        open={errOpen}
        onClose={handleErrClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrClose} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      <Table tasks={tasks} onDeleteTask={handleDeleteTask}/>
    </div>
  );
}
