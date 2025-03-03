"use client"
import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploader = {
    file: File[] | undefined,
    onchange: (files: File[])  => void
}


const Fileuploader = ({file,onchange}: FileUploader)  => {
  const onDrop = useCallback((acceptedFile: File[]) => {
     onchange(acceptedFile)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload' >
      <input {...getInputProps()} />
      {
        file && file.length > 0 ? (
            <Image
             width={1000}
             height={1000}
             src={convertFileToUrl(file[0])}
             alt='uploaded Image'
             className='max-h-[400px] overflow-hidden object-cover'
            />
        ) : (
            <>
            <Image 
             width={40}
             height={40}
             alt='upload'
             src="/assets/icons/upload.svg"
            />
            <div className='file-upload_label'>
                <p className='text-14-regular'>
                    <span className='text-green-500'>Click Upload</span> or drag and drop
                </p>
                <p className=''>SVG,PNG,JPG,or GIF(max, 800 * 400px)</p>
            </div>
            </>
        )
      }
      

    </div>
  )
}


export default Fileuploader