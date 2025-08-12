import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Microservicio de Pedidos',
      version: '1.0.0',
      description: 'API para recibir pedidos desde la app móvil',
    },
    servers: [{ url: '/'}],
  },
  apis: ['src/docs/*.yml', 'src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
