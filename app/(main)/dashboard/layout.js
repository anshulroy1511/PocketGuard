import React, { Suspense } from 'react'
import DashboardPage from './page';
import { BarLoader } from 'react-spinners';

const DashboardLayout = () => {
  return (
    <div className='px-5'>
       <div className="flex items-center justify-between mb-5">
         <h1 className='text-6xl font-bold gradient-title mb-5'>Dashboard</h1>
      </div>
       {/* Dashboard page */}
 
 {/* suspense is used to show the loading indicator */}
       <Suspense 
       fallback = {<BarLoader className="mt-4" width={"100%"} color="#9333ea" />} 
       >
         <DashboardPage/>
       </Suspense>
       


    </div>
  )
}

export default DashboardLayout;