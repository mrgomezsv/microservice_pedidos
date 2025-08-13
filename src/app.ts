import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import pedidosRouter from './routes/pedidos.routes';
import { notFoundHandler } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';
import { requestId } from './middlewares/requestId';
import { logger, morganStream } from './utils/logger';
import { crearCuenta } from './controllers/pedidos.controller';
import { crearCuentaSchema } from './schemas/pedido.schema';
import { z, ZodIssue } from 'zod';

export const createApp = () => {
  const app = express();

  app.set('trust proxy', true);

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '1mb' }));
  app.use(requestId);
  app.use(morgan('combined', { stream: morganStream }));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Rutas según documentación externa
  const getQuerySchema = z.object({
    mctrstNumero: z.union([z.string(), z.number()]).optional(),
    page: z.coerce.number().int().positive().default(1),
    per_page: z.coerce.number().int().positive().max(100).default(10),
  });

  app.post('/API/RESTAURANTE/CUENTASRST', (req, res, next) => {
    const parse = crearCuentaSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(422).json({
        error: 'Error de validación',
        details: parse.error.issues.map((e: ZodIssue) => ({ path: e.path.join('.'), message: e.message })),
      });
    }
    req.body = parse.data as any;
    return crearCuenta(req as any, res, next);
  });

  app.get('/API/RESTAURANTE/CUENTASRST', (req, res) => {
    const result = getQuerySchema.safeParse(req.query);
    if (!result.success) {
      return res.status(422).json({
        error: 'Error de validación',
        details: result.error.issues.map((e: ZodIssue) => ({ path: e.path.join('.'), message: e.message })),
      });
    }
    return res.status(501).json({ error: 'No implementado', query: result.data });
  });

  app.use('/api/pedidos', pedidosRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  logger.info('Aplicación configurada');
  return app;
};

