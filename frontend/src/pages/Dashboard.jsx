import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");

  // NEW
  const [search, setSearch] = useState("");

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
        toast.error("Failed to fetch user: " + data.message);
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
      toast.info("Please Login to access functionality!");
      navigate("/login");
    } else {
      fetchUser();
      fetchTasks();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("primetradeaitoken");
    navigate("/login");
    toast.success("Logged Out Successfully");
  };

  const handleAddTask = async () => {
    if (!newTaskTitle) {
      toast.info("Please add task title ");
      return;
    }

    if (!newTaskDesc) {
      toast.info("Please add task description ");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTaskTitle,
          description: newTaskDesc,
        }),
      });

      const task = await res.json();

      setTasks([task, ...tasks]);

      setNewTaskTitle("");
      setNewTaskDesc("");

      toast.success("Task added successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Task Deleted Successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completed: !task.completed,
          }),
        }
      );

      const updatedTask = await res.json();

      setTasks(
        tasks.map((t) => (t._id === task._id ? updatedTask : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // NEW SEARCH
  const filteredTasks = tasks.filter((task) => {
    const query = search.toLowerCase();

    return (
      task.title.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query)
    );
  });

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
  <Navbar />

  <div className="max-w-7xl mx-auto px-6 py-10">

    {/* Header */}
    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

      <div>

        <h2 className="text-5xl font-extrabold text-gray-800 mt-2">
          👋 Welcome Back {user?.name || "User"}
        </h2>
      </div>

      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-7 py-3 rounded-xl shadow-lg hover:scale-105 duration-300"
      >
        Logout
      </button>

    </div>

    {/* Statistics */}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

      <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl duration-300">

        <p className="text-gray-500">
          📋 Total Tasks
        </p>

        <h2 className="text-5xl font-bold text-blue-600 mt-3">
          {tasks.length}
        </h2>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl duration-300">

        <p className="text-gray-500">
          ✅ Completed
        </p>

        <h2 className="text-5xl font-bold text-green-500 mt-3">
          {tasks.filter((t) => t.completed).length}
        </h2>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl duration-300">

        <p className="text-gray-500">
          ⏳ Pending
        </p>

        <h2 className="text-5xl font-bold text-orange-500 mt-3">
          {tasks.filter((t) => !t.completed).length}
        </h2>

      </div>

    </div>

    {/* Search */}

    <div className="mb-8">

      <input
        type="text"
        placeholder="🔍 Search your tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-2xl border-0 bg-white shadow-lg px-6 py-4 text-lg outline-none focus:ring-4 focus:ring-indigo-200 transition"
      />

    </div>

    {/* Add Task */}

    <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        ✨ Create New Task
      </h2>

      <div className="grid md:grid-cols-3 gap-5">

        <input
          type="text"
          placeholder="Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="rounded-xl border border-gray-200 p-4 outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          placeholder="Task Description"
          value={newTaskDesc}
          onChange={(e) => setNewTaskDesc(e.target.value)}
          className="rounded-xl border border-gray-200 p-4 outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={handleAddTask}
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-lg font-semibold hover:scale-105 duration-300"
        >
          + Add Task
        </button>

      </div>

    </div>

    {/* Task Grid */}

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
            {filteredTasks.map((task) => (
        <div
          key={task._id}
          className={`rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border ${
            task.completed
              ? "bg-gradient-to-br from-green-50 to-green-100 border-green-200"
              : "bg-white border-gray-100"
          }`}
        >
          {/* Status Badge */}
          <div className="flex justify-between items-start mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                task.completed
                  ? "bg-green-500 text-white"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>

          {/* Task Title */}
          <h2 className={`text-2xl font-bold mb-3 break-words ${
           task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
           {task.title.length > 17 ? task.title.substring(0, 17) + "..." : task.title}</h2>

          {/* Description */}
          <p className="text-gray-600 leading-7 min-h-[60px] break-words">
            {task.description.length > 17 ? task.description.substring(0, 17) + "..." : task.description}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">

            <button
              onClick={() => handleToggleComplete(task)}
              className={`flex-1 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 ${
                task.completed
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {task.completed ? "↩ Undo" : "✔ Done"}
            </button>

            <button
              onClick={() => handleDelete(task._id)}
              className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              🗑 Delete
            </button>

          </div>
        </div>
      ))}
    </div>

    {/* Empty State */}

    {filteredTasks.length === 0 && (
      <div className="flex flex-col items-center justify-center mt-20">

        <img
          src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
          alt="No Tasks"
          className="w-52 mb-6"
        />

        <h2 className="text-3xl font-bold text-gray-700">
          No Tasks Found
        </h2>

        <p className="text-gray-500 mt-3 text-lg">
          {search
            ? "Try searching with another keyword."
            : "Create your first task to get started!"}
        </p>

      </div>
    )}

  </div>
</div>
  );
};

export default Dashboard;
