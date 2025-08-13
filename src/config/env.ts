import 'dotenv/config';

export type AppConfig = {
  port: number;
  environment: 'development' | 'test' | 'production';
  serviceName: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
};

export const getConfig = (): AppConfig => {
  const port = Number(process.env.PORT || 3000);
  const environment = (process.env.NODE_ENV || 'development') as AppConfig['environment'];
  const serviceName = process.env.SERVICE_NAME || 'puertomarisco-pedidos';
  const logLevel = (process.env.LOG_LEVEL || (environment === 'development' ? 'debug' : 'info')) as AppConfig['logLevel'];

  return { port, environment, serviceName, logLevel };
};
