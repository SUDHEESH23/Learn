const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    text: {
    type: String,   // The task description is text
    required: true, // It cannot be empty
    trim: true      // Automatically removes extra spaces
  },
  completed: {
    type: Boolean,
    default: false  // New tasks are not finished by default
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the date when created
  }
})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task; 