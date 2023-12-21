import * as React from 'react'
import { useEffect, useState, } from 'react'

type searchProps = {
  initValue: string, 
  submitSearch: Function
}

export default function SearchPatient ({initValue, submitSearch}: searchProps){

  console.log('search props', initValue);
  const [ value, setValue ] = useState<string>(initValue);


  return (
    <div className='w-full md:max-w-full max-w-[300px] flex flex-row py-3 space-x-4 justify-between items-center flex-wrap'>
      <div className="min-w-max flex flex-row hidden md:flex ">
        <div className='w-10 h-10 bg-icon-full-search-svg bg-center bg-no-repeat bg-cover'/>
        <div className='text-xl font-medium text-dark-blue font '>Recherche des Patients</div>
      </div>
      <div className='max-w-[400px] h-8 w-full bg-white rounded-3xl border border-dark-blue flex flex-row items-center justify-between px-5 shadow-inner shadow-secondary '>
        <input
          onChange={event =>{ setValue(event.target.value); submitSearch(event.target.value)}}
          type="search"
          placeholder="recherche (par cin nom ou prenom)"
          className="rounded-l-full text-sm text-light-blue py-1 px-4 w-full outline-none"
        />
        <button onClick={()=>submitSearch(value)}>
          <div  className='min-w-max w-5 h-5 bg-icon-search-svg bg-center bg-no-repeat bg-cover'/>
        </button>
      </div>
    </div>
  )
}


