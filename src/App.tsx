import { useEffect, useState } from 'react';
import * as React from 'react'
import Header from './layout/header';
import Loader from "react-js-loader";
import { UserContext } from './useContext/userContext';
import { RouterProvider } from "react-router-dom";
import { router } from './router/router'
import "./index.css";





type user = {
  userId: string,
  firstName: string,
  lastName: string,
  cin: string,
  numBox: number,
};

const tempUser: user = {
  userId: '12346', 
  firstName: 'UM', 
  lastName: 'Amezmiz', 
  cin: 'AA123', 
  numBox: 1
};




function App() {
  const [ user, setUser ] = useState<user>(tempUser);
  const [ date, setDate ] = useState<string>('');
  const [ time, setTime ] = useState<string>('');
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  

  useEffect(()=>{
    //for the header !!! set time & date  can be calculated from front or from the backend, to check 
    setDate('Mercredi 12 juillet');
    setTime('19:30');
    // fetch user or get userInfo After auth
    
    setIsLoading(false);
  }, [])

  //listPatientScreen does not use user info it only pass it to it's child, 
  //there for it's preferable to use useContext
  return (
    <UserContext.Provider value={user ? user : undefined}>
      <div className='overflow-y-auto w-full h-screen min-w-600 bg-global-svg bg-center bg-no-repeat bg-cover 
        flex flex-col place-content-center justify-items-center items-center px-10 pt-10 over pb-20'>
        {user && !isLoading &&
        <div className='w-full h-full flex flex-col max-w-1800'>
          <Header date={date} time={time} fullName={user.firstName+' '+user?.lastName} numBox={user.numBox}/>
          <RouterProvider router={router} />
        </div>
        }

      </div>
    </UserContext.Provider>

  )
}

export default App
