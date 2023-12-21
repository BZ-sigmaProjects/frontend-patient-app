import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useGetPatientsQuery } from "../api/apiSlice";
import Loader from "react-js-loader";

import List from '../sharedComponent/list';
import { colors } from '../utils/color/color';
import { UserContext } from '../useContext/userContext';

type patient = {
  cin: string,
  firstName: string,
  lastName: string,
  gender: 'H' | 'F',
  dateOfBirth: string,
  insuranceCompany: 'CNOPS' | 'FAR',
  isAdherent: 'Oui' | 'Non',
};
  

  // this is a smart component it should only fetch and manage the data and pass it to plainTextComponent(dump component)
  export default function ListPatientsComponent() {

    const user = useContext(UserContext);// we can use user to fetch data and check the user roles
    const [ listPatient, setListPatient ] = useState<patient[]>([]);

    const {
      data,
      isLoading, 
      isSuccess, 
      isError,
      error
    } = useGetPatientsQuery();
     
    useEffect(()=>{
      if(data){
        console.log('use effect lis',  data)
        // const dataList:patient[] = data?.map((e:patient)=>{console.log(e);  e.isAdherent = e.isAdherent ? 'Oui' : 'Non'; return e})
        setListPatient(data)
      }
    }, [data])

    return (
      <div className="h-full w-full ">
        {!isLoading && listPatient &&<List data={listPatient}/>}
        {isLoading && <Loader type="spinner-circle" bgColor={colors.darkBlue} color={colors.darkBlue} title={"En cours de téléchargement"} size={100} />}
        {isError && <div className='w-full text-red text-center font-bold	text-base'> Un problème est survenu </div> }
      </div>

    );
  };
  
