"use client"
import { DestructiveRoundButton } from "./Buttons"

import { OrdenServicio, Presupuesto } from "@/src/types"
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

type DeleteDocumentProps ={
    documentType?: 'presupuesto' | 'factura' |  'ordenServicio' | 'gestionCobro' | 'servicio' | 'conductor' | 'emisor-receptor',
    documentID: string
}

export default function DeleteDocument( { documentType, documentID }: DeleteDocumentProps ){
    const router = useRouter();
    
    if( documentType === 'presupuesto' ){
        const handleClick = async ( id: Presupuesto['id'] ) => {
            /*
            const res = await deletePresupuesto(id);
            if( res.success ){
                toast.success(res.message as string);
                router.refresh();
                router.push(`/presupuestos`);
            }
            else{
                toast.error('No es posible eliminar un presupuesto aprobado');
            };
            */
        };

        return (
            <DestructiveRoundButton onClick={ () => handleClick(documentID) }>Eliminar</DestructiveRoundButton>
        )
    }
    else if( documentType === 'ordenServicio' ){
        const handleClick = async ( id: OrdenServicio['id'] ) => {
            /*
            if( !confirm('¿Esta seguro que desea eliminar el documento?') ){
                return;
            };
            
            const respuesta = await deleteOrdenServicio(id);
           
            if( respuesta.success ) {
                toast.success(respuesta.message as string);
                router.refresh();
                router.push(`/ordenes-servicios`);
            }
            else {
                toast.error(respuesta.message as string);
            }
                */
        };

        return (
            <DestructiveRoundButton onClick={() => handleClick(documentID)}>Eliminar</DestructiveRoundButton>
        )
    }
    else{
        return <></>
    }
};