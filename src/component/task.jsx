import React from "react";

const Task = ({ task }) => {
  const dragStart = (event) => {
    event.dataTransfer.setData("text", task);
  };

  return (
    <li draggable="true" onDragStart={dragStart}>
      {task}
    </li>
  );
};

export default Task;
