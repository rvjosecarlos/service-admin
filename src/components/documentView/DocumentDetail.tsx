import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { BackButton, OutlineRoundButton } from "../ui/Buttons";
import { ReactNode } from "react";
import Link from "next/link";
import DeleteDocument from "../ui/DeleteDocument";


type DocumentDetailProps = {
    documentID: string;
    children: ReactNode;
    documentType?: "presupuesto" | "factura" | "ordenServicio" | "gestionCobro" | "servicio" | "conductor" | "emisor-receptor"
}

export default function DocumentDetail({documentID, children, documentType}: DocumentDetailProps) {
    return (
        <div>
            <div className="md:flex justify-between p-3">
                <div>
                    <BackButton>
                        <ArrowUturnLeftIcon className="size-5 m-auto"/>
                    </BackButton>
                </div>

                <div className="flex justify-end gap-3">
                    <Link
                        href={`${documentID}?modal=edit`}
                    >
                        <OutlineRoundButton>Editar</OutlineRoundButton>
                    </Link>
                    <DeleteDocument 
                        documentType={documentType}
                        documentID={documentID}
                    />
                </div>
            </div>

            <div className="bg-backgroundColor border border-borderColor rounded-xl p-5">
                { children }
            </div>
        </div>
    )
}