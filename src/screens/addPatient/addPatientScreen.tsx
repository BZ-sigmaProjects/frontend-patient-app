import * as React from 'react';
import {useEffect, useState, useContext} from 'react';
import Loader from "react-js-loader";

import AddPatientPlainText from './addPatientPlainText';
import { UserContext } from '../../useContext/userContext';
import { useAddPatientMutation } from "../../api/apiSlice";
import { colors } from '../../utils/color/color';



type patient = {
  cin: string,
  firstName: string,
  lastName: string,
  gender: 'H' | 'F',
  dateOfBirth: string,
  insuranceCompany: 'CNOPS' | 'FAR',
  numAdherent: string,
  province: string,
  city: string, 
  phone: string,
  address: string,
  complimentAddress: string
};


//must separate this component to two: smart component to send and manage data, plain text component to show data
export default function AddPatientScreen() {
  
  const user = useContext(UserContext);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isUserExist, setIsUserExist ] = useState<boolean>(false);
  const [ isSuccess, setIsSuccess ] = useState<boolean>(false);

  
  const [ addPatient ] = useAddPatientMutation();

  function handleSubmit(patient:patient){
    console.log(patient)
    // return
    setIsLoading(true)
    addPatient(patient)
    .then((res:any )=>{
      console.log(res)
      if(res?.error?.data?.message === 'userExist') {
        setIsUserExist(true);
        setIsLoading(false);
       
      }
      else if(res.data){
        //to remove only for testing the loader
        setTimeout(() => {
          setIsLoading(false);
          setIsSuccess(true);
        }, 2000);
        setTimeout(() => {
          setIsSuccess(false)
        }, 5000);
      }
    }).catch((err:any) =>{
      console.log('err.', err); 
      setIsLoading(false);
    });
  }

  
  return (
    <div className='w-full h-full min-h-full min-h-max bg-lightly-blue rounded-lg mt-5 pb-10 px-8 pt-4'>
      <AddPatientPlainText isUserExistP={isUserExist} handleSubmit={(patient:patient)=>handleSubmit(patient)} onChangeUserCin={()=>setIsUserExist(false)}/>
      {/* fixe css */}
      {(isLoading || isSuccess) &&
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden bg-white-opacity z-[10] mt-5 flex flex-row items-center justify-center">
          {isLoading && <Loader type="spinner-circle" bgColor={colors.darkBlue} color={colors.darkBlue} title={"En cours de téléchargement"} size={100} />}      
          {isSuccess && <div className="text-green font-bold text-xl"> Le Patient a été enregistrée avec succès</div>}      
        </div>
      }
    </div>
  )
}

