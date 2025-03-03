import { Button } from '@/components/ui/button';
import { Doctors } from '@/constant';
import { getAppointment } from '@/lib/actions/appointment.action';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
  // Extract appointmentId from searchParams
  const appointmentId = searchParams?.appointmentId as string;

  // Log appointmentId for debugging
  console.log('appointmentId:', appointmentId);

  // Handle missing appointmentId
  if (!appointmentId) {
    return (
      <div className="flex h-screen max-h-screen px-[5%]">
        <div className="success-img">
          <Link href="/">
            <Image
              width={1000}
              height={1000}
              alt="logo"
              src="/assets/images/fullmed.png"
              className="h-24 w-fit"
            />
          </Link>
          <section className="flex flex-col items-center">
            <h1 className="text-[2vw] leading-[2.5vw] font-[poppins] text-red-500">
              Error: Appointment ID is missing!
            </h1>
            <p className="mt-3 text-[1vw]">
              Please check the URL and try again.
            </p>
          </section>
        </div>
      </div>
    );
  }

  // Fetch appointment data
  const appointment = await getAppointment(appointmentId);

  // Handle missing appointment
  if (!appointment) {
    return (
      <div className="flex h-screen max-h-screen px-[5%]">
        <div className="success-img">
          <Link href="/">
            <Image
              width={1000}
              height={1000}
              alt="logo"
              src="/assets/images/fullmed.png"
              className="h-24 w-fit"
            />
          </Link>
          <section className="flex flex-col items-center">
            <h1 className="text-[2vw] leading-[2.5vw] font-[poppins] text-red-500">
              Error: Appointment not found!
            </h1>
            <p className="mt-3 text-[1vw]">
              Please check the appointment ID and try again.
            </p>
          </section>
        </div>
      </div>
    );
  }

  // Find the doctor based on the primaryPhysician in the appointment
  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            width={1000}
            height={1000}
            alt="logo"
            src="/assets/images/fullmed.png"
            className="h-24 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            width={1000}
            height={1000}
            alt="success"
            src="/assets/gifs/success.gif"
            className="h-24 w-fit"
          />
          <h1 className="text-[2vw] leading-[2.5vw] font-[poppins]">
            Your <span className="text-green-400">Appointment request</span>
            <br /> is successfully submitted!
          </h1>
          <p className="mt-3 text-[1vw]">We will be in touch shortly to confirm!</p>
        </section>

        <section className="request-details">
          <h1>Your request details:</h1>
          <div className="flex items-center gap-6">
            <Image
              src={doctor?.image!}
              alt="doctor"
              height={1000}
              width={1000}
              className="h-10 w-fit"
            />
            <div>
              <h1>Dr. {doctor?.name}</h1>
            </div>
            <div className="flex gap-3 items-center">
              <Image
                src="/assets/icons/calendar.svg"
                height={1000}
                width={1000}
                alt="calendar"
                className="h-5 w-fit"
              />
              <h1>{formatDateTime(appointment.schedule).dateTime}</h1>
            </div>
          </div>
        </section>

        <Button variant="outline" asChild className="shad-primary-btn">
          <Link href={`/patients/${userId}/new-appointment`}>New Appointment</Link>
        </Button>
        <p className="text-dark-600">© 2025 MediTalk</p>
      </div>
    </div>
  );
};

export default Success;