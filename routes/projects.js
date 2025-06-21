import express from 'express';
import Project from '../model/project.js';
import errorHandler, { isEmpty } from '../utils/utils.js';

const router = express.Router();

router
    .route('/')
    .get(async (req, res) => {
        await errorHandler(async () => {
            const response = await Project.find();
            res.status(200).json(response);
        });
    })
    .post(async (req, res) => {
        const body = req.body;
        await errorHandler(async () => {
            const project = await Project.create({
                name: body.name,
                description: body.description,
                start_date: body.startDate,
                end_date: body.endDate
            })
            res.status(201).json(project);
        });
    });

router
    .route('/:id')
    .get(async (req, res) => {
        await errorHandler(async () => {
            const project = await Project.findById({ _id: req.params.id });
            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }
            res.status(200).json(project);
        });
    })
    .patch(async (req, res) => {
        if (isEmpty(req.body)) {
            return res.status(400).json({ message: 'Request body should not be empty' });
        }
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;

        await errorHandler(async () => {
            const result = await Project.findByIdAndUpdate(
                req.params.id,
                {
                    start_date: req.body.startDate,
                    end_date: req.body.endDate
                },
                { new: true, runValidators: true }
            )
            if (!result) {
                return res.status(404).json({ error: 'Project not found' })
            }
            res.status(200).json(result);
        });
    })
    .delete(async (req, res) => {
        await errorHandler(async () => {
            const result = await Project.deleteOne({ _id: req.params.id });

            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Project not found' });
            }
            res.status(204).send();
        });
    });

export default router;
