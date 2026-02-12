import { Router } from 'express';

import * as TodoController from '../controllers/todo.controller';

const router: Router = Router();

router.get('/todo', TodoController.getAll);
router.post('/todo', TodoController.create);
router.put('/todo/:id', TodoController.update);
router.delete('/todo/:id', TodoController.remove);

export default router;