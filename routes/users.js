import express from 'express';
import User from '../model/user.js';
import errorHandler from '../utils/utils.js';

const router = express.Router();

router
    .route('/')
    .get(async (req, res) => {
        await errorHandler(async () => {
            const response = await User.find();
            res.status(200).json(response);
        });
    })
    .post(async (req, res) => {
        const body = req.body;
        await errorHandler(async () => {
            const user = await User.create({
                name: body.name,
                email: body.email,
                role: body.role,
                phone: body.phone
            })
            res.status(201).json(user);
        });
    });

router
    .route('/:id')
    .get(async (req, res) => {
        await errorHandler(async () => {
            const user = await User.findById({ _id: req.params.id });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        });
    })
    .patch(async (req, res) => {
        await errorHandler(async () => {
            res.send();
        });
    })
    .delete(async (req, res) => {
        await errorHandler(async () => {
            const result = await User.deleteOne({ _id: req.params.id });

            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(204).send();
        });
    });

export default router;
