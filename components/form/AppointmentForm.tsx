"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { CreateAppointmentSchema, getAppointmentSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { Doctors } from "@/constant"
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.action"
import { Appointment } from "@/types/appwrite.types"



export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}
 
/* const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
}) */
interface AppointmentFormProps{
     type: "create" | "cancel" | "schedule",
     userId:string,
     patientId?: string,
     appointment: Appointment,
     setOpen : (open: boolean) => void;
     
}
const  AppointmentForm = ({
    type,userId,patientId,appointment,setOpen
}: AppointmentFormProps) => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  // 1. Define your form.
  const AppointmentFormValidation = getAppointmentSchema(type)
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment && appointment.primaryPhysician,
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment ?  appointment.reason : "",
      note: appointment ? appointment.note : "",
      cancellationReason: ""

      
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(value: z.infer<typeof AppointmentFormValidation>) {
    setisLoading(true)
    let status;
    switch (type) {
        case 'schedule':
        status = 'scheduled';
        break;

        case 'cancel':
        status = 'cancelled';
        break;
       
       default:
        status = 'pending';
        break;
    }


    try {
       if(type === 'create' && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: value.primaryPhysician,
          schedule: new Date(value.schedule),
          reason: value.reason!,
          note: value.note,
          status: status as Status,
          cancellationReason: value.cancellationReason, 
         }
          const newAppointment = await createAppointment(appointmentData); 
          if(newAppointment) {
            form.reset()
            router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`)
          }
       } else {
          console.log("updating appointment")
          const appointmentToUpdate = {
             userId,
             appointmentId: appointment?.$id!,
             appointment: {
               primaryPhysician: appointment?.primaryPhysician,
               schedule: new Date(value?.schedule),
               status: status as Status,
               cancellationReason: value?.cancellationReason,
              },
              type

          }

          const updatedAppointment = await updateAppointment(appointmentToUpdate);

          if(updatedAppointment) {
             setOpen && setOpen(false);
             form.reset()
          }
      

       }

    


    } catch (error) {
      console.log(error)
    }
    
  }

 let buttonLabel;
 switch (type) {
    case "create":
    buttonLabel = "Create Appointment";
    break;

    case "cancel":
    buttonLabel = "Cancel Appointment";
    break;

    case "schedule":
    buttonLabel = "schedule Appointment";
    break;
 
    default:
        break;
 }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
       { type === 'create' ? (

        <section className="" >
          <h1 className="text-[2vw] font-[poppins] ">New Appointment!</h1>
          <p>Request a new appointment in just 10 seconds.....</p>
        </section>) : (
          <Image 
           alt="logo"
           width={100}
           height={100}
           className="h-20 w-fit"
           src='/assets/images/fullmed.png'
          />

        )
        
      
      }
        {
            type !== "cancel" && (
                <>
                <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                CustomLabels="Primary care physician"
                cusPlaceholder="Johnny sins"
              >
                {Doctors.map((doctor, i) => (
                  <SelectItem key={doctor.name + i} value={doctor.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <Image
                        src={doctor.image}
                        width={32}
                        height={32}
                        alt="doctor"
                        className="rounded-full border border-dark-500"
                      />
                      <p>{doctor.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>

              <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              CustomLabels="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />
              <div className="flex flex-col md:flex-row gap-6">
              <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="reason"
              CustomLabels="Reason for appointment"
              cusPlaceholder="Enter a reason for appointment"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="note"
              CustomLabels="Notes"
              cusPlaceholder="Messages"
            />

              </div>
                </> 
            )
        }

        {
            type === 'cancel' && (
                
            <>
             <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="cancellationReason"
              CustomLabels="Reason for cancellation"
              cusPlaceholder="Cancellation Reason"
            /> 

            </>

        )
    }
        <SubmitButton
         isLoading={isLoading}
         className={`${type === 'cancel' ? 'shad-danger-btn': 'shad-primary-btn'} w-full`}
        >{buttonLabel}</SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm