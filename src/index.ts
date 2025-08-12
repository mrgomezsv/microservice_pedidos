import { createApp } from './app';
import { getConfig } from './config/env';
import { logger } from './utils/logger';

const config = getConfig();
const app = createApp();

const port = Number(process.env.PORT || config.port || 3000);
app.listen(port, () => {
  logger.info(`Servidor iniciado en puerto ${port}`);
});
