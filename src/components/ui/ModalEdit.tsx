"use client"
import { useSearchParams, useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Servicio } from '@/src/types';
import EditService from '../formularios/servicioForms/EditService';

type ModalProps = {
  documentType: 'servicio',
  defaultValues: Servicio 
};


const selectForm = ( {documentType, defaultValues}: ModalProps ) => {
  const formsEdit = {
    'servicio': {
      "tsx": <EditService defaultValues={defaultValues as Servicio}/>, 
      "title": 'Servicio'
    }
  }
  
  return formsEdit[documentType];
}

export default function ModalEdit({documentType, defaultValues}: ModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modo = searchParams.get('modal');
  const isOpen = !!modo;
  const formulario = selectForm({documentType, defaultValues});


  if( modo === 'edit' ) return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => router.replace(`${location.pathname}`)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div>
                      <h2 className='font-bold text-2xl'>Editar { formulario.title }</h2>
                      <h3 className='text-cardColor-foreground'>Ingrese la siguiente información:</h3>
                      { 
                        formulario.tsx
                      }
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}