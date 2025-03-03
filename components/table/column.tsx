"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "./StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constant";
import Image from "next/image";
import ActionModal from "./ActionModal";
 import { Appointment } from "@/types/appwrite.types"; 

 /*  export type Appointment = {
  id: string;
  amount: number;
  status: "pending" | "schedule" | "cancelled";
  email: string;
  patient: { name: string; $id: string }; // Ensure patient is an object
  name: string;
  schedule: string; // Assuming it's a date string
  primaryPhysician: string;
  userId: string;
};  */

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p>{row.index + 1}</p>,
  },
  {
   accessorKey: 'patients',
   header: 'Patient',
   cell: ({row}) => <p>{row.original.patient.name}</p>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: () => <div className="text-left">Appointment</div>,
    cell: ({ row }) => <p>{formatDateTime(row.original.schedule)?.dateTime || "N/A"}</p>,
  },
  {
    accessorKey: "primaryPhysician",
    header: () => <div className="text-left">Doctors</div>,
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician);
      return doctor ? (
        <div className="flex gap-4 items-center">
          <Image
            width={1000}
            height={1000}
            className="h-8 w-fit"
            alt={doctor.name}
            src={doctor.image}
          />
          <p className="whitespace-nowrap">{doctor.name}</p>
        </div>
      ) : (
        <p>No Doctor Assigned</p>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-left">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex items-center">
          <ActionModal
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId ?? ""}
            appointment={data}
          />
          <ActionModal
            type="cancel"
            patientId={data.patient.$id}
            userId={data.userId ?? ""}
            appointment={data}
          />
        </div>
      );
    },
  },
];
