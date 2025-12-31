import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");

  const token = localStorage.getItem("primetradeaitoken");

  
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      } else {
        alert("Failed to fetch user: " + data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchUser();
      fetchTasks();
    }
  }, []);

 
  const handleLogout = () => {
    localStorage.removeItem("primetradeaitoken");
    navigate("/login");
  };

  
  const handleAddTask = async () => {
    if (!newTaskTitle)
      {
        alert("Task title cannot be empty");
        return;
      } 
    if(!newTaskDesc){
      alert("Task description cannot be empty");
      return;
    } 
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTaskTitle, description: newTaskDesc }),
      });
      const task = await res.json();
      setTasks([task, ...tasks]);
      setNewTaskTitle("");
      setNewTaskDesc("");
      alert("Task added successfully");
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

 
  const handleToggleComplete = async (task) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-3 md:mb-0">
              Welcome, {user?.name || "User"}!
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          
          <div className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
            <input
              type="text"
              placeholder="Task Title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-grow p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Task Description..."
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
              className="flex-grow p-2 border rounded"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`p-4 rounded shadow-md flex flex-col justify-between ${
                  task.completed ? "bg-green-100" : "bg-white"
                }`}
              >
                <div>
                  <h2
                    className={`font-semibold text-gray-800 ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.title}
                  </h2>
                  {task.description && (
                    <p className="text-gray-600 mt-1">{task.description}</p>
                  )}
                </div>
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className={`px-2 py-1 rounded ${
                      task.completed
                        ? "bg-yellow-400 text-white hover:bg-yellow-500"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {task.completed ? "Undo" : "Done"}
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No tasks yet. Add one above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
