import { Router } from 'express';
const router = Router();
import auth from '../middlewares/auth.js';
import { createCar, getCars, getCar, updateCar, deleteCar } from '../controllers/carControllers.js';
import upload from '../middlewares/upload.js';

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Create a new car
 *     description: Add a new car to the database. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Toyota Camry"
 *               model:
 *                 type: string
 *                 example: "2022"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Car created successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/', upload.array('images', 10), auth, createCar);

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars
 *     description: Retrieve a list of all cars. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "car123"
 *                   name:
 *                     type: string
 *                     example: "Toyota Camry"
 *                   model:
 *                     type: string
 *                     example: "2022"
 */
router.get('/', auth, getCars);

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Get a specific car
 *     description: Retrieve details of a specific car by ID. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car details
 *       404:
 *         description: Car not found
 */
router.get('/:id', auth, getCar);

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Update a car
 *     description: Update details of a specific car by ID. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Toyota Camry"
 *               model:
 *                 type: string
 *                 example: "2022"
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       404:
 *         description: Car not found
 */
router.put('/:id', auth, updateCar);

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete a car
 *     description: Remove a car from the database by ID. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 */
router.delete('/:id', auth, deleteCar);

export default router;
