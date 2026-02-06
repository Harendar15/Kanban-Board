import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/login.js';
import KanbanBoard from './components/kanbanBoard.js';
import API from "./services/api.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tasks, setTasks] = useState([]);

 useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get(`/api/tasks`);
        setIsAuthenticated(true);
        fetchTasks();
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      toast.error('Failed to load tasks. Please try again.');
      console.error('Error fetching tasks', err);
    }
  };


  const logout = async () => {
    try {
      await API.post('/auth/logout');
      toast.success('Logged out successfully!');
        setTimeout(() => {
        setIsAuthenticated(false);
        setTasks([]);
      }, 500);
    } catch (err) {
      toast.error('Logout failed. Please try again.');
      console.error('Logout failed', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Login setIsAuthenticated={setIsAuthenticated} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <KanbanBoard tasks={tasks} fetchTasks={fetchTasks} logout={logout} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </DndProvider>
  );
}

export default App;