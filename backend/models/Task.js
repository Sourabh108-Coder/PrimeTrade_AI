const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
  title: { 
    type: String, 
    required: true 
  },

  description: { 
    type: String 
  },

  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },

  completed: { 
    type: Boolean, 
    default: false 
  },

}, { timestamps: true });


module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);
