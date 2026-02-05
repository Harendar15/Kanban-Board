import  { useState } from 'react';
import { Grid, Paper, Typography, Button, Container } from '@mui/material';
import Column from './column';
import TaskForm from './taskForm';

function KanbanBoard({ tasks, updateTask, fetchTasks, logout }) {
  const columns = [
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "inprogress" },
  { label: "Completed", value: "completed" }
  ];
  const columnColors = {
  todo: "#7692FF",
  inprogress: "#ABD2FA",
  completed: "#3D518C"
  };


  const [showForm, setShowForm] = useState(false);

  return (

    <Container
        maxWidth={false}
        disableGutters
        style={{ marginTop: '20px', paddingLeft: "40px", paddingRight: "40px" }}
      >
      <Typography variant="h4" gutterBottom>
        Kanban Board
      </Typography>
      <Button
        variant="contained"
        onClick={() => setShowForm(true)}
        style={{ marginRight: '10px' }}
      >
        Add Task
      </Button>
      <Button variant="outlined" color="secondary" onClick={logout}>
        Logout
      </Button>
      {showForm && <TaskForm fetchTasks={fetchTasks} setShowForm={setShowForm} />}
      <Grid container spacing={2} style={{ marginTop: '20px' }} alignItems="flex-start">
        {columns.map((col) => (
          <Grid item xs={12} sm={6} md={4} key={col.value}>
            <Paper style={{ padding: '10px', minHeight: '400px' ,background: columnColors[col.value] }}>
              <Typography variant="h6" gutterBottom  className="column-title">
                {col.label}
              </Typography>
              <Column status={col.value} tasks={tasks.filter((t) => t.status === col.value)} updateTask={updateTask} fetchTasks={fetchTasks} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default KanbanBoard;