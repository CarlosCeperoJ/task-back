const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { check, validationResult } = require('express-validator');
const { authenticate } = require('./auth'); 

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas con opción de filtrar por estado
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: string
 *         description: Filtra las tareas por estado (true para completadas, false para pendientes)
 *     responses:
 *       200:
 *         description: Lista de tareas filtradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID único de la tarea
 *                   title:
 *                     type: string
 *                     description: Título de la tarea
 *                   description:
 *                     type: string
 *                     description: Descripción de la tarea
 *                   completed:
 *                     type: boolean
 *                     description: Estado de la tarea
 *                   createdAt:
 *                     type: string
 *                     description: Fecha de creación
 */


// Obtener todas las tareas
// Obtener todas las tareas con filtro por estado
router.get('/', authenticate,async (req, res) => {
  try {
    const { completed } = req.query; // Obtenemos el parámetro "completed" de la query
    let query = {};

    if (completed !== undefined) {
      query.completed = completed === 'true'; // Convertimos el string a booleano
    }

    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/**
 * @swagger
 * /api/tasks/id:
 *   get:
 *     summary: Obtener una tarea
 *     responses:
 *       200:
 *         description: Una tarea
 */

router.get('/:id',authenticate, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la tarea
 *                 example: "Nueva tarea"
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea
 *                 example: "Descripción de la tarea"
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único de la tarea
 *                   example: "64dfc63e0d1234567890abcd"
 *                 title:
 *                   type: string
 *                   example: "Nueva tarea"
 *                 description:
 *                   type: string
 *                   example: "Descripción de la tarea"
 *                 completed:
 *                   type: boolean
 *                   example: false
 *                 createdAt:
 *                   type: string
 *                   example: "2024-12-28T22:20:30.123Z"
 *       400:
 *         description: Error en la validación
 */


router.post(
  '/',
  [
    check('title', 'Title is required').notEmpty()
  ],authenticate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = new Task({
      title: req.body.title,
      description: req.body.description,
    });

    try {
      const newTask = await task.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);


/**
 * @swagger
 * /api/tasks/id:
 *   put:
 *     summary: Actualizar tareas
 *     responses:
 *       200:
 *         description: Actualizar tareas
 */



router.put(
  '/:id',
  [
    check('title', 'Title is required').optional().notEmpty(),
    check('description', 'Description is required').optional().notEmpty(),
    check('completed', 'Completed must be a boolean').optional().isBoolean(),
  ],authenticate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /api/tasks/id:
 *   delete:
 *     summary: Eliminar tarea
 *     responses:
 *       200:
 *         description: Eliminar tarea
 */

// Eliminar una tarea
router.delete('/:id', authenticate,async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
