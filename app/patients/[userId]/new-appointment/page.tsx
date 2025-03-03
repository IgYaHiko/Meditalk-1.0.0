import AppointmentForm from "@/components/form/AppointmentForm";
import Patients from "@/components/form/Patients";
import { Button } from "@/components/ui/button";
import { getPatient } from "@/lib/actions/patients.actions";
import Image from "next/image";
import Link from "next/link";

const  NewAppointment = async  ({params : {userId}}: SearchParamProps) => {
  const patient = await getPatient(userId);
    /* console.log(patient);  */
  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto px-6 md:px-12 lg:px-16 xl:px-20"> 
        <div className="sub-container mx-auto max-w-[700px]">
          <Image
            src="/assets/images/fullmed.png"
            height={1000} 
            width={1000}
            className="mb-12 h-24 w-fit"
            alt="logo"
          />
          <AppointmentForm userId={userId} patientId={patient.$id} type="create"  />
          <div className="flex mt-16 justify-between text-sm opacity-80">
            <p className="text-dark-600">© 2025 MediTalk</p>
            
          </div>
        </div>
      </section>

      <div className="hidden lg:flex w-[50%] justify-center items-center p-4 rounded-md">
        <Image
          width={1000}
          height={1000}
          alt="onboarding"
          src="/assets/images/apps.jpg"
          className="max-w-full side-img rounded-md object-contain"
        />
      </div>
    </div>
  );
}
export default NewAppointment;