import { Request, Response, Router } from 'express';

import tableName from './tableName.routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Service 1.0.0');
});

router.use('/api/table-name', tableName);

export default router;
