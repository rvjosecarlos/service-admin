import { evalDate, formatCurrency, formatDate, formatLongDate } from "@/src/lib";
import { EstadoServicio, FechasDuplicadasType, CardServicio } from "@/src/types";
import ButtonsServicio from "../cardDocumentButtons/ButtonServicio";

type ContentServiceProps = {
    document: CardServicio;
    fechasDuplicadas: FechasDuplicadasType
}

type ColoresDuplicados = {
    [key: number]: string;
}

const coloresDuplicados: ColoresDuplicados= {
    2: "bg-yellow-400",
    3: "bg-orange-400",
    4: "bg-destructiveColor"
}

export default function ContentService({document, fechasDuplicadas}: ContentServiceProps) {
    console.log(document.estado);
    const numFechasDuplicados = Number(fechasDuplicadas[formatDate(document.fecha)]);
    
    return (
        <div>
            {
                numFechasDuplicados > 1 ? 
                    <p className="text-right"><span className={`${coloresDuplicados[numFechasDuplicados]} bg- text-white font-semibold px-2 py-1 rounded-2xl`}>{formatLongDate(new Date(evalDate(document.fecha)))}</span></p>
                :
                    <p className="text-right">{formatLongDate(new Date(evalDate(document.fecha)))}</p>
            }                                     
            <p className="font-bold text-lg pt-3">Servicio{' '}
                <span className="text-2xl break-words">#{document._id}</span>
            </p>
                     
            <div className="w-full p-1 bg-charColor-char4 rounded-lg my-2"></div>

            <p className="font-semibold">Conductor: {' '}
                <span className="font-normal">{document.idConductor.nombre} {document.idConductor.apellido}</span>
            </p>

            <p className="font-semibold">Tipo: {' '}
                <span className="font-normal">{document.tipoServicio}</span>
            </p>

            {/*
            <p className="font-semibold">Solicito: {' '}
                <span className="font-normal">{document.ordenServicio?.solicito}</span>
            </p>

            { document.ordenServicio?.proveedor && (
                <p className="font-semibold">Proveedor: {' '}
                    <span className="font-normal">{document.ordenServicio.proveedor}</span>
                </p>
            )}

            <p className="font-semibold">OS:{' '}
                <span className="font-normal">{document.ordenServicio?.id}</span>
            </p> 
              
                     
            <p className="inline-block font-semibold py-1 px-3 my-1 bg-mutedColor-foreground text-white rounded-full">PO{' '}
                <span className="font-normal">{document.ordenServicio?.ordenCompra}</span>
            </p>   
            */}
            
            <p className="font-semibold py-2 text-right text-xl">{formatCurrency(document.costo)}</p>

            <ButtonsServicio
                documentID={document._id}
                estadoDocument={document.estado as EstadoServicio} 
            />
        </div>
    )
}