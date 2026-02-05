import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import TaskForm from "./taskForm";
import API from "../services/api";
import "../App.css";


function TaskCard({ task, fetchTasks }) {


  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "task",
      item: task ? { id: task._id } : null,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [task]
  );

  
  if (!task) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await API.delete(`/api/tasks/${task._id}`);
      fetchTasks();
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete task.");
    } finally {
      setDeleting(false);
    }
  };

  if (editing) {
    return (
      <TaskForm
        task={task}
        fetchTasks={fetchTasks}
        setShowForm={setEditing}
      />
    );
  }

  return (
    <Card className="task-card"
      ref={drag}
      style={{
        
      }}
    >
      <CardContent>
        <Typography variant="h6" >{task.title}</Typography>
        <Typography >{task.description}</Typography>

        <Button className="action-buttons" onClick={() => setEditing(true)} size="small">
          Edit
        </Button>
        <Button className="action-buttons"
          onClick={handleDelete}
          color="error"
          disabled={deleting}
          size="small"
        >
          {deleting ? "Deleting..." : "Delete"}
        </Button>

      </CardContent>
    </Card>
  );
}

export default TaskCard;
