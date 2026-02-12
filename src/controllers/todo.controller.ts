import { Request, RequestHandler, Response } from 'express';
import { Todo, TodoInstance } from '../models/todo.model';

export const getAll: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const list: TodoInstance[] = await Todo.findAll();
        res.status(200).json({ list });
    } catch (error: unknown) {
        console.log('Sequelize Error', error);
        res.status(500).json({ error: 'Ocorreu um erro interno.' });
    }
};

export const create: RequestHandler = async (req: Request, res: Response): Promise<void> => { };

export const update: RequestHandler = async (req: Request, res: Response): Promise<void> => { };

export const remove: RequestHandler = async (req: Request, res: Response): Promise<void> => { };