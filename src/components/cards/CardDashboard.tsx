import {CardServicio, DocumentTypeURL, Servicio} from "@/src/types";
import { estadosCobro, estadosFactura, estadosOrdenServicio, estadosPresupuesto, estadosServicios } from './../../data/data';
import { ReactNode } from "react";

type CardDashboardProps = {
    title: string;
    type: DocumentTypeURL;
    documents: Servicio[];
    children?: ReactNode;
};

const estadosDocuments = {
    "presupuestos": estadosPresupuesto,
    "ordenes-servicios": estadosOrdenServicio,
    "servicios": estadosServicios,
    "facturacion": estadosFactura,
    "gestion-cobros": estadosCobro,
};

function agruparEstados({type, documents}: Pick<CardDashboardProps, 'type'|'documents'>) {
    console.log(type);
    const grupos: {[key: string]: CardServicio[]}= {};

    const estados = estadosDocuments["servicios"];

    for(const estado in estados) {
        const filtrados = documents.filter(document => {
            if("estado" in document) {
                return document.estado === estado
            }
        });
        
        const estadoStr = estados[estado as keyof typeof estados];
        grupos[estadoStr] = filtrados as CardServicio[];
    }
  
    return grupos;
};

export default function CardDashboard({title, type, documents, children}: CardDashboardProps) {
    const grupos = agruparEstados({type, documents});
    const estados = Object.keys(grupos);

    const estadosGreen = [estadosPresupuesto.accept, estadosOrdenServicio.complete, estadosServicios.complete, estadosFactura.sealed, estadosCobro.paid];
    const estadosBlue = [estadosOrdenServicio.inProgress, estadosServicios.inProgress];

    return (
        <div 
            className="py-6 px-4 bg-backgroundColor border border-borderColor rounded-xl text-center"
        >
            <h3 className="text-mutedColor-foreground text-2xl font-bold">{title}</h3>
            <p className="text-mutedColor-foreground">Total: {documents.length}</p>

            <div className="flex pt-6 justify-center">
                { estados.map((estado, indice) => (
                    <div key={estado} className={`${indice != 0 && "border-l border-borderColor"} w-full md:w-28 flex flex-col`}>
                        <p className={`text-3xl font-bold py-2 ${estadosGreen.includes(estado) ? "text-lime-500" : estadosBlue.includes(estado) ? "text-primaryColor" : "text-mutedColor-foreground"}`}>
                            {grupos[estado].length}
                        </p>

                        <p className={`m-auto p-1 text-xs font-bold ${estadosGreen.includes(estado) ? "text-lime-500" : estadosBlue.includes(estado) ? "text-primaryColor" : "text-mutedColor-foreground"}`}>
                            {estado}
                        </p>
                    </div>
                ))}
            </div>

            {children}
        </div>
    )
}