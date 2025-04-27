import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("https://my-firebase-db.firebaseio.com/tasks.json");

      const formattedTasks = response.data
        ? Object.keys(response.data).map(key => ({
            id: key, 
            ...response.data[key] 
          }))
        : [];

      setTasks(formattedTasks);
      setError("");
    } catch (err) {
      setError("Error fetching tasks. Please try again.");
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name || "Unnamed Task"}</li> 
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
