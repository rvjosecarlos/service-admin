"use client";
import { Conductores } from "@/src/types";
import DriverRow from "./DriverRow";

type ConductoresViewProps = {
    conductores: Conductores[]
}

export default function ConductoresView({ conductores }: ConductoresViewProps){
    
    return(
        <>
            { 
                conductores.map( (conductor ) => 
                    <div key={conductor._id}>
                        <DriverRow conductor={conductor}/>   
                    </div>
                )
            }
        </>
    )
}