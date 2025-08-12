## Microservicio de Pedidos (Express + TypeScript)

Microservicio para recibir pedidos desde una aplicación móvil. Expone un endpoint para crear cuentas/pedidos y documentación Swagger.

### Requisitos
- Node.js 18+ recomendado
- npm

### Instalación
```bash
npm install
```

### Scripts
- `npm run dev`: inicia el servidor en desarrollo con recarga
- `npm run build`: compila TypeScript a `dist/`
- `npm start`: ejecuta el compilado desde `dist/`

### Variables de entorno
- `PORT` (opcional): puerto del servidor. Por defecto `3000`.
- `SERVICE_NAME` (opcional): nombre del servicio. Por defecto `micro-pedidos`.
- `LOG_LEVEL` (opcional): `debug` | `info` | `warn` | `error`. Por defecto `debug` en dev, `info` en prod.

Crea un archivo `.env` en la raíz si deseas configurarlas:
```env
PORT=3000
SERVICE_NAME=micro-pedidos
LOG_LEVEL=debug
```

### Endpoints
- Salud: `GET /health`
- Documentación: `GET /docs`
- Crear cuenta/pedido: `POST /api/pedidos/cuentas`

#### Crear cuenta/pedido
Recibe un JSON con los datos del pedido. Validación con Zod.

- Campos requeridos: `arerstCodigo`, `msorstCodigo`, `cliNumero`, `cjavNumero`, `tdvnCodigo`, `detCuentaRst` (al menos 1), `lstAbonosRst` (al menos 1).
- Teléfono: `mctrstTelefonoEntregaPedido` debe tener 8 dígitos (ej. `71234567`).
- `mctrstCanalDeContacto`: 0 (Llamada), 1 (Whatsapp), 2 (Facebook). Por defecto: 0.

Ejemplo mínimo:
```json
{
  "arerstCodigo": "AR-01",
  "msorstCodigo": "M-12",
  "cliNumero": "C-1001",
  "cjavNumero": "CJ-1",
  "tdvnCodigo": "TDV-1",
  "detCuentaRst": [
    { "proCodigo": "P-10" }
  ],
  "lstAbonosRst": [
    { "tabCodigo": "AB-1" }
  ]
}
```

Ejemplo completo:
```json
{
  "mctrstNumero": "12345",
  "arerstCodigo": "AR-01",
  "msorstCodigo": "M-12",
  "cliNumero": "C-1001",
  "cjavNumero": "CJ-1",
  "mctrstNumComensales": 3,
  "mctrstNota": "Sin cebolla",
  "mctrstDireccionEntregaPedido": "Av. Principal 123",
  "mctrstTelefonoEntregaPedido": "71234567",
  "mctrstInstruccionesEntregaPedido": "Tocar timbre 2 veces",
  "mctrstCanalDeContacto": 1,
  "mctrstEsPedidoCallCenter": false,
  "mctrstNoAplicarDescuentoEnPropina": false,
  "tdvnCodigo": "TDV-1",
  "detCuentaRst": [
    {
      "proCodigo": "P-10",
      "lstModificadoresRst": [
        { "mdfrstCodigo": "MD-1" }
      ]
    }
  ],
  "lstAbonosRst": [
    {
      "tabCodigo": "EFECTIVO",
      "dcarstMontoAbonoPropio": 20.5,
      "dcarstMontoAbonoAjeno": 0,
      "dcarstObservaciones": "Pago exacto"
    }
  ]
}
```

Respuesta 201:
```json
{
  "message": "Pedido recibido",
  "receivedAt": "2025-08-12T19:49:47.565Z",
  "data": { "... eco de los datos validados ..." }
}
```

Errores comunes:
- 422: Error de validación (estructura o tipos inválidos)
- 404: Ruta no encontrada
- 500: Error interno del servidor

### Swagger
- UI: `http://localhost:3000/docs`
- Especificación generada desde `src/docs/swagger.ts` y `src/docs/pedidos.yml`.

### Estructura del proyecto
```
src/
  app.ts                # Configuración de Express, middlewares, rutas y Swagger
  index.ts              # Punto de arranque
  config/
    env.ts              # Configuración de entorno
  controllers/
    pedidos.controller.ts
  routes/
    pedidos.routes.ts
  schemas/
    pedido.schema.ts    # Validaciones Zod
  middlewares/
    errorHandler.ts
    notFound.ts
    requestId.ts
  docs/
    swagger.ts
    pedidos.yml         # OpenAPI para pedidos
  utils/
    logger.ts
```

### Ejecución
- Desarrollo:
```bash
npm run dev
```
- Producción:
```bash
npm run build
npm start
```

### Notas
- Este servicio solo recibe datos del pedido y devuelve acuse de recibo. La integración con persistencia/colas se puede agregar posteriormente.
- El formato de teléfono para entregas es de 8 dígitos sin prefijo ni espacios (ej.: `71234567`).
