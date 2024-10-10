import { api } from "../lib/axios";
import { Conductores } from "../types";

export const createConductor = async (formData: Conductores) => {
    try{
        const url = `/api/conductor`;
        const { data } = await api.post(url, formData);
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error);
        return error;
    }
};

export const getConductores = async () => {
    try{
        const url = `/api/conductor`;
        const { data } = await api.get(url);
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error);
        return error;
    }
};

export const updateConductor = async ( formData: Conductores ) => {
    try{
        const url = `/api/conductor`;
        const { data } = await api.put(url, formData);
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error);
        return error;
    }
};

export const deleteConductor = async (id: Conductores['_id']) => {
    try{
        const url = `/api/conductor`;
        const { data } = await api.patch(url, { id });
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error);
        return error;
    }
}