
import StatCard from '@/components/StatCard'
import { columns } from '@/components/table/column'
import {DataTable} from '@/components/table/DataTable'
import { getRecentAppointment } from '@/lib/actions/appointment.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { date } from 'zod'

const Admin = async () => {
  
  const appointment = await getRecentAppointment();
  console.log(appointment);
  return (
     <div className='flex-col max-w-7xl mx-auto '>
       <header className='admin-header'>
        <Link href="/" >
         <Image
           width={1000}
           height={1000}
           alt='logo'
           src="/assets/images/fullmed.png"
           className='h-16 w-fit md:h-24'
         />
        </Link>
         <p className='font-[monospace] text-[3vw] md:text-[1vw]' >Admin Dashboard</p>
       </header>
       <main className='admin-main'>
        <section className='w-full space-y-4'>
           <h1 className='header font-[poppins]'>Welcome, Yahiko 😈💦</h1>
           <p className='text-[1.2vw]'>start the day with new fucking problems....!</p>
        </section>
       <section className='admin-stat'>
        <StatCard
         type="appointments"
         count={appointment.scheduleCount}
         label="Schedule appointment..!😇"
         icon='/assets/icons/appointments.svg' 
        />
        <StatCard
         type="pending"
         count={appointment.pendingCount}
         label="Total number of pending..!😷"
         icon='/assets/icons/pending.svg' 
        />
        <StatCard
         type="cancelled"
         count={appointment.cancelledCount}
         label="Total number of cancel by fuckers🤬"
         icon='/assets/icons/cancelled.svg' 
        />
       </section>
        <DataTable columns={columns} data={appointment.documents}/> 
       
       </main>
     </div>
  )
}

export default Admin