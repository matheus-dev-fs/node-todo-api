import { Request, RequestHandler, Response } from 'express';
import { Todo, TodoInstance } from '../models/todo.model';
import { validateUpdateFields } from '../utils/validation.utils';

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

export const update: RequestHandler = async (req: Request, res: Response): Promise<void> => { 
    const id = Number(req.params.id);
    const { title, done }: {
        title?: string;
        done?: boolean;
    } = req.body;

    const IS_ID_NOT_SENT: boolean = !id;
    const IS_ID_A_NOT_NUMBER: boolean = isNaN(id);

    if (IS_ID_NOT_SENT || IS_ID_A_NOT_NUMBER) {
        res.status(400).json({ error: 'O campo "id" é obrigatório e deve ser um número.' });
        return;
    }

    const validationError: string | null = validateUpdateFields(title, done);

    if (validationError) {
        res.status(400).json({ error: validationError });
        return;
    }

    try {
        const todo: TodoInstance | null = await Todo.findByPk(id);

        if (!todo) {
            res.status(404).json({ error: 'Todo não encontrado.' });
            return;
        }

        if (title !== undefined) {
            todo.title = title;
        }

        if (done !== undefined) {
            todo.done = done;
        }

        await todo.save();

        res.status(200).json({ todo });
    } catch (error: unknown) {
        console.log('Sequelize Error', error);
        res.status(500).json({ error: 'Ocorreu um erro interno.' });
    }
};

export const remove: RequestHandler = async (req: Request, res: Response): Promise<void> => { };