import { Request, RequestHandler, Response } from 'express';
import { User, UserInstance } from '../models/User';

export const ping: RequestHandler = (req: Request, res: Response): void => {
    res.json({ pong: true });
}

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const IS_EMAIL_AND_PASSWORD_NOT_SENT: boolean = !req.body.email || !req.body.password;

    if (IS_EMAIL_AND_PASSWORD_NOT_SENT) {
        res.status(400).json({ error: 'E-mail e/ou senha não enviados.' });
        return;
    }

    const { email, password } = req.body;

    const HAS_USER: UserInstance | null = await User.findOne({ where: { email } });

    if (HAS_USER) {
        res.status(409).json({ error: 'E-mail já existe.' });
        return;
    }

    const newUser: UserInstance = await User.create({ email, password });

    res.status(201).json({ id: newUser.id });
}

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const IS_EMAIL_AND_PASSWORD_NOT_SENT: boolean = !req.body.email || !req.body.password;

    if (IS_EMAIL_AND_PASSWORD_NOT_SENT) {
        res.status(400).json({ error: 'E-mail e/ou senha não enviados.' });
        return;
    }

    const { email, password } = req.body;

    const user: UserInstance | null = await User.findOne({
        where: { email, password }
    });

    if (!user) {
        res.status(401).json({ error: 'E-mail e/ou senha inválidos.' });
        return;
    }

    res.status(200).json({ status: true });
}

export const list: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const users: UserInstance[] = await User.findAll();
    const list: string[] = [];

    for (const user of users) {
        list.push(user.email);
    }

    res.status(200).json({ list });
}