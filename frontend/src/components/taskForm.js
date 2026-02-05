import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { toast } from 'react-toastify';
import API from "../services/api";

function TaskForm({ task, fetchTasks, setShowForm }) {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (task) {
        await API.put(`/api/tasks/${task._id}`, { title, description });
        toast.success('Task updated successfully!');
      } else {
        await API.post('/api/tasks', { title, description });
        toast.success('Task created successfully!');
      }
      fetchTasks();
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save task.');
      console.error('Error saving task', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={() => setShowForm(false)} maxWidth="sm" fullWidth>
      <DialogTitle>{task ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent>
        <TextField className="task-title"
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
          disabled={loading}
        />
        <TextField className="task-description"
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          disabled={loading}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowForm(false)} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskForm;