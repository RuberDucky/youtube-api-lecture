import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

// Authentication routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

export default router;
