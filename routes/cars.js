import { Router } from 'express';
const router = Router();
import auth from '../middlewares/auth.js';
import { createCar, getCars, getCar, updateCar, deleteCar } from '../controllers/carControllers.js';

router.post('/', auth, createCar);
router.get('/', auth, getCars);
router.get('/:id', auth, getCar);
router.put('/:id', auth, updateCar);
router.delete('/:id', auth, deleteCar);

export default router;
