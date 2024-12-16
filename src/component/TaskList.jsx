import React, { useState } from "react";

const TaskList = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { text: newTask, completed: false },
      ]);
      setNewTask("");
    } else {
      alert("لطفاً یک تسک وارد کنید.");
    }
  };
  const handleRemoveTask = (rm) => {
    const removeTask = [...tasks];
    removeTask.splice(rm, 1);
    setTasks(removeTask);
  };
  const allowDrop = (event) => {
    event.preventDefault();
  };

  const dropTask = (event, completed) => {
    event.preventDefault();
    const taskData = event.dataTransfer.getData("text");

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.text !== taskData);
      return [...updatedTasks, { text: taskData, completed }];
    });
  };

  const handleDragStart = (event, task) => {
    event.dataTransfer.setData("text", task.text);
  };

  return (
    <div className="task-list max-w-8xl min-w-3.5 ">
      <div className="title">
        <h1
          className="flex justify-start  items-start 
          text-indigo-800 font-bold  text-3xl tracking-wider mt-20  ml-40"
        >
          Task managment
        </h1>
        <div className="mt-10 flex justify-between max-w-6xl min-w-3.5 m-auto">
          <div
            className="list  shadow border-0 rounded-sm bg-white p-5 w-5/12"
            onDrop={(event) => dropTask(event, false)}
            onDragOver={allowDrop}
          >
            <h2 className="text-base font-semibold text-indigo-500">
              Task in progress
            </h2>
            <ul className="mt-5 rounded-sm">
              {tasks
                .filter((task) => !task.completed)
                .map((task, index) => (
                  <li
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                  >
                    <div className="flex justify-between bg-stone-100 p-2 mt-5 rounded-sm">
                      <p className="text-gray-900 text-lg font-base ">
                        {task.text}
                      </p>
                      <button
                        className=" p-3 border-0 outlin-none rounded-lg bg-red-500 text-white text-lg font-base"
                        onClick={handleRemoveTask}
                      >
                        delete
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Task......"
              className="mt-5 w-full p-3 border-2 border-gray-500 outline-none rounded-lg"
            />
            <button
              onClick={handleAddTask}
              className="mt-5 p-3 border-0 outlin-none rounded-lg bg-violet-500 text-white text-lg font-base "
            >
              Add a task
            </button>
          </div>
          <div
            className="list shadow border-0 rounded-sm bg-white p-5 w-5/12"
            onDrop={(event) => dropTask(event, true)}
            onDragOver={allowDrop}
          >
            <h2 className="text-base font-semibold text-indigo-500">
              Placement of tasks
            </h2>
            <ul className=" mt-5 rounded-sm">
              {tasks
                .filter((task) => task.completed)
                .map((task, index) => (
                  <li
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                  >
                    <div className="flex justify-between p-2 mt-5 rounded-sm bg-stone-100">
                      <p className="text-gray-900 text-lg font-base ">
                        {task.text}
                      </p>
                      <button
                        className=" p-3 border-0 outlin-none rounded-lg bg-red-500 text-white text-lg font-base"
                        onClick={handleRemoveTask}
                      >
                        delete
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
