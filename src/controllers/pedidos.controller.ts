import { Request, Response, NextFunction } from 'express';
import { CrearCuentaInput } from '../schemas/pedido.schema';

export const crearCuenta = async (
  req: Request<unknown, unknown, CrearCuentaInput>,
  res: Response,
  _next: NextFunction
) => {
  const payload = req.body;

  // Aquí podrías agregar lógica para encolar, guardar en DB o enviar a otro servicio.
  // Por ahora, simplemente devolvemos un acuse de recibo con eco de los datos validados.

  const now = new Date().toISOString();
  return res.status(201).json({
    message: 'Pedido recibido',
    receivedAt: now,
    data: payload,
  });
};
