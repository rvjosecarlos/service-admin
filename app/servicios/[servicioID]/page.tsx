"use client"

import { getService } from "@/src/api/serviceAPI";
import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import ServicioDetail from "@/src/components/documentView/ServicioDetail";
import Modal from "@/src/components/ui/Modal";
import ModalEdit from "@/src/components/ui/ModalEdit";
import { Servicio } from "@/src/types";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/*
async function getServicio(id: ServicioType['id']) {
    try {
        //await connectDB();

        if( !mongoose.Types.ObjectId.isValid(id)) {
            return 'not-found';
        }

        const servicio = await Servicio.findById(id).populate([
            { path: 'idConductor' },
            { path: 'ordenServicio'}
        ]);

        if( !servicio ) {
            return 'not-found';
        }

        const {success, data, error} = ServicioSchema.safeParse(servicio);
        if(success) {
            return data;
        }
        error.issues.forEach( error => console.log(error));
    }
    catch(error) {
        console.log(error);
    }
}

*/

const initialValue = {
    estado: '',
    fecha: '',
    _id: '',
    description: '',
    costo: 0,
    tipoServicio: '',
    idConductor: {
        nombre: '',
        apellido: '',
        id: ''
    }
}

export default function ServicioIDPage() {
    const [ servicio, setServicio ] = useState<Servicio>(initialValue);
    const params = useParams();
    const servicioID = params.servicioID as string;
    useEffect(()=>{
        const fetchService = async () => {
            const servicio = await getService(servicioID);
            setServicio(servicio as Servicio);
        }
        fetchService();
    },[]);

    if(servicio._id) return (
        <>
            <DocumentDetail 
                documentID={servicioID}
            >
                <ServicioDetail servicio={servicio} />
            </DocumentDetail>
            <ModalEdit 
                documentType="servicio" 
                defaultValues={servicio}
            />
            
            {
                servicio.estado === 'assign' || servicio.estado === 'inProgress' ? 
                    <ModalEdit 
                        documentType="servicio" 
                        defaultValues={servicio}
                    />
                :
                    <Modal>No se puede editar un servicio que ya ha sido completado o no realizado</Modal>
                
            }
        </>
    )
}