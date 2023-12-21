import { useState } from 'react'
import * as React from 'react'

export default function AddPatientButton() {
  
  return (
    <div className='p-4 h-8 w-14 md:min-w-max bg-light-blue rounded-3xl border-2 border-dark-blue flex flex-row items-center justify-between space-x-3'>
        <div className='object-none w-4 min-w-[20px] h-4 bg-icon-add-person-svg bg-center bg-no-repeat bg-contain'/>
        <div className="text-white text-xs hidden  md:flex ">Nouveau Dossier</div>
    </div>
  )
}
