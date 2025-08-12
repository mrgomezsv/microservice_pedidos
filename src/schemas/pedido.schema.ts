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
  mctrstNumero: z.union([z.string(), z.number()]).optional().transform(v => (v === undefined ? undefined : String(v))),
  arerstCodigo: z.union([z.string(), z.number()]).transform(String),
  msorstCodigo: z.union([z.string(), z.number()]).transform(String),
  cliNumero: z.union([z.string(), z.number()]).transform(String),
  cjavNumero: z.union([z.string(), z.number()]).transform(String),
  mctrstNumComensales: z.number().int().positive().optional(),
  mctrstNota: z.string().optional(),
  mctrstDireccionEntregaPedido: z.string().optional(),
  mctrstTelefonoEntregaPedido: z.string().regex(/^\d{8}$/).optional(),
  mctrstInstruccionesEntregaPedido: z.string().optional(),
  mctrstCanalDeContacto: z.enum(['0','1','2']).transform(v => Number(v) as 0|1|2).optional().default(0),
  mctrstEsPedidoCallCenter: z.boolean().optional().default(false),
  mctrstNoAplicarDescuentoEnPropina: z.boolean().optional().default(false),
  tdvnCodigo: z.union([z.string(), z.number()]).transform(String),
  detCuentaRst: z.array(detalleSchema).min(1),
  lstAbonosRst: z.array(abonoSchema).min(1),
});

export type CrearCuentaInput = z.infer<typeof crearCuentaSchema>;
