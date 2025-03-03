"use server";
import { ID, Query } from "node-appwrite";
import { APPOINTMENTS_COLLECTION_ID, BUCKET_ID, DATABASE_ID, databases, ENDPOINT, messaging, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache"; 
export const  createAppointment = async (appointment : CreateAppointmentParams) => {
    
   try {
    const createAppointment = await databases.createDocument(
        DATABASE_ID!,
        APPOINTMENTS_COLLECTION_ID!,
        ID.unique(),
        appointment
      );
       return parseStringify(createAppointment);
   } catch (error) {
     console.log(error);
   }
}

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENTS_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};

export const getRecentAppointment = async () => {
  try {
    noStore(); // Prevents Next.js from caching the response

    const recentAppoint = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENTS_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')]
    );

    console.log("Fetched Appointments:", recentAppoint.documents); // Debugging

    const initialCounts = {
      scheduleCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const count = (recentAppoint.documents as Appointment[]).reduce((acc, appointment) => {
      if (appointment.status === "scheduled") {
        acc.scheduleCount += 1;
      } else if (appointment.status === "pending") {
        acc.pendingCount += 1;
      } else if (appointment.status === "cancelled") {
        acc.cancelledCount += 1;
      }
      return acc;
    }, initialCounts);

    const data = {
      totalCount: recentAppoint.total,
      ...count,
      documents: recentAppoint.documents,
    };

    return parseStringify(data); // Removed parseStringify() if not needed
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return { totalCount: 0, documents: [] };
  }
};

export const updateAppointment = async ({appointmentId,userId,appointment,type} : UpdateAppointmentParams) => {
   try {
     const upAppointment = await databases.updateDocument(
       DATABASE_ID!,
       APPOINTMENTS_COLLECTION_ID!,
       appointmentId,
       appointment

     )
     if(!upAppointment) {
       throw new Error("appointment Id not found")
     }

     const sendMsgNoti = `Greetings from Meditalk. ${type === "schedule" ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.`;
     await sendSms(userId,sendMsgNoti);
     revalidatePath("/admin");
     return parseStringify(upAppointment);
   } catch (error) {
     console.log(error)
   }
}

export const sendSms = async (userId:string,content:string) => {
    try { 
      const message = await messaging.createSms(
        ID.unique(),
        content,
        [],
        [userId]
      )
      return parseStringify(message);
    } catch (error) {
      console.log(error)
    }
}