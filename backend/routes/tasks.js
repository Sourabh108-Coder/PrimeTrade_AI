const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});


router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description, user: req.user.id });
  await task.save();
  res.json(task);
});


router.put("/:id", auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (task.user.toString() !== req.user.id) return res.status(401).json({ message: "Not authorized" });

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

  await task.save();
  res.json(task);
});


router.delete("/:id", auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (task.user.toString() !== req.user.id) return res.status(401).json({ message: "Not authorized" });

  await task.deleteOne();
  res.json({ message: "Task removed" });
});

module.exports = router;
