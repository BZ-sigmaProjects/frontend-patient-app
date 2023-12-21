import * as React from 'react';

type HeaderProps = {
  date: string,
  time: string,
  fullName: string, 
  numBox: number
}


export default function Header({date, time, fullName, numBox}: HeaderProps) {

  
  
  return (
    <div className='w-full min-w-[300px] min-h-max  bg-lightly-blue rounded-lg shadow-xl flex flex-row items-start justify-between p-5 md:items-center'>
        <div className="flex flex-row flex-wrap	">
          <div className='menu w-20 flex flex-col'>
          <div className="w-1/3 h-0.5 bg-dark-blue mb-1.5 rounded-full"></div>
          <div className="w-2/5 h-0.5 bg-dark-blue mb-1.5 rounded-full"></div>
          <div className="w-1/6 h-0.5 bg-dark-blue mb-1.5 rounded-full"></div>
          </div>
          <div className="logo w-10 h-5 bg-logo-svg bg-center bg-no-repeat bg-cover"/>
          <div className="flex flex-row text-dark-blue font-medium ">
            <div> Visio</div>
            <div> Station</div>
          </div>

          <div className="text-sm  flex flex-row space-x-4 px-10 flex-wrap">
            <div className="min-w-max h-6 bg-light-blue text-white rounded-full px-6 mt-4 md:mt-0">{fullName}</div>
            <div className="min-w-max h-6 bg-dark-gray text-white rounded-full px-6 mt-4 md:mt-0">{`Box ${numBox}`}</div>
          </div>
          <div className="flex flex-row space-x-3 flex-wrap">
          <div className="flex-wrap	date flex flex-row items-center space-x-2 text-dark-blue mt-4 md:mt-0">
              <div className='w-5 h-5 bg-icon-date-svg bg-center bg-no-repeat bg-cover'/>
              <div>{date}</div>
          </div>
          <div className="flex-wrap date flex flex-row items-center space-x-2 text-dark-blue mt-4 md:mt-0">
              <div className='flex-wrap w-5 h-5 bg-icon-time-svg bg-center bg-no-repeat bg-cover'/>
              <div>{time}</div>
          </div>
          </div>
        </div>
       <div className='w-7 h-9 min-w-7 flex-shrink-0 bg-icon-bell-svg bg-center bg-no-repeat bg-contain'/>
    </div>
  )
}
