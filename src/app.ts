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

  app.use('/api/pedidos', pedidosRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  logger.info('Aplicación configurada');
  return app;
};

