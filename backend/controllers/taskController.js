const Task = require('../models/Task');

const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createTask = async (req, res) => {
    try{
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getTask,
    getAllTasks,
    createTask,
    deleteTask
};