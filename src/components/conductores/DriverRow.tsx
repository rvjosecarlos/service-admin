import { Conductores } from "@/src/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DestructiveButton, OutlineButton } from "../ui/Buttons";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { deleteConductor, updateConductor } from "@/src/api/conductorAPI";

type DriverRowProps = {
    conductor: Conductores
}

export default function DriverRow( {conductor}: DriverRowProps  ){
    const [ conductorMostrar, setConductorMostrar ] = useState(conductor);
    const [ editar, setEditar ] = useState(false);
    const { register, handleSubmit, reset, formState: {errors} } = useForm({ defaultValues: conductor });
    const router = useRouter();

    const handleGuardar = async (formData: Conductores) => {
        const res = await updateConductor(formData);
        if( res.success ){
            toast.success(res.message as string);
            setConductorMostrar(res.data);
        }
        else{
            toast.error(res.message as string);
        }
        setEditar(false); 
    };

    const handleDelete = async ( id: Conductores['_id'] ) => {

        const res = await deleteConductor(id);
        if( res.success ){
            toast.success(res.message as string);
        }
        else{
            toast.error(res.message as string);
        }
        setEditar(false);  
        setTimeout(()=>{
            window.location.href = location.pathname;
        }, 2000);
    };

    return (
        <>
            {
                editar ? 
                    <form
                        key={conductorMostrar._id} 
                        className="grid md:grid-cols-5 bg-accentColor p-3 rounded-lg gap-3"
                    >
                        <input 
                            id='id'
                            type="hidden"
                            { ...register('_id') }
                        />
                        <input
                            id='nombre'
                            type="text"
                            placeholder="Nombre"
                            className="rounded w-32 p-1"
                            { ...register('nombre',{
                                required: true
                            }) }
                        />
                        <input 
                            id="apellido" 
                            type="text" 
                            placeholder="Apellido"
                            className="rounded w-32 p-1"
                            { ...register('apellido')}
                        />
                        <input 
                            id="edad"
                            type="number" 
                            placeholder="Edad"
                            className="rounded w-32 p-1"
                            { ...register('edad')}
                        />
                        <input 
                            id="licencia"
                            type="text"
                            placeholder="Licencia"
                            className="rounded w-40 p-1" 
                            { ...register('licencia')}
                        />

                        <div className='grid grid-cols-2 justify-center gap-3'>
                            <OutlineButton onClick={handleSubmit(handleGuardar)}>
                                Guardar
                            </OutlineButton>
                            <DestructiveButton onClick={() => handleDelete(conductorMostrar._id)}>
                                Eliminar
                            </DestructiveButton>
                        </div>
                    </form>
                :
                    <div
                        key={conductorMostrar._id} 
                        className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-accentColor p-3 rounded-lg items-center"
                    >
                        <p>{`${conductorMostrar.nombre}`}</p>
                        <p>{`${conductorMostrar.apellido}`}</p>
                        <p>{conductorMostrar.edad}</p>
                        <p>{conductorMostrar.licencia}</p>

                        <div className="grid grid-cols-2 justify-center gap-3 col-span-2 md:col-span-1">
                            <OutlineButton onClick={() => setEditar(true)}>
                                Editar
                            </OutlineButton>
                            <DestructiveButton onClick={() => handleDelete(conductorMostrar._id)}>
                                Eliminar
                            </DestructiveButton>
                        </div>
                    </div>
            }
        </>
    )
}