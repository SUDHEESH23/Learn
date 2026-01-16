const express = require('express');
const router = express.Router();
const { getTask, getAllTasks, createTask, deleteTask, updateTask } = require('../controllers/taskController');

router.get('/:id', getTask);
router.get('/', getAllTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

module.exports = router;