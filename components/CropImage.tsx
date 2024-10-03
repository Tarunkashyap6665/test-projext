"use client"
import React, { useState, useRef, useCallback, useEffect, useContext } from 'react'

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './shared/canvasPreview'
import { useDebounceEffect } from '@/lib/hooks/useDebounceEffect'

import 'react-image-crop/dist/ReactCrop.css'
import { useDropzone } from 'react-dropzone'
import { FiDownloadCloud, FiUploadCloud } from 'react-icons/fi'
import { Slider, Switch } from '@material-tailwind/react'
import { ImageContext } from './shared/context/ImageProvider'
import DragAndDrop from './shared/DragAndDrop'
import Image from 'next/image'

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function CropImage() {
  // drag and drop
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null)

  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [rotateRangeBar, setRotateRangeBar] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)

  const imageContext = useContext(ImageContext)

  useEffect(() => {
    if(!imageContext) return

    setOriginalImage(imageContext.image)

  }, [])







  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  async function handleDownload() {
    const image = imgRef.current
    const previewCanvas = previewCanvasRef.current
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist')
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    )
    const ctx = offscreen.getContext('2d')
    if (!ctx) {
      throw new Error('No 2d context')
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    )
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: file?.type,
    })

    const imageURL = URL.createObjectURL(blob)

    const a = document.createElement("a");

    a.href = imageURL;

    if (file?.name && file?.name.length)
      a.download = `${file?.name.replace(" ", "_")}`;
    document.body.appendChild(a);
    a.click();
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    0,
    [completedCrop, scale, rotate, originalImage],
  )

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined)
    } else {
      setAspect(16 / 9)

      if (imgRef.current) {
        const { width, height } = imgRef.current
        const newCrop = centerAspectCrop(width, height, 16 / 9)
        setCrop(newCrop)
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height))
      }
    }
  }

  const handleRotate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const rotation = value * 3.6
    setRotate(Math.floor(rotation))
    setRotateRangeBar(value)
  }


  // drag and drop function 
  const onDrop = useCallback((acceptedFiles: File[]) => {

    const file = acceptedFiles[0];
    setFile(file)
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string; // Type assertion
      setOriginalImage(result);

    };

    reader.readAsDataURL(file);
  }, []);

  const { open } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.bmp'], // Use an object to specify the accept type
    },
    multiple: false,
  });
  return (
    <>
      
          <div className="bg-white shadow-lg rounded-lg">

            {originalImage ?


              (
                <div className="mt-2 p-6">
                  <div className="flex flex-col md:flex-row justify-around  space-y-4 md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-1/2" >
                      <h2 className="text-lg font-semibold mb-2">Original Image</h2>
                      <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                        className='rounded-lg overflow-hidden'
                        // minWidth={400}
                        minHeight={100}
                      // circularCrop
                      >
                        <Image
                          ref={imgRef}
                          width={100}
                          height={100}
                          alt="Crop me"
                          src={originalImage}
                          className='w-full'
                          style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                          onLoad={onImageLoad}
                        />
                      </ReactCrop>
                    </div>
                    <div className="w-full md:w-1/2 flex  flex-col" >

                      <h2 className="text-lg font-semibold mb-2 ">Cropped Image</h2>
                      <div className='self-center'>


                        {!!completedCrop && (

                          <canvas
                            ref={previewCanvasRef}
                            style={{

                              objectFit: 'contain',
                              width: completedCrop.width,
                              height: completedCrop.height,
                            }}
                          />

                        )}
                      </div>
                    </div>
                  </div>



                  <div className="w-full px-3 my-3 py-2">
                    <div className='flex gap-2'>


                      <span className='font-semibold'>Aspect Ratio : </span><Switch color='cyan' defaultChecked onClick={handleToggleAspectClick} onPointerEnter={() => { } } onPointerLeave={undefined} crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                    </div>
                  </div>
                  <div className="w-full px-3 my-3 py-2">
                    <span className='font-semibold '>Scale : {scale}</span>
                    <Slider color='amber' className='mt-1' step={1} min={1} max={100} value={scale || 1} onChange={(e) => setScale(Number(e.target.value))} placeholder={undefined} onPointerEnter={() => { } } onPointerLeave={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                  </div>
                  <div className="w-full px-3 my-3 py-2">
                    <span className='font-semibold '>Rotate : {rotate}</span><br />
                    <input type='range'  className='mt-1 w-full'  value={rotateRangeBar||0} min={0} max={100} step={1} onChange={handleRotate} />
                  </div>

                  <button
                    onClick={handleDownload}
                    className={`mt-6 mb-3 w-full  py-2 px-4 rounded-md  focus:outline-none focus:ring-2  focus:ring-offset-2  flex items-center justify-center bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-[101%]`}

                  >
                    <FiDownloadCloud className="mr-2" />
                    Download
                  </button>

                  <button
                    onClick={open}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-[101%] flex items-center justify-center"

                  >
                    <FiUploadCloud className="mr-2" />
                    Upload Image
                  </button>
                </div>
              ) : (
                (
                  <DragAndDrop onDrop={onDrop}/>
                )
              )}
          </div>
     

      

    </>
  )
}
