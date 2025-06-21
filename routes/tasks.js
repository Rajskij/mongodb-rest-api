import express from 'express';
import Task from '../model/task.js';
import errorHandler from '../utils/utils.js';

const router = express.Router();

router
    .route('/')
    .get(async (req, res) => {
        await errorHandler(async () => {
            const response = await Task.find();
            res.status(200).json(response);
        });
    })
    .post(async (req, res) => {
        const body = req.body;
        await errorHandler(async () => {
            const task = await Task.create({
                title: body.title,
                status: body.status,
                assigned_to: body.userId,
                project_id: body.projectId,
                due_date: body.dueDate
            });
            res.status(201).json(task);
        });
    });

router
    .route('/status')
    .get(async (req, res) => {
        if (!req.query.status) {
            return res.status(400).json({ error: 'Status query parameter is required' });
        }
        await errorHandler(async () => {
            const result = await Task.aggregate([
                {
                    $match: {
                        status: req.query.status
                    }
                },
                {
                    $project: {
                        _id: 0,
                        title: 1,
                        status: 1
                    }
                }
            ]);

            res.status(200).json(result);
        });
    });

router
    .route('/:id')
    .get(async (req, res) => {
        await errorHandler(async () => {
            const task = await Task.findById({ _id: req.params.id });
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json(task);
        });
    })
    .patch(async (req, res) => {
        await errorHandler(async () => {
            const id = req.body.id;
            const newStatus = req.body.status;

            const result = await Task.findByIdAndUpdate(
                id,
                { status: newStatus },
                { new: true, runValidators: true }
            );
            res.status(200).json(result);
        });
    })
    .delete(async (req, res) => {
        await errorHandler(async () => {
            const result = await Task.deleteOne({ _id: req.params.id });

            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(204).send();
        });
    });

export default router;
