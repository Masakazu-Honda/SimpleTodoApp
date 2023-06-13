import React, { useState } from 'react';
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

interface TableProps {
  tasks: Task[];
  onDeleteTask: (index: number) => void;
}

const Table: React.FC<TableProps> = ({ tasks, onDeleteTask }) => {
  const [delOpen, setDelOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(-1);

  const handleDelOpen = (index: number) => {
    setDeletingIndex(index);
    setDelOpen(true);
  };

  const handleDelClose = () => {
    setDelOpen(false);
  };

  const handleAgree = () => {
    if (deletingIndex !== -1) {
      onDeleteTask(deletingIndex);
      setDelOpen(false);
      setDeletingIndex(-1);
    }
  };

  return (
    <div>
      <Dialog
        open={delOpen}
        onClose={handleDelClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Do you want to delete the item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item? Please be aware that once you delete it, the action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelClose}>Cancel</Button>
          <Button onClick={handleAgree} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <table>
        <thead>
          <tr>
            <th style={{ width: "400px" }}>Task Title</th>
            <th style={{ width: "200px" }}>Time Required (in Hrs)</th>
            <th style={{ width: "100px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.title}</td>
              <td>{task.time}</td>
              <td>
                <Button
                  color="error"
                  onClick={() => handleDelOpen(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
