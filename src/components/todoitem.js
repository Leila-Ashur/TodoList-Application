// src/Todo.js
import React, { useState, useEffect, useCallback } from "react";
import { useSpring, animated, config } from "react-spring";
import { FixedSizeList } from "react-window";
import styled from "styled-components";

const TodoContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  margin-right:750px;
`;

const TodoHeader = styled.h1`
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
`;

const TodoButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const TodoButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 3.3s ease, transform 2.2s ease;

  &:hover {
    background-color: #45a049;
    transform: scale(1.09);
  }
`;

const TodoItem = styled(animated.li)`
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &.completed {
    background-color: #d3ffd3;
  }

  p {
    margin: 0;
    flex-grow: 1;
  }

  input {
    margin-left: 10px;
    cursor: pointer;
  }
`;

const Todo = () => {
  const [items, setItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const result = await response.json();
      setItems(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleCompletedVisibility = () => {
    setShowCompleted(!showCompleted);
  };

  const refreshList = () => {
    fetchData();
  };

  const handleToggleComplete = useCallback(
    (itemId) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        )
      );
    },
    []
  );

  const itemAnimation = useSpring({
    opacity: 1,
    transform: "translateX(0%)",
    from: { opacity: 0, transform: "translateX(100%)" },
    config: config.gentle,
  });

  const Row = useCallback(
    ({ index, style }) => {
      const currentItem = items[index];

      if (!showCompleted && currentItem.completed) {
        return null;
      }

      return (
        <TodoItem
          key={currentItem.id}
          style={{ ...style, ...itemAnimation }}
          className={`todo-item ${currentItem.completed ? "completed" : ""}`}
        >
          <strong>{currentItem.title}</strong>
          <input
            type="checkbox"
            checked={currentItem.completed}
            onChange={() => handleToggleComplete(currentItem.id)}
          />
        </TodoItem>
      );
    },
    [items, showCompleted, itemAnimation, handleToggleComplete]
  );

  return (
    <TodoContainer>
      <TodoHeader>Todo List</TodoHeader>
      <TodoButtons>
        <TodoButton onClick={toggleCompletedVisibility}>
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </TodoButton>
        <TodoButton onClick={refreshList}>Refresh List</TodoButton>
      </TodoButtons>

      <FixedSizeList height={740} width={900} itemCount={items.length} itemSize={50}>
        {Row}
      </FixedSizeList>
    </TodoContainer>
  );
};

export default Todo;
