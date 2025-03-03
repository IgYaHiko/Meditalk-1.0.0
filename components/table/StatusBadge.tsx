import { StatusIcon } from '@/constant'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
const StatusBadge = ({status}: {status: Status}) => {
  return (
    <div
    className={clsx('status-badge', {
         'bg-green-950' : status === 'scheduled',
         'bg-blue-600': status === 'pending',
         'bg-red-950'   : status === 'cancelled'
    })}
    >
     <Image 
      src={StatusIcon[status]}
      alt='status'
      width={100}
      height={100}
      className='h-4 w-fit'
     />
     <p>{status}</p>
    </div>
  )
}

export default StatusBadge