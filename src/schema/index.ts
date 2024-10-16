import { z } from "zod";

// Esquemas entidades
export const ConductoresSchema = z.object({
    _id: z.string(),
    nombre: z.string(),
    apellido: z.string(),
    edad: z.number(),
    licencia: z.string()
});

export const ConductoresArrSchema = z.array(ConductoresSchema);

// Esquemas documentos
export const ServicioSchema = z.object({
    _id: z.string(),
    ordenServicio: z.object({
        id: z.string(),
        solicito: z.string(),
        urlOrdenCompra: z.string().optional(),
        ordenCompra: z.string().optional()
    }).optional(),
    fecha: z.string(),
    description: z.string(),
    costo: z.number(),
    tipoServicio: z.string(),
    idConductor: ConductoresSchema.pick({
        nombre: true,
        apellido: true
    }).extend({ id: z.string().optional() }),
    nota: z.string().optional(),
    estado: z.string() 
});

export const PresupuestoSchema = z.object({
    id: z.string(),
    fecha: z.date(),
    proveedor: z.string(),
    solicito: z.string(),
    servicios: z.array( ServicioSchema ),
    subtotal: z.number(),
    iva: z.number(),
    total: z.number(),
    estado: z.string(),
    comentarios: z.string()
});

export const OrdenServicioSchema = PresupuestoSchema.extend({
    presupuesto: PresupuestoSchema.pick({ id: true }),
    urlOrdenCompra: z.string().optional(),
    ordenCompra: z.string().optional()
});

export const EmisorReceptorSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    rfc: z.string(),
    tipo: z.string()
});

export const EmisoresReceptoresSchema = z.array( EmisorReceptorSchema );

export const FacturaSchema = z.object({
    id: z.string().optional(),
    ordenServicio: OrdenServicioSchema.optional(),
    fecha: z.date(),
    urlFactura: z.string().optional(),
    emisor: EmisorReceptorSchema.optional(),
    receptor: EmisorReceptorSchema.optional(),
    folio: z.string(),
    folioFiscal: z.string().optional(),
    fechaSellado: z.date().optional(),
    estado: z.string(),
    total: z.number().optional()
});

export const FacturaImportSchema = FacturaSchema.pick({
    fecha: true,
    folio: true,
    folioFiscal: true,
    fechaSellado: true,
    estado: true
}).extend({
    emisor: z.string(),
    receptor: z.string()
});

export const GestionCobrosSchema = z.object({
    id: z.string(),
    fecha: z.date(),
    factura: FacturaSchema,
    ie: z.string().optional(),
    edicom: z.boolean(),
    pagado: z.boolean(),
    comentarios: z.string().optional()
});

export const ConfiguracionSchema = z.object({
    folioInicial: z.string(),
    plantillas: z.array(
        z.object({
            nombre: z.string(),
            tipo: z.string()
        })
    )
});

// Schema Forms
export const ServiceFormSchema = ServicioSchema.pick({
    _id: true,
    ordenServicio: true,
    fecha: true,
    description: true,
    idConductor: true,
    tipoServicio: true,
    estado: true,
    costo: true,
    nota: true
})/*.merge(z.object({
    controlForm: z.string()
}));*/

export const PresupuestoFormSchema = PresupuestoSchema.pick({
    fecha: true,
    proveedor: true,
    solicito: true,
    subtotal: true,
    iva: true,
    total: true,
    comentarios: true
});

export const OrdenServicioFormSchema = OrdenServicioSchema.pick({
    id: true,
    ordenCompra: true,
    comentarios: true
});

export const FacturaFormSchema = FacturaSchema.pick({
    fecha: true,
    emisor: true,
    receptor: true,
    folio: true,
    folioFiscal: true,
    fechaSellado: true,
    estado: true
});

export const GestionCobroFormSchema = GestionCobrosSchema.pick({
    id: true,
    factura: true,
    ie: true,
    edicom: true,
    pagado: true,
    comentarios: true
});

// Informacion de Cards
export const CardPresupuestoSchema = PresupuestoSchema.pick({
    id: true,
    fecha: true,
    proveedor: true,
    solicito: true,
    total: true,
    estado: true
});

export const CardsPresupuestoSchema = z.array(CardPresupuestoSchema);

export const CardOrdenServicioSchema = OrdenServicioSchema.pick({
    id: true,
    fecha: true,
    proveedor: true,
    solicito: true,
    total: true,
    estado: true,
    ordenCompra: true
});

export const CardsOrdenServicioSchema = z.array(CardOrdenServicioSchema);

export const CardServicioSchema = ServicioSchema.pick({
    _id: true,
    fecha: true,
    idConductor: true,
    tipoServicio: true,
    estado: true,
    costo: true,
}).extend({
    ordenServicio: OrdenServicioSchema.pick({
        id: true,
        proveedor: true,
        solicito: true,
        ordenCompra: true
    }).optional()
});

export const CardsServiciosSchema = z.array(CardServicioSchema);

export const CardFacturaSchema = FacturaSchema.pick({
    id: true,
    fecha: true,
    estado: true,
    folio: true,
    total: true,
}).extend({
    ordenServicio: OrdenServicioSchema.pick({
        id: true,
        proveedor: true,
        solicito: true,
        total: true,
        ordenCompra: true
    }).optional()
});
export const CardFacturasSchema = z.array(CardFacturaSchema);

export const CardCobroSchema = GestionCobrosSchema.pick({
    id: true,
    fecha: true,
    ie: true,
    edicom: true,
    pagado: true,
}).extend({
    factura: CardFacturaSchema
});
export const CardCobrosSchema = z.array( CardCobroSchema );


export const OptionOrdenesServicios = z.array( z.string() );

// Esquema email
export const EmailSchema = z.object({
    para: z.string(),
    cc: z.string().optional(),
    cco: z.string().optional(),
    asunto: z.string(),
    mensaje: z.string(),
    desglosar: z.boolean()
});

// Esquema de Rutas
export const RutaSchema = z.object({
    ruta: z.string(),
    tipo: z.string()
});

// NUEVO PROYECTO

// Esquema getServices
export const GetServices = z.object({
    success: z.boolean(),
    data: z.object({
        servicios: z.object({
            value: z.array(ServicioSchema)
        }),
        totalServicios: z.object({
            value: z.number()
        })
    })
});

// Esquema getService
export const GetService = z.object({
    success: z.boolean(),
    data: ServicioSchema
});