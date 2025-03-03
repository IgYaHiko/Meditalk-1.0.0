import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

const StatCard = ({
    type,
    count=0,
    label,
    icon
}: admin) => {
  return (
    <div className={clsx('stat-card',{
      'bg-appointments' : type === 'appointments',
      'bg-pending' : type === 'pending',
      'bg-cancelled' : type === 'cancelled',
    })} >
     <h1 className='text-[1.5vw] font-[700] capitalize'>{type}</h1>
     <div className='w-full flex items-center gap-4 justify-start'>
        <Image
         alt='icons'
         width={100}
         height={100}
         src={icon}
         className='h-10 w-fit'
        />
       <h1 className='text-[2vw] font-[poppins]'>{count}</h1>
     </div>
      <h1 className=''>{label}</h1>
    </div>
  )
}

export default StatCard