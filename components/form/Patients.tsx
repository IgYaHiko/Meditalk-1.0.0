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
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patients.actions"


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
 
const  Patients = () => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
    setisLoading(true)
    try {
       
      const userData = {name, email, phone}
      const user = await createUser(userData)
      if(user) router.push(`/patients/${user.$id}/register`) 

    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <section className="" >
          <h1 className="text-[12vw] md:text-[2vw] font-[poppins] ">Hi Patients</h1>
          <p>Schedule your first appointment....</p>
        </section>
        <CustomFormField
          name="name"
          control={form.control}
          CustomLabels={"Full name"}
          fieldType={FormFieldType.INPUT}
          cusPlaceholder={"Johnny Sins"}
          iconsrc={'/assets/icons/user.svg'}
          
        />
        <CustomFormField
          name="email"
          control={form.control}
          CustomLabels={"Email address"}
          fieldType={FormFieldType.INPUT}
          cusPlaceholder={"johnnysins@gmail.com"}
          iconsrc={'/assets/icons/email.svg'}
          
        />
        <CustomFormField
          name="phone"
          control={form.control}
          CustomLabels={"Phone number"}
          fieldType={FormFieldType.PHONE_INPUT}
          cusPlaceholder="wefwef"
          iconsrc={'/assets/icons/close.svg'}
          
        />
        
        <SubmitButton
         isLoading={isLoading}
         className="bg-blue-800 w-full"
        >Get Started...</SubmitButton>
      </form>
    </Form>
  )
}

export default Patients