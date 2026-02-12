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

export const create: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { title, done }: {
        title: string;
        done?: boolean;
    } = req.body;

    const IS_TITLE_NOT_SENT: boolean = !title || title.trim() === '';

    if (IS_TITLE_NOT_SENT) {
        res.status(400).json({ error: 'O campo "title" é obrigatório.' });
        return;
    }

    const IS_DONE_NOT_BOOLEAN: boolean = done !== undefined && typeof done !== 'boolean';

    if (IS_DONE_NOT_BOOLEAN) {
        res.status(400).json({ error: 'O campo "done" deve ser um booleano.' });
        return;
    }

    try {
        const todo: TodoInstance = await Todo.create({
            title,
            done: done ?? false
        });
        res.status(201).json({ todo });
    } catch (error: unknown) {
        console.log('Sequelize Error', error);
        res.status(500).json({ error: 'Ocorreu um erro interno.' });
    }
};

export const update: RequestHandler = async (req: Request, res: Response): Promise<void> => { };

export const remove: RequestHandler = async (req: Request, res: Response): Promise<void> => { };