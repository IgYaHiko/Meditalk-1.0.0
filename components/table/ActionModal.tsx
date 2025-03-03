import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button';
import AppointmentForm from '../form/AppointmentForm';
import { Appointment } from '@/types/appwrite.types';
interface Type {
    type: 'schedule' | 'cancel';
    userId: string,
    patientId: string,
    appointment: Appointment,
    
}
const ActionModal = ({type,userId,patientId,appointment}: Type) => {
  const [open, setOpen] = useState(false);
  return (
    <>
<Dialog open={open} onOpenChange={setOpen} >
  <DialogTrigger className='flex gap-4'>
    <Button className={`capitalize ${type === 'schedule' ? 'text-green-400' : 'text-red-500'  } `}  variant="ghost" >
        {type}
    </Button>
  </DialogTrigger>
  <DialogContent className='shad-dialog sm:max-w-md' >
    <DialogHeader className='mb-4 space-y-3' >
      <DialogTitle>{type} Appointment</DialogTitle>
      <DialogDescription>
        Please fill in the following details to {type} an appointment
      </DialogDescription>
    </DialogHeader>
     <AppointmentForm
     userId={userId}
     patientId={patientId}
     type={type}
     appointment={appointment}
     setOpen={setOpen}
      
    />
  </DialogContent>
</Dialog>

    </>
  )
}

export default ActionModal