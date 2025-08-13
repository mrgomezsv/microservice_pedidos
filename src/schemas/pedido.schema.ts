import { z } from 'zod';

const modificadorSchema = z.object({
  mdfrstCodigo: z.union([z.string(), z.number()]).transform(String),
});

const detalleSchema = z.object({
  proCodigo: z.union([z.string(), z.number()]).transform(String),
  lstModificadoresRst: z.array(modificadorSchema).optional().default([]),
});

const abonoSchema = z.object({
  tabCodigo: z.union([z.string(), z.number()]).transform(String),
  dcarstMontoAbonoPropio: z.number().optional(),
  dcarstMontoAbonoAjeno: z.number().optional(),
  dcarstObservaciones: z.string().optional(),
});

export const crearCuentaSchema = z.object({
  mctrstNumero: z.number().int().optional(),
  arerstCodigo: z.union([z.string(), z.number()]).transform(String),
  msorstCodigo: z.union([z.string(), z.number()]).transform(String),
  cliNumero: z.union([z.string(), z.number()]).transform(String),
  cjavNumero: z.union([z.string(), z.number()]).transform(String),
  mctrstNumComensales: z.number().int().positive().optional(),
  mctrstNota: z.string().optional(),
  mctrstDireccionEntregaPedido: z.string().optional(),
  mctrstTelefonoEntregaPedido: z.string().regex(/^\d{8}$/).optional(),
  mctrstInstruccionesEntregaPedido: z.string().optional(),
  mctrstCanalDeContacto: z
    .number()
    .int()
    .refine(v => v === 0 || v === 1 || v === 2, { message: 'Debe ser 0, 1 o 2' })
    .optional()
    .default(0 as 0 | 1 | 2),
  mctrstEsPedidoCallCenter: z.boolean().optional().default(false),
  mctrstNoAplicarDescuentoEnPropina: z.boolean().optional().default(false),
  tdvnCodigo: z.union([z.string(), z.number()]).transform(String),
  detCuentaRst: z.array(detalleSchema).min(1),
  lstAbonosRst: z.array(abonoSchema).min(1),
});

export type CrearCuentaInput = z.infer<typeof crearCuentaSchema>;
