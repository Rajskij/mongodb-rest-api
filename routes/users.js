import express from 'express';
import User from '../model/user.js';
import errorHandler, { isEmpty } from '../utils/utils.js';

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
    .put(async (req, res) => {
        await errorHandler(async () => {
            if (isEmpty(req.body)) {
                return res.status(400).json({ message: 'Request body should not be empty' });
            }
            
            const result = await User.findByIdAndUpdate(
                req.params.id,
                {
                    name: req.body.name,
                    email: req.body.email,
                    role: req.body.role,
                    phone: req.body.phone,
                },
                { new: true, isValidElement: true }
            );
            if (!result) {
                return res.status(404).json({ error: 'User not found' })
            }
            res.status(200).json(result);
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
