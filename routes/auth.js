import { Router } from 'express';
const router = Router();
import { signup, login } from '../controllers/authControllers.js';

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              username:
 *                type: string
 *               example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *       400:
 *         description: Invalid input data
 */
router.post('/signup', signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticate a user with their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "jwt-token-here"
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

export default router;
