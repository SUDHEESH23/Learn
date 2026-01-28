const express = require('express');
const router = express.Router();
const { getTask, getAllTasks, createTask, deleteTask, updateTask, updateTaskStatus } = require('../controllers/taskController');

router.get('/:id', getTask);
router.get('/', getAllTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);
router.patch('/:id', updateTaskStatus);

module.exports = router;