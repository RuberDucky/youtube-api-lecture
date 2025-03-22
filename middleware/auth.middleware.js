import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const User = db.user;

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: 'Unauthorized', error: error.message });
    }
};

export default verifyToken;
