import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ServicioForm from "./ServicioForm";
import { OptionOrdenesServiciosIDs, ServiceFormData } from "@/src/types";
import { PrimaryButton } from "../../ui/Buttons";
import Link from "next/link";

import { OptionOrdenesServicios } from "@/src/schema";

import { toast } from 'react-toastify';
import { createService } from "@/src/api/serviceAPI";

export default function AddService(){
    const  { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceFormData & { searchOrdenes?: string }>();    
    

    const handleServiceFormData = async ( formData: ServiceFormData & { searchOrdenes?: string }) => {
        console.log(formData);
        
        const respuesta = await createService(formData);
        
        if( respuesta.success ) {
            toast.success(respuesta.message as string);
            reset();            
            setTimeout(() => location.href = location.pathname, 2000);
        }
        else {
            toast.error(respuesta.message as string);
        }
    };

    return(
        <form
            onSubmit={handleSubmit(handleServiceFormData)}
            className="mt-5 space-y-5"
        >            
            <ServicioForm 
                register={register}
                errors={errors}
            >
                <PrimaryButton>Crear servicio</PrimaryButton>
                <Link
                    href={`${location.pathname}`}
                    className="bg-secondaryColor hover:bg-secondaryColor-hover text-secondaryColor-foreground border border-secondaryColor hover:border-secondaryColor-hover py-1 px-3 rounded cursor-pointer"
                >
                        Cancelar
                </Link>
            </ServicioForm>
        </form>
    )
}