import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

interface ButtonPropss {
   children: React.ReactNode,
   isLoading: boolean,
   className?: string
}
const SubmitButton = (props: ButtonPropss) => {
  const {children,isLoading,className} = props
  return (
   <Button type='submit' disabled={isLoading} className={className ?? "shad-primary-btn w-full"} >
      {
        isLoading ? (
          <div className='items-center justify-center flex gap-5' >
            <Image
              src={"/assets/icons/loader.svg"}
              alt='loading'
              width={20}
              height={20}
              className='animate-spin'
             />
             <h1 className=''>Good evening...</h1>
          </div>
        ) : 
        
       children
        
      }
   </Button>
  )
}

export default SubmitButton