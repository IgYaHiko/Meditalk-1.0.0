"use client";

import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  
import Image from 'next/image';
import { usePathname, useRouter } from "next/navigation"
import { decryptKey, encryptKey } from '@/lib/utils';

  
const PassKeyModal = () => {
const errorMessages = [
    "The Passkey is incorrect! Try again.",
    "Oops! Still wrong. Check carefully.",
    "Come on! This is your last attempt.",
    "Access Denied! You need the right key."
];
const router = useRouter();
const path = usePathname();
 const [open, setOpen] = useState(true);
 const [passkey, setPasskey] = useState("");
 const [error, setError] = useState("");
 const [attempts, setAttempts] = useState(0);
 const closeModal = () => {
     setOpen(false);
     router.push("/");

 }
/*  const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem("accessKey") : null;
 useEffect(() => {
     const accesskey = encryptedKey && decryptKey(encryptedKey);
    if(path) {
        if(accesskey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
            setOpen(false);
            router.push("/admin"); 
        }else {
            setOpen(true);
        }
    }
    
 }, [encryptedKey]) */
 
 const validatePasskey = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
     e.preventDefault();
     if(passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
         const encryptedKey = encryptKey(passkey);
         localStorage.setItem("accessKey", encryptedKey);
         setOpen(false);
          router.push("/admin"); 
     }else {
      const message = errorMessages[Math.min(attempts, errorMessages.length - 1)];
      setError(message);
      setAttempts(attempts + 1);
     }
 }
  return (
    <AlertDialog open={open} onOpenChange={setOpen} >
    <AlertDialogContent className='shad-alert-dialog'> 
      <AlertDialogHeader>
        <AlertDialogTitle  onClick={() => closeModal()} className='flex items-center justify-between'>
        Admin Access Verification
        <Image
         width={1000}
         height={1000}
         alt='close'
         src='/assets/icons/close.svg'
         className='h-8  w-fit cursor-pointer'
        />
        </AlertDialogTitle>

        <AlertDialogDescription>
          To access the admin page please enter the pass key
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className=''>
      <InputOTP value={passkey} onChange={(value) => setPasskey(value) } maxLength={6}>
       <InputOTPGroup className='shad-otp' >
    <InputOTPSlot className='shad-otp-slot' index={0} />
    <InputOTPSlot className='shad-otp-slot' index={1} />
    <InputOTPSlot className='shad-otp-slot' index={2} />
    <InputOTPSlot className='shad-otp-slot' index={3} />
    <InputOTPSlot className='shad-otp-slot' index={4} />
    <InputOTPSlot className='shad-otp-slot' index={5} />
  </InputOTPGroup>
</InputOTP>
    {
        error && (
            <p className='shad-error text-14 text-left mt-3 '>
                {error}
            </p>
        )
    }
      </div>
      <AlertDialogFooter>
        <AlertDialogAction onClick={(e) => validatePasskey(e)} className='shad-primary-btn w-full'>Enter Admin Passkey</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default PassKeyModal