import { mesesEspanol } from "@/src/data/data";
import { formatCurrency } from "@/src/lib";
import { Factura, GestionCobros, OrdenServicio as OrdenServicioType, Servicio, Servicio as ServicioType } from "@/src/types";

type CardDashboardBestProps = { 
    servicios: Servicio[],
    todos: boolean 
};

type ObjectoAuxiliar = { 
    [key:number]: { 
        cuenta: number, 
        acumulado: number 
    } 
};

export default function CardDashboardBest({ servicios, todos } : CardDashboardBestProps){
    
    const serviceMonths: ObjectoAuxiliar = { };
    let total = 0;
    /* Obtener el mes con mayor numero de servicios realizados */
    // Arma el objeto con los 12 meses y sus servicios realizados
    const serviciosCompletados = servicios.filter( servicio => servicio.estado === 'complete');
    serviciosCompletados.forEach( servicio => {
        const mes = new Date(servicio.fecha).getMonth();
        if( serviceMonths[mes]  ){
            serviceMonths[mes].cuenta = serviceMonths[mes].cuenta + 1;
            serviceMonths[mes].acumulado = serviceMonths[mes].acumulado + Number(servicio.costo);
        }
        else{
            serviceMonths[mes] = {
                cuenta: 1,
                acumulado: Number(servicio.costo)
            }
        }
        total += servicio.costo;
    });

    // Obtén el mes con mayor número de servicios realizados
    const masServiciosArr = Object.values(serviceMonths).map( service => service.cuenta );
    const masServicios = Math.max(...masServiciosArr, 0);
    const entries = Object.entries(serviceMonths);
    const indiceMasServicios = entries.findIndex( servicio => servicio[1].cuenta === masServicios );
    const mesMasServicios = entries[indiceMasServicios] ? entries[indiceMasServicios][0] : '';
    const acumuladoMes = entries[indiceMasServicios] ? entries[indiceMasServicios][1].acumulado : 0;

    return (
        <div className="py-3 w-full grid gap-5 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
            <div 
                className="py-6 px-4 bg-backgroundColor border border-borderColor rounded-xl text-center space-y-3"
            >
                <h3 className="text-mutedColor-foreground text-lg font-semibold">{ todos ? 'Mes con mas servicios' : 'Servicios del mes' }</h3>
                <hr />
                <p className="text-mutedColor-foreground font-bold text-2xl">{ mesesEspanol[+mesMasServicios] }</p>
                <div className="grid grid-cols-2">
                    <p className="text-xl">{masServicios}</p>
                    <p className="text-2xl font-bold">{ formatCurrency( acumuladoMes ) }</p>
                    <p className="text-mutedColor-foreground text-center">Servicios realizados</p>
                    <p className="text-mutedColor-foreground text-center">Costo acumulado sin IVA</p>
                </div>                
            </div>
            <div 
                className="py-6 px-4 bg-backgroundColor border border-borderColor rounded-xl text-center space-y-3"
            >
                <h3 className="text-mutedColor-foreground text-lg font-semibold">{ todos ? 'Total del año' : 'Total del mes' }</h3>
                <hr />
                <p className="text-mutedColor-foreground font-bold text-2xl">{ 'Total' }</p>
                <div className="grid grid-cols-1">
                    <p className="text-2xl font-bold">{ formatCurrency(total) }</p>
                    <p className="text-mutedColor-foreground text-center">Total generado sin IVA</p>
                </div>                
            </div>
            {/*
             <div 
                className="py-6 px-4 bg-backgroundColor border border-borderColor rounded-xl text-center space-y-3"
            >
                <h3 className="text-mutedColor-foreground text-lg font-semibold">Mejor cliente en el año</h3>
                <hr />
                <p className="text-mutedColor-foreground font-bold text-2xl">{ '' }</p>
                <div className="grid grid-cols-1">
                    <p className="text-2xl font-bold">{ formatCurrency(0) }</p>
                    <p className="text-mutedColor-foreground text-center">Total en servicios completados</p>
                </div>                
            </div>
            */}
        </div>
    )
}