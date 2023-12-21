import * as React from 'react'
import AddPatientButton from '../../layout/addPatientButton';
import ListPatientsComponent from './listPatientsComponent';
import { Link } from "react-router-dom";



//its not recomanded to fecth the list of patient here, 
//this screen would have more functionnality, each compoennet should have one responsibility

export default function ListPatientScreen() {

  return (
    <div className=' min-w-max min-h-full bg-lightly-blue rounded-lg  mt-5 flex flex-col px-8 pt-10 pb-10'>
      <div className='w-full flex flex-row  flex flex-row  justify-end items-center '>
        <Link to='/newPatient'>
          <AddPatientButton />
        </Link>
      </div>  
      <div className="w-full h-full rounded-xl border border-dark-blue mt-5 ">
        {/* pass userId to listPatientsComponent */}
          <ListPatientsComponent />
      </div>
    </div>
  )
}


