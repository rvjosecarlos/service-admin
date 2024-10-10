import { api } from "../lib/axios";
import { GetService } from "../schema";
import type { CardServicio, EstadoServicio, ServiceFormData } from "@/src/types";

type SearchParams = {
    estado: string,
    fecha: string
}

export const getServices = async (limit: number, page: number, searchParams: SearchParams) => {
    try{
        const url = `/api/servicio?page=${page}&limit=${limit}&estado=${searchParams.estado}&fecha=${searchParams.fecha}`
        const { data: datos } = await api.get(url);
        console.log(datos);
        return datos;
    }
    catch( error ){
        console.log(error);
        return error;
    }
}

export const getService = async (id: string) => {
    try{
        const url = `/api/servicio/detail/${id}`;
        const { data: datos } = await api.get(url);
        console.log(datos);
        const { data } = GetService.safeParse(datos);
        if( data ){
            return data.data;
        }
    }
    catch(error){
        console.log(error);
        return error;
    }
}

export const createService = async (formData: ServiceFormData) => {
    try{
        const url = `/api/servicio`;
        const { data } = await api.post(url, formData);
        return data;
    }
    catch( error ){
        console.log(error);
        return error;
    }
};

export const updateService = async (formData: ServiceFormData) => {
    try{
        console.log(formData);
        const url =  `/api/servicio`;
        const { data } = await api.put(url, formData);
        return data;
    }
    catch(error){
        console.log(error);
        return error;
    }
}

export const updateStatusService =  async ({ id, estado} : { id: CardServicio['_id'], estado: EstadoServicio }) => {
    try{
        const url = '/api/servicio';
        const { data } = await api.patch(url, {id, estado});
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error);
        return error;
    }
};

export const getServicesByRangeDate = async ( rangeDate: { mes: string, anio: string } ) => {
    try{
        const { mes, anio } = rangeDate;
        const url = `/api/servicio/dashboard?anio=${anio}${mes ? '&mes=' + mes : ''}`;
        const { data } = await api.get(url);
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error);
        return error;
    }
};

export const getIncomingServices = async () => {
    try{
        const url = `/api/servicio/proximos`;
        const { data } = await api.get(url);
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error);
        return error;
    }
};
