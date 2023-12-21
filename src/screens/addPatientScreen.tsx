import * as React from 'react';
import {useEffect, useState, useContext} from 'react';
import Loader from "react-js-loader";

import { UserContext } from '../useContext/userContext';
import { useAddPatientMutation } from "../api/apiSlice";
import { colors } from '../utils/color/color';


import { isValidCin, isValidName, isValidGender, isValidDate, 
  isValidInsurance, isValidNumAdherent, isValidProvince,
  isValidCity, isValidPhone, isValidAddress

} from '../utils/function/validators';

const inssurance = ['FAR', 'CNOPS'];

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
    const [ cin, setCin ] = useState<string>('');
    const [ firstName, setFirstName ] = useState<string>('');
    const [ lastName, setLastName ] = useState<string>('');
    const [ gender, setGender ] = useState<'H' | 'F'>('H');
    const [ dateOfBirth, setDateOfBirth ] = useState<string>(''); // to change soon must be of type Date
    const [ insuranceCompany, setInsuranceCompany ] = useState< 'FAR' | 'CNOPS'>('FAR');
    const [ numAdherent, setNumAdherent ] = useState<string>('');
    const [ province, setProvince ] = useState<string>('');
    const [ city, setCity ] = useState<string>('');
    const [ phone, setPhone ] = useState<string>('');
    const [ address, setAddress ] = useState<string>('');
    const [ complimentAddress, setComplimentAddress ] = useState<string>('');
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isUserExist, setIsUserExist ] = useState<boolean>(false);
    const [ isSuccess, setIsSuccess ] = useState<boolean>(false);


    function ValidateAllFields(): boolean{
      const areAllFieldsValid = isValidCin(cin) && isValidName(firstName) && isValidName(lastName) && isValidGender(gender)
      && isValidDate(dateOfBirth) && isValidInsurance(insuranceCompany) && isValidNumAdherent(numAdherent) && isValidProvince(province)
      && isValidCity(city) && isValidPhone(phone) && isValidAddress(address) && isValidAddress(complimentAddress);
      if( areAllFieldsValid){
        return true
      }else{
        return false
      }
      
    }
    
    const [ addPatient ] = useAddPatientMutation();

      function handleSubmit(){
        if(ValidateAllFields()){
          //post new Patient s
          const newPatient: patient = {
            cin,
            firstName,
            lastName,
            gender,
            dateOfBirth,
            insuranceCompany,
            numAdherent,
            province,
            city, 
            phone,
            address,
            complimentAddress
          };
          setIsLoading(true)
          addPatient(newPatient)
          .then((res:any )=>{
            if(res?.error?.data?.message === 'userExist') {setIsUserExist(true);setIsLoading(false)}
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
        }else {
          //show message to the user to modify fields that they are not valid, to add soon
        }

    }

    useEffect(()=>{
      
        
    }, [user?.userId])
  
  return (
    <div className='w-full h-full min-h-max flex '>
      <div className="w-full h-100 min-h-max bg-lightly-blue rounded-lg mt-5 flex flex-col px-8 pt-10 pb-10">
        <div className='w-full flex flex-row  flex flex-col '>
          <div className="min-w-max flex flex-row hidden md:flex items-center -mt-5 ">
            <div className='w-10 h-10 bg-icon-add-doc-svg bg-center bg-no-repeat bg-cover'/>
            <div className='text-xl font-medium text-dark-blue font '>Nouveau Dossier</div>
          </div>
          <div className="text-light-blue text-lg font-medium mt-2 mb-5">Patient</div>
          <div className="w-full max-w-xs">
        </div>    
        <form onSubmit={e=>{e.preventDefault(); handleSubmit()}}> 
          <div className="grid gap-6 mb-6 md:grid-cols-4">
            <div>
                <label htmlFor="cin" className="block mb-2 text-sm font-medium text-dark-blue dark:text-white flex flex-row">CINE<p className="text-light-blue">*</p></label>
                <input onChange={e =>setCin(e.target.value)} onFocus={e=>setIsUserExist(false)} type="text" id="cin" className="bg-transparent border border-dark-gray text-dark-gray font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="AA123**" required/>
                { isUserExist && <div className="text-red">un utilisateur est enregistrer avec la meme cin</div>}
            </div>
            <div>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-dark-blue dark:text-white flex flex-row">Nom<p className="text-light-blue">*</p></label>
                <input onChange={e => setLastName(e.target.value)} type="text" id="last_name" className="bg-transparent border border-dark-gray text-dark-gray font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Taper Votre Nom" required/>
            </div>
            
            <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-dark-blue dark:text-white flex flex-row">Prénom<p className="text-light-blue">*</p></label>
                <input onChange={e => setFirstName(e.target.value)} type="text" id="first_name" className="bg-transparent border border-dark-gray text-dark-gray font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Taper votre Prénom" required/>
            </div>  
            <div >
            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-dark-blue dark:text-white flex flex-row">Sexe<p className="text-light-blue">*</p></label>
              <div className="relative">
                <select id="gender" className="block appearance-none w-full bg-transparent border border-gray-200 text-gray-700 mt-3 py-2.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 bg-transparent border border-dark-gray text-dark-gray font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                  <option>Homme</option>
                  <option>Femme</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div> 
            <div>
                <label htmlFor="date_of_birth" className="block mb-2 text-sm font-medium text-dark-blue dark:text-white flex flex-row">Date de Naissance<p className="text-light-blue">*</p></label>
                <input onChange={e => setDateOfBirth(e.target.value)} type="text" id="date_of_birth" className="bg-transparent border border-dark-gray text-dark-gray font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="dd/mm/yyyy" required/>
            </div>  
            <div >
            <label htmlFor="insurance" className="block mb-2 text-sm font-medium text-dark-blue dark:text-white flex flex-row">Couverture<p className="text-light-blue">*</p></label>
              <div className="relative">
                <select id="insurance" className="block appearance-none w-full bg-transparent border border-gray-200 text-gray-700 mt-3 py-2.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 bg-transparent border border-dark-gray text-dark-gray font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                  {inssurance.map(e=>
                    <option key={e}>{e}</option>
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div> 
            <div>
                <label htmlFor="num_adherent" className="block mb-2 text-sm font-medium text-dark-blue dark:text-white flex flex-row">N° d'adhérant<p className="text-light-blue">*</p></label>
                <input onChange={e => setNumAdherent(e.target.value)} type="text" id="num_adherent" className="bg-transparent border border-dark-gray text-dark-gray font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123456****" required/>
            </div>
            <div>
                {/* /should be a option select to check with team */}
                <label htmlFor="province" className="block mb-2 text-sm font-medium text-dark-blue dark:text-white flex flex-row">Province<p className="text-light-blue">*</p></label>
                <input onChange={e => setProvince(e.target.value)} type="text" id="province" className="bg-transparent border border-dark-gray text-dark-gray font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Grand Casablanca" required/>
            </div>
          </div>
          {/* */}
          <div  className="flex flex-wrap -mx-3 mb-2">
            <div  className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-dark-blue dark:text-white flex flex-row">Ville<p className="text-light-blue">*</p></label>
              <input onChange={e => setCity(e.target.value)} type="text" id="city" className="bg-transparent border border-dark-gray text-dark-gray font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Casablanca" required/>
            </div>
            <div  className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-dark-blue dark:text-white flex flex-row">Téléphone<p className="text-light-blue">*</p></label>
              <input onChange={e => setPhone(e.target.value)}type="text" id="phone" className="bg-transparent border border-dark-gray text-dark-gray font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="06******" required/>
            </div>
            <div  className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-dark-blue dark:text-white flex flex-row">adresse<p className="text-light-blue">*</p></label>
              <input onChange={e => setAddress(e.target.value)} type="text" id="address" className="bg-transparent border border-dark-gray text-dark-gray font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="votre adresse" required/>
            </div>
          
            </div>
          {/*  */}
          <div className="mb-6">
            <label htmlFor="compliment_address" className="block mb-2 text-sm font-medium text-dark-blue dark:text-white">Complément d'adresse</label>
            <input onChange={e => setComplimentAddress(e.target.value)} type="text" id="compliment_address" className="bg-transparent border border-dark-gray text-dark-gray font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"/>
          </div> 

          <div className="flex flex-row w-full justify-between">
            <button className=" text-white bg-dark-gray hover:bg-dark-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-20 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Annuler</button>
            <button type="submit" className="text-white bg-light-blue hover:bg-dark-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-20 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider</button>
          </div>
        </form>
        </div>
        
      </div>
      {/* fixe css */}
      {(isLoading || isSuccess) &&
        <div className="fixed w-full  h-full bg-white-opacity z-[10] mt-5 flex flex-row items-center justify-center">
          {isLoading && <Loader type="spinner-circle" bgColor={colors.darkBlue} color={colors.darkBlue} title={"En cours de téléchargement"} size={100} />}      
          {isSuccess && <div className="text-green font-bold text-xl"> Le Patient a été enregistrée avec succès</div>}      
        </div>
      }
    </div>
  )
}

