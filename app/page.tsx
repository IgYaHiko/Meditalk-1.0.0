import Patients from "@/components/form/Patients";
import PassKeyModal from "@/components/PassKeyModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home({searchParams}: SearchParamProps) {
  const isAdmin = searchParams.admin === 'true';
  return (
    <div className="flex h-screen max-h-screen">
      {
        isAdmin && (
          <PassKeyModal/>
        )
      }
      <section className="container my-auto px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="sub-container mx-auto max-w-[600px]">
          <Image
            src="/assets/images/fullmed.png"
            height={1000} 
            width={1000}
            className="mb-12 h-24 w-fit"
            alt="logo"
          />
          <Patients />
          <div className="flex mt-16 justify-between text-sm opacity-80">
            <p className="text-dark-600">© 2025 MediTalk</p>
            <Link href="/?admin=true" className="text-blue-500 font-mono">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <div className="hidden lg:flex w-[50%] justify-center items-center p-4 rounded-md">
        <Image
          width={1000}
          height={1000}
          alt="onboarding"
          src="/assets/images/sinss.png"
          className="max-w-full side-img rounded-md object-contain"
        />
      </div>
    </div>
  );
}
