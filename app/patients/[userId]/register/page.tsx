import Image from "next/image";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/form/RegisterForm";
import { getUser } from "@/lib/actions/patients.actions";
const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/images/fullmed.png"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-20 w-fit"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2025 meditalk</p>
        </div>
      </section>

     <div className="hidden lg:flex w-[40%] justify-center items-center p-4 rounded-md">
             <Image
               width={1000}
               height={1000}
               alt="onboarding"
               src="/assets/images/register-img.png"
               className="max-w-full side-img rounded-md object-contain"
             />
           </div>
    </div>
  );
};

export default Register;