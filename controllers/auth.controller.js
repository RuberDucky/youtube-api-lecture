import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const User = db.user;

class AuthController {
    async signup(req, res) {
        try {
            // Validate request
            const { firstName, lastName, email, password } = req.body;
            if (!firstName || !lastName || !email || !password) {
                return res
                    .status(400)
                    .json({ message: 'All fields are required' });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: 'Email already in use' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                
            });

            // Generate JWT token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '24h',
            });

            // Return user info without password
            res.status(201).json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error creating user',
                error: error.message,
            });
        }
    }

    async login(req, res) {
        try {
            // Validate request
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ message: 'Email and password are required' });
            }

            // Find user
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password,
            );
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '24h',
            });

            // Return user info
            res.status(200).json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error logging in',
                error: error.message,
            });
        }
    }
}

export default new AuthController();
