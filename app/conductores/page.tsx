"use client";
import { getConductores } from "@/src/api/conductorAPI";
import ConductoresView from "@/src/components/conductores/ConductoresView";
import { PrimaryButton, OutlineButton } from "@/src/components/ui/Buttons";
import ModalAdd from "@/src/components/ui/ModalAdd";
import { Conductores } from "@/src/types";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";


export default function ConductoresPage(){
    const [ conductores, setConductores ] = useState<Conductores[]>([]);
    
    useEffect(() => {
        const fetchConductores = async () => {
            const conductores = await getConductores();
            setConductores(conductores.data);
        };
        fetchConductores();
    },[]);

    if(conductores) return(
        <Suspense>
            <div className="flex justify-between items-center mb-5">
                <Link href={'/'}>
                    <OutlineButton>Inicio</OutlineButton>
                </Link>
                <Link href="?modal=create">
                    <PrimaryButton>Nuevo conductor</PrimaryButton>
                </Link>            
            </div>
            <section className="bg-backgroundColor p-10 border border-borderColor rounded-xl space-y-5">
                <h1 className="text-mutedColor-foreground text-xl font-bold">Conductores</h1>
                <div className="space-y-5">
                    <ConductoresView conductores={conductores}/>
                </div>                
            </section>
            <ModalAdd documentType="conductor"/>
        </Suspense>
    )
}