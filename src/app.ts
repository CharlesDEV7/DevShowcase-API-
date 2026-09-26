import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middlewares/error-handler';
import { openapi, swaggerHtml } from './openapi';

export const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (_q, r) => r.json({ status: 'ok', message: 'DevShowcase API funcionando' }));
app.get('/openapi.json', (_q, r) => r.json(openapi));
app.get('/docs', (_q, r) => r.type('html').send(swaggerHtml));
app.use('/api', routes);
app.use((_q, r) => r.status(404).json({ error: 'NotFound', message: 'Rota não encontrada' }));
app.use(errorHandler);
