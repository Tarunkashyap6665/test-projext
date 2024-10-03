"use client"
import React, { useState, useRef, useCallback, useEffect, useContext } from 'react'


import 'react-image-crop/dist/ReactCrop.css'
import { useDropzone } from 'react-dropzone'
import { FiDownloadCloud, FiImage, FiRotateCw, FiUploadCloud } from 'react-icons/fi'

import { Input } from '@/components/ui/input'
import { FaSpinner } from 'react-icons/fa'
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid'
import { Slider } from '@material-tailwind/react'
import { ImageContext } from './shared/context/ImageProvider'
import DragAndDrop from './shared/DragAndDrop'
import Img from 'next/image'



export default function ResizeImage() {
    // drag and drop
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null)

    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [transformedImage, setTransformedImage] = useState<string | null>(null);
    const [width, setWidth] = useState('');
    const [downloadImage, setDownloadImage] = useState<string>('' as string)
    const [height, setHeight] = useState('');
    const [size, setSize] = useState('')
    const [unit, setUnit] = useState("px");
    const [aspectRatio, setAspectRatio] = useState(1);
    const [transformedImageLoading, setTransformedImageLoading] = useState(false)
    const [, setError] = useState("");
    const [quality, setQuality] = useState(90)
    const [imageType, setImageType] = useState<string | null>(null)
    const [fileSizeType, setFileSizeType] = useState('')

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const originalImageRef = useRef<HTMLImageElement>(null)
    const prevWidth = useRef<string>();
    const prevHeight = useRef<string>();



    const [isAspectRatioLock, setIsAspectRatioLock] = useState(true)


    const imageContext = useContext(ImageContext)

    useEffect(() => {
        if (!image) return
        setWidth(String(Math.round(getConvertedSize(image.naturalWidth) * 100) / 100))
        setHeight(String(Math.round(getConvertedSize(image.naturalHeight) * 100) / 100))
    }, [unit])

    
    
    useEffect(() => {
        if (!imageContext) return

        setOriginalImage(imageContext.image)

    }, [])

    useEffect(() => {
        if (isAspectRatioLock && image) {
            if (width && prevHeight.current == height) {
                // Check if width has changed, execute only for width change
                setHeight(String(Math.round(Number(width) / aspectRatio)));
            } else if (height && width == prevWidth.current) {
                // Check if height has changed, execute only for height change
                setWidth(String(Math.round(Number(height) * aspectRatio)));
            }
        }
        // Always run this part regardless of the conditions
        setTransformedImage(null);

        // Track previous values to differentiate between changes
        prevWidth.current = width;
        prevHeight.current = height;

    }, [width, height, isAspectRatioLock, aspectRatio, image, quality, imageType]);




    // drag and drop function 
    const onDrop = useCallback((acceptedFiles: File[]) => {

        const file = acceptedFiles[0];
        setFile(file)
        const reader = new FileReader();

        reader.onload = (e) => {

            const img = new Image();
            img.onload = () => {
                setImage(img);
                setOriginalImage(result);
                setWidth(String(img.width));
                setHeight(String(img.height));
                setAspectRatio(img.width / img.height);
                setImageType(file.type)
                formatFileSize(file.size)
            };
            const result = e.target?.result as string; // Type assertion
            img.src = result

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






    function formatFileSize(bytes: number) {
        const kb = 1024;  // 1 KB = 1024 bytes
        const mb = kb * 1024;  // 1 MB = 1024 KB
        let val;

        if (bytes >= mb) {
            val = (bytes / mb).toFixed(2)
            setSize(val)
            setFileSizeType("MB")
        } else if (bytes >= kb) {
            val = (bytes / kb).toFixed(2)
            setSize(val)
            setFileSizeType("KB")

        } else {
            val = String(bytes)
            setSize(val)
            setFileSizeType("Bytes")
        }
    }


    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setWidth(value);
        setError("");
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setHeight(value);
        setError("");
    };

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setUnit(e.target.value);
    };
    const handleImageTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setImageType(e.target.value);
    };

    // const validateInput = () => {
    //     if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    //         setError("Please enter valid positive numbers for width and height.");
    //         return false;
    //     }
    //     return true;
    // };

    function replaceFileExtension(fileName: string, newExtension: string) {

        const arr = newExtension.split("/")
        const extension = "." + arr[1]
        return fileName.replace(/\.[^/.]+$/, extension);
    }

    const handleDownload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();


        const a = document.createElement("a");

        a.href = downloadImage;

        if (file?.name && file?.name.length) {
            const fileName = file?.name.replace(" ", "_")
            a.download = replaceFileExtension(fileName, imageType!);
        }
        document.body.appendChild(a);
        a.click();
    }

    const handleTransform = async () => {

        if (!canvasRef.current) return

        const ctx = canvasRef.current.getContext('2d');
        setTransformedImageLoading(true);
        const pixelWidth = convertToPixel(Number(width))
        const pixelHeight = convertToPixel(Number(height))
        canvasRef.current.width = pixelWidth;
        canvasRef.current.height = pixelHeight;



        ctx?.drawImage(originalImageRef.current!, 0, 0, pixelWidth, pixelHeight);


        // const result = await resizeFile(file!, Number(width), Number(height))
        const result = canvasRef.current?.toDataURL(imageType!, Number(quality / 100));

        // Calculate the size of the image file in bytes
        if (result) {
            const base64String = result.split(',')[1]; // Remove the "data:image/png;base64," part
            const decodedString = atob(base64String);  // Decode base64 to binary string
            const imageSizeBytes = decodedString.length;  // Each character represents 1 byte


            formatFileSize(imageSizeBytes)
        }





        setTransformedImage(result);
        setDownloadImage(result)
        imageContext?.setImage(result)

        setTransformedImageLoading(false);
    };

    const getConvertedSize = (size: number) => {
        switch (unit) {
            case "in":
                return size / 96;
            case "cm":
                return size / 37.8;
            case "mm":
                return size / 3.78;
            default:
                return size;
        }
    };


    const convertToPixel = (size: number) => {
        switch (unit) {
            case "in":
                return size * 96;
            case "cm":
                return size * 37.8;
            case "mm":
                return size * 3.78;
            default:
                return size;
        }
    };





    return (
        <>

            <div className="bg-white shadow-lg rounded-lg">

                {originalImage ?


                    (
                        <div className="mt-2 p-6">
                            <div className="flex flex-col md:flex-row justify-around  space-y-4 md:space-y-0 md:space-x-4">
                                <div className="w-full md:w-1/2" >
                                    <h2 className="text-lg font-semibold mb-2">Original Image</h2>

                                    <Img
                                        ref={originalImageRef}
                                        src={originalImage}
                                        width={100}
                                        height={100}
                                        alt="Original uploaded image"
                                        className="w-full h-auto rounded-lg shadow-md"
                                    />

                                </div>

                                <div className="w-full md:w-1/2 grid  " >
                                    <h2 className="text-lg font-semibold mb-2 ">Resize Image</h2>
                                    <canvas ref={canvasRef} hidden={true} />
                                    {transformedImage ? (
                                        <Img
                                            src={transformedImage}
                                            width={100}
                                            height={100}
                                            alt="transformed image"
                                            className="w-full h-auto rounded-lg shadow-md"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                            {transformedImageLoading ? <FaSpinner className="animate-spin text-4xl text-blue-500" /> : <FiImage className="h-12 w-12 text-gray-400" />}

                                        </div>
                                    )}
                                </div>
                            </div>





                            <div className="w-full px-3 mt-6 mb-3 md:my-6 py-2">
                                <div className='flex justify-around items-center gap-2 flex-col md:flex-row '>
                                    <div className='flex gap-5 justify-between w-full '>
                                        <div className='flex items-center gap-2'>
                                            <Input id='width' className='w-24' value={width}
                                                onChange={handleWidthChange} type='number' placeholder='Width' />
                                            <span className='font-medium'>{unit}</span>
                                        </div>
                                        <div className='flex items-center border cursor-pointer border-gray-400 rounded-lg p-1'>
                                            {isAspectRatioLock ? <LockClosedIcon className='fill-blue-600 w-8 h-8' onClick={() => setIsAspectRatioLock(!isAspectRatioLock)} /> : <LockOpenIcon className='stroke-blue-600 fill-transparent w-8 h-8' onClick={() => setIsAspectRatioLock(!isAspectRatioLock)} />}



                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <Input id='height' className='w-24' value={height}
                                                onChange={handleHeightChange} type='number' placeholder='Height' />
                                            <span className='font-medium'>{unit}</span>
                                        </div>
                                    </div>
                                    <div className='mt-3 md:mt-0 w-full flex justify-center '>
                                        <select
                                            id="unit"
                                            value={unit}
                                            onChange={handleUnitChange}
                                            className="w-full md:w-[80%]  px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            aria-label="Unit selection dropdown"
                                        >
                                            <option value="px">Pixels (px)</option>
                                            <option value="in">Inches (in)</option>
                                            <option value="cm">Centimeters (cm)</option>
                                            <option value="mm">Millimeters (mm)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-3 my-3 py-2">
                                <div className='flex flex-col md:flex-row justify-around gap-2  '>
                                    <div className=' md:w-[50%] flex gap-4 items-center'>
                                        <div className='w-full flex items-center  '>

                                            <span className='font-semibold w-1/2 px-1 md:px-0'>Quality : {quality}</span>

                                            <Slider color='deep-purple' className='w-full' step={1} min={1} value={quality} max={100} onChange={(e) => setQuality(Number(e.target.value))} placeholder={undefined} onPointerEnter={() => { } } onPointerLeave={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                                        </div>
                                    </div>
                                    <div className='flex md:gap-8 justify-between mt-3 md:mt-0 md:justify-around md:w-1/2'>
                                        <select
                                            id="type"

                                            value={imageType!}
                                            onChange={handleImageTypeChange}
                                            className=" px-3 w-1/3 md:ml-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            aria-label="Unit selection dropdown"
                                        >
                                            <option value="image/png" >PNG</option>
                                            <option value="image/jpeg" >JPEG</option>
                                            <option value="image/webp">WEBP</option>
                                            {/* <option value="">{}</option> */}

                                        </select>
                                        <div className='flex items-center gap-2 w-1/2'>
                                            <span className='font-semibold  '>Size:</span>
                                            {/* <Input id='size' value={size}
                                                        onChange={handleSizeChange} type='number' placeholder='Size' disabled /> */}

                                            <span className='font-medium'>{size} {fileSizeType}</span>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            {
                                transformedImage ? (
                                    <>
                                        <div className='flex gap-4'>
                                            <button
                                                onClick={handleDownload}
                                                className={`mt-6 mb-3 w-full  py-2 px-4 rounded-md  focus:outline-none focus:ring-2  focus:ring-offset-2  flex items-center justify-center bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-[101%]`}

                                            >
                                                <FiDownloadCloud className="mr-2" />
                                                Download
                                            </button>



                                        </div>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleTransform}
                                        className={`mt-6 mb-3 w-full  py-2 px-4 rounded-md  focus:outline-none focus:ring-2  focus:ring-offset-2  flex items-center justify-center ${transformedImageLoading ? 'bg-blue-200 text-gray-200' : ' bg-blue-600 transition duration-300 ease-in-out transform hover:scale-[101%] text-white hover:bg-blue-700 focus:ring-blue-500'}`} disabled={transformedImageLoading}
                                        hidden={!originalImage || !!transformedImage}
                                    >
                                        <FiRotateCw className="mr-2" />
                                        Transform Image
                                    </button>
                                )
                            }



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
                            <DragAndDrop onDrop={onDrop} />
                        )
                    )}
            </div>

        </>
    )
}
