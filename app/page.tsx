"use client";
import { getIncomingServices, getServicesByRangeDate } from "@/src/api/serviceAPI";
import CardDashboard from "@/src/components/cards/CardDashboard";
import CardDashboardBest from "@/src/components/cards/CardDashboardBest";
import CardDashboardGanancias from "@/src/components/cards/CardDashboardGanancias";
import CardIconConfig from "@/src/components/cards/CardIconConfig";
import { SelectMonth, SelectYear } from "@/src/components/ui/Selects";
import { evalDate, formatLongDate } from "@/src/lib";
import { DashboardDocumentsData, Servicio } from "@/src/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ConfigurationPage() {
  const [filtros, setFiltros] = useState<{mes: string, anio:string}>({mes: '', anio: new Date().getFullYear().toString()});
  const [ serviciosProximos, setServiciosProximos ] = useState<Servicio[]>([]);
  const [ servicios, setServicios ] = useState<Servicio[]>([]);

  useEffect(()=>{
    const fetchIncomingServices = async () => {
      const response = await getIncomingServices();
      console.log('incoming',response);
      if( response.data ){
        setServiciosProximos(response.data);
      }
    }
    fetchIncomingServices();
  },[]);
  
  useEffect(()=>{
    const fetchServiciosByRangeDate = async () => {
      const response = await getServicesByRangeDate(filtros);
      console.log(response);
      if( response.data ){
        setServicios(response.data);
      };    
      console.log(filtros);  
    }
    fetchServiciosByRangeDate();
  },[filtros]);

    return (
      <div>

        <div className="py-6 px-4 mb-3 bg-backgroundColor border border-borderColor rounded-xl text-center space-y-3">
          <p className="text-mutedColor-foreground text-sm font-bold mb-1">Próximos Servicios</p>

          { serviciosProximos.length > 0 ?
              serviciosProximos.map(servicio => (
                <div key={servicio._id} className="py-1 px-2 rounded-xl hover:text-accentColor-foreground hover:bg-accentColor">
                  <Link href={`/servicios/${servicio._id}`} title="Ver Servicio">
                    <p className="text-mutedColor-foreground text-sm text-left font-semibold">Servicio {/*servicio.id.substring(20)*/}</p>
                    <p className="text-mutedColor-foreground text-sm text-left">{formatLongDate(new Date(evalDate(servicio.fecha)))}</p>
                  </Link>
                </div>
              ))
              :
              <p className="text-mutedColor-foreground text-sm text-left font-semibold">No hay servicios próximos</p>
          }
        </div>

        <div className="flex items-center h-[85%] px-2 py-4">
            <div className="grid gap-5 m-auto sm:grid-cols-2 w-full md:w-3/4">
                <CardIconConfig
                    option='Conductores'
                    url='/conductores'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 48 48" className="m-auto">
                        <g fill="currentColor"><path d="M21 11a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1"/>
                            <path fillRule="evenodd" d="M33.364 18.52c-.363.285-.834.513-1.402.698Q32 19.604 32 20a8 8 0 1 1-15.962-.782c-.568-.185-1.039-.413-1.401-.698c-.47-.37-.785-.864-.822-1.458c-.035-.551.183-1.019.401-1.349a4.3 4.3 0 0 1 .76-.841q.212-.184.406-.327q-.058-.309-.122-.74A27 27 0 0 1 15 10c0-.314.134-.548.196-.647c.078-.125.17-.232.254-.318c.167-.175.383-.353.62-.524c.48-.348 1.14-.739 1.924-1.105C19.557 6.676 21.704 6 24 6s4.443.677 6.006 1.406a12 12 0 0 1 1.924 1.105c.237.171.453.35.62.524c.084.086.176.193.254.318c.062.099.196.333.196.647c0 1.602-.13 2.9-.26 3.805q-.064.432-.122.74c.128.095.267.204.407.327c.25.219.536.504.759.841c.219.33.436.798.402 1.35c-.037.593-.352 1.087-.822 1.457m-16.362-8.202c.015 1.348.127 2.438.238 3.2q.04.27.076.482h13.368q.037-.213.076-.482c.11-.762.223-1.852.238-3.2a4 4 0 0 0-.241-.188c-.361-.261-.909-.59-1.597-.911C27.777 8.573 25.924 8 24 8s-3.777.573-5.16 1.219c-.688.321-1.236.65-1.596.91a4 4 0 0 0-.242.19M16.788 16l-.003.002a5 5 0 0 0-.495.376c-.178.156-.32.308-.406.44a1 1 0 0 0-.055.093l.044.037c.15.118.472.291 1.1.462q.186.05.399.098l.009.002c.502.111 1.12.21 1.873.288c1.067.111 2.41.184 4.088.2L24 18c3.227 0 5.314-.201 6.62-.49l.008-.002q.214-.047.4-.098c.627-.17.95-.344 1.099-.462l.044-.037a1 1 0 0 0-.054-.093a2.4 2.4 0 0 0-.407-.44a5 5 0 0 0-.494-.376L31.212 16zm6.94 4c2.642 0 4.69-.14 6.26-.384q.012.19.012.384a6 6 0 1 1-11.992-.315c1.463.202 3.338.315 5.72.315m-7.65 18.877A8 8 0 0 0 16 40v1a1 1 0 0 1-1.864.504a3 3 0 0 1-2.203.259l-1.932-.518a3 3 0 0 1-2.12-3.674l.776-2.898a3 3 0 0 1 3.674-2.121l1.932.517c.672.18 1.23.575 1.618 1.091a9.99 9.99 0 0 1 8.12-4.16a9.99 9.99 0 0 1 8.116 4.158a3 3 0 0 1 1.616-1.088l1.932-.517a3 3 0 0 1 3.674 2.12l.777 2.899a3 3 0 0 1-2.122 3.674l-1.931.517a3 3 0 0 1-2.2-.256A1 1 0 0 1 32 41v-1a8 8 0 0 0-.078-1.123l-5.204 1.395a3 3 0 0 1-5.436 0zm5.042-.72A3 3 0 0 1 23 36.172v-4.11a8.01 8.01 0 0 0-6.397 4.886zm10.277-1.21A8.01 8.01 0 0 0 25 32.062v4.109c.904.32 1.61 1.06 1.88 1.987zm2.147-.72a1 1 0 0 1 .707-1.225l1.932-.518a1 1 0 0 1 1.224.707l.777 2.898a1 1 0 0 1-.707 1.225l-1.932.518a1 1 0 0 1-1.225-.708zm-21.73-1.743a1 1 0 0 0-1.226.707l-.776 2.897a1 1 0 0 0 .707 1.225l1.932.518a1 1 0 0 0 1.225-.707l.776-2.898A1 1 0 0 0 13.745 35zM25 39a1 1 0 1 1-2 0a1 1 0 0 1 2 0" clipRule="evenodd"/>
                        </g>
                    </svg>
                </CardIconConfig>

                <CardIconConfig
                    option='Servicios'
                    url='/servicios'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 32 32" className="m-auto">
                      <g fill="currentColor">
                        <path fill="currentColor" d="m29.39 16.08l-6.69-2.87l-2.54-4.34l-.08-.12A2 2 0 0 0 18.52 8h-8a2 2 0 0 0-1.67.89L5.46 14H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2.14a4 4 0 0 0 7.72 0h6.28a4 4 0 0 0 7.72 0H29a1 1 0 0 0 1-1v-7a1 1 0 0 0-.61-.92M9 26a2 2 0 1 1 2-2a2 2 0 0 1-2 2m14 0a2 2 0 1 1 2-2a2 2 0 0 1-2 2m5-3h-1.14a4 4 0 0 0-7.72 0h-6.28a4 4 0 0 0-7.72 0H4v-7h2a1 1 0 0 0 .83-.45L10.54 10h8l2.63 4.5a1 1 0 0 0 .47.42L28 17.66Z"/>
                      </g>
                    </svg>
                </CardIconConfig>
            </div>          
        </div>
        <div className="row-span-2 my-3">


            <div className="flex gap-6 justify-center mb-3">
              <SelectMonth onChange={(event) => setFiltros({...filtros, mes: event!.target.value})}/>
              <SelectYear onChange={(event) => setFiltros({...filtros, anio: event!.target.value})}/>
            </div>

            <CardDashboard title="Servicios" type="servicios" documents={servicios}>
              <div className="w-full p-1 bg-charColor-char4 rounded-lg my-5"></div>               
            </CardDashboard>
          </div>
        <CardDashboardBest 
          servicios={servicios}
          todos={ filtros.mes === '' }
        />
      </div>
    )
}