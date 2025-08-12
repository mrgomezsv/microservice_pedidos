import type { ZodIssue } from 'zod';
import { Router } from 'express';
import { crearCuenta } from '../controllers/pedidos.controller';
import { crearCuentaSchema } from '../schemas/pedido.schema';

const router = Router();

router.post('/cuentas', (req, res, next) => {
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

export default router;
