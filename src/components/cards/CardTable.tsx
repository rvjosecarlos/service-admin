import CardDocument from "./CardDocument";
import ContentService from "../cardDocumentContent/ContentService";
import type { CardServicio, FechasDuplicadasType, DocumentTypeURL } from "@/src/types";

type CardTableProps = {
    documents: CardServicio[];
    documentType: DocumentTypeURL;
    fechasDuplicadas?: FechasDuplicadasType;
    search?:boolean;
}

export default function CardTable({ documents, fechasDuplicadas }: CardTableProps) {
    return (
        <div className="py-3 w-full grid gap-5 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 xs: grid-cols-1">
            {
                documents.map( document => (
                    <CardDocument key={document._id}> 
                        <ContentService document={document as CardServicio} fechasDuplicadas={fechasDuplicadas as FechasDuplicadasType}/>
                    </CardDocument>
                ))
            }
        </div>
    )
}