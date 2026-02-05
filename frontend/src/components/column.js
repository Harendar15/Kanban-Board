import { useDrop } from 'react-dnd';
import TaskCard from './taskCard';
import API from "../services/api";

function Column({ status, tasks, updateTask, fetchTasks }) {

  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: async (item) => {
      await API.patch(`/api/tasks/${item.id}/status`, { status });
      fetchTasks();
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        minHeight: '350px',
        backgroundColor: isOver ? 'lightblue' : 'transparent',
        padding: '10px',
      }}
    >
      {tasks.length === 0 && (
        <div className="empty-column">No tasks yet...! </div>
      )}

      {tasks
        .filter(Boolean)
        .map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            updateTask={updateTask}
            fetchTasks={fetchTasks}
          />
      ))}

    </div>
  );
}

export default Column;