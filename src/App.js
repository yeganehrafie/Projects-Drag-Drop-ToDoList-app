
import React, { useState,useEffect } from 'react';
import './App.css';
import TaskList from './component/TaskList';

const App = () => {

  const [tasks, setTasks] = useState(() => {
    const taskTodo = localStorage.getItem("tasks");
    return taskTodo ? JSON.parse(taskTodo) : [];
  });

 // بارگذاری تسک‌ها از Local Storage
 useEffect(() => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(storedTasks || []);
}, []);

// ذخیره‌سازی تسک‌ها در Local Storage
useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);

const addTask = (taskText) => {
  const newTask = { text: taskText, completed: false };
  setTasks((prevTasks) => [...prevTasks, newTask]);
};

  return (
    <div className="container">
      <TaskList tasks={tasks} setTasks={setTasks} addTask={addTask} />
    </div>
  );
};

export default App;
