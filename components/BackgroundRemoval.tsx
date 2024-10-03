"use client"
import React, { useState, useCallback, useRef, useEffect, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaSpinner } from 'react-icons/fa';
import { FiUploadCloud, FiImage, FiRotateCw, FiDownloadCloud, FiCrop } from 'react-icons/fi';
import Link from 'next/link';
import { ImageContext } from './shared/context/ImageProvider';
import { PopoverPicker } from './shared/color-picker/PopoverPicker';
import DragAndDrop from './shared/DragAndDrop';
import { toast } from '@/hooks/use-toast';
import Img from 'next/image';


const BackgroundRemoval = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [transformedImageLoading, setTransformedImageLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isModifying, setIsModifying] = useState(false)
  const [color, setColor] = useState("#bbb")
  const [downloadImage, setDownloadImage] = useState<string>('' as string)
  const imageContext = useContext(ImageContext)


  // reference

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const backgroundImageRef = useRef<HTMLInputElement | null>(null);


  const onDrop = useCallback((acceptedFiles: File[]) => {

    const file = acceptedFiles[0];
    setFile(file)
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string; // Type assertion
      setOriginalImage(result);
      setTransformedImage(null);
      setIsModifying(false)
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

  const handleTransform = async () => {


    setTransformedImageLoading(true);
    const data = await fetch("/api/transformation/backgroundRemoval", {
      method: "POST",
      body: JSON.stringify({ image: originalImage })
    })
    const response = await data.json()

    if (data.status == 200) {
      setTransformedImage(response.result);
      setDownloadImage(response.result)
      imageContext?.setImage(response.result)
      setTransformedImageLoading(false);
    }
    else if (data.status == 400) {
      setTransformedImage(null);
      setDownloadImage("")
      imageContext?.setImage("")
      setTransformedImageLoading(false);
      toast({
        title: `${response.title}`,
        description: `${response.result}`,
        duration: 5000,
        className: 'error-toast'

      })
    }

  };

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();


    const a = document.createElement("a");

    a.href = downloadImage;

    if (file?.name && file?.name.length)
      a.download = `${file?.name.replace(" ", "_")}`;
    document.body.appendChild(a);
    a.click();
  }

  // Modify
  const [foregroundImage, setForegroundImage] = useState<HTMLImageElement | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  const [useBackgroundImage, setUseBackgroundImage] = useState(true);
  // Handle foreground image upload
  const handleForegroundUpload = (dataUrl: string) => {

    const img = new Image();
    img.src = dataUrl;


    img.onload = () => {
      setForegroundImage(img);
    };


  };


  // Handle background image upload
  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        img.src = result;
      }
    };

    img.onload = () => {
      setBackgroundImage(img);
    };
    reader.readAsDataURL(file);
    setUseBackgroundImage(true)
  };

  // Draw images and background on canvas
  const drawImages = (imageType: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;


    if (!foregroundImage) return;

    // Set canvas size to the size of the foreground image
    canvas.width = foregroundImage.width;
    canvas.height = foregroundImage.height;

    if (useBackgroundImage && backgroundImage) {
      // Draw background image
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    } else {
      // Draw background color
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw foreground image on top
    ctx.drawImage(foregroundImage, 0, 0, canvas.width, canvas.height);
    setDownloadImage(canvas.toDataURL(imageType))
    imageContext?.setImage(canvas.toDataURL(imageType))
  };


  useEffect(() => {
    if (!file) return
    if (foregroundImage) {
      drawImages(file.type); // Call drawImages whenever foregroundImage is updated
      setIsModifying(true);
    }
  }, [foregroundImage, backgroundImage]);

  useEffect(() => {
    setUseBackgroundImage(false)
    if (foregroundImage) {
      if (!file) return
      drawImages(file.type); // Call drawImages whenever foregroundImage is updated
      setIsModifying(true);
    }
  }, [color]);

  const handleModify = async () => {
    if (!transformedImage) return
    handleForegroundUpload(transformedImage)
  }


  return (

    <div className="shadow-lg rounded-lg">

      {originalImage ?


        (
          <div className="mt-2 p-6">
            <div className="flex flex-col md:flex-row justify-around  space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2" hidden={isModifying}>
                <h2 className="text-lg font-semibold mb-2">Original Image</h2>
                <Img
                  src={originalImage}
                  width={100}
                  height={100}
                  alt="Original uploaded image"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="w-full md:w-1/2 grid" >
                <h2 className="text-lg font-semibold mb-2">Transformed Image</h2>
                {transformedImage ? (
                  <Img
                    src={transformedImage}
                    width={100}
                    height={100}
                    alt="Transformed image"
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    {transformedImageLoading ? <FaSpinner className="animate-spin text-4xl text-blue-500" /> : <FiImage className="h-12 w-12 text-gray-400" />}

                  </div>
                )}
              </div>
              <div className="w-full md:w-1/2" hidden={!isModifying}>
                <h2 className="text-lg font-semibold mb-2">Modify Image</h2>
                <canvas ref={canvasRef} className="w-full h-auto rounded-lg shadow-md" hidden={!isModifying}></canvas>

              </div>
            </div>

            {
              transformedImage ? (
                <>
                  <div className='flex flex-col md:flex-row md:gap-4'>
                    <button
                      onClick={handleDownload}
                      className={`md:mt-6 mb-3 w-full md:w-1/2  py-2 px-4 rounded-md order-1 md:order-none  focus:outline-none focus:ring-2  focus:ring-offset-2  flex items-center justify-center bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-[101%]`}

                    >
                      <FiDownloadCloud className="mr-2" />
                      Download
                    </button>
                    <div className='flex md:w-1/2 items-center justify-around gap-4'>
                      {isModifying ? (
                        <div className='mt-3 flex items-center gap-3 justify-center'>


                          <PopoverPicker color={color} onChange={setColor} />
                          <span className='font-semibold'>OR</span>


                          <input type="file" onChange={handleBackgroundUpload} accept="image/*" ref={backgroundImageRef} hidden={true} />
                          <button
                            onClick={() => backgroundImageRef?.current?.click()}
                            className={` py-2 px-4 rounded-md  focus:outline-none focus:ring-2  focus:ring-offset-2  flex items-center justify-center bg-pink-800 text-white hover:bg-pink-900 focus:ring-pink-500 transition duration-300 ease-in-out transform hover:scale-[101%]`}>
                            <FiUploadCloud />

                          </button>
                        </div>

                      ) : (
                        <button
                          onClick={handleModify}
                          className={`mt-6 mb-3 w-1/2  py-2 px-4 rounded-md  focus:outline-none focus:ring-2  focus:ring-offset-2  flex items-center justify-center bg-purple-800 text-white hover:bg-purple-900 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-[101%]`}>
                          <FiDownloadCloud className="mr-2" />
                          Modify
                        </button>

                      )}
                      <Link
                        href={"/tools/crop-image"}
                        className={`mt-6 mb-3 w-1/2  py-2 px-4 rounded-md  focus:outline-none focus:ring-2  focus:ring-offset-2  flex items-center justify-center bg-yellow-800 text-white hover:bg-yellow-900 focus:ring-yellow-500 transition duration-300 ease-in-out transform hover:scale-[101%]`}>
                        <FiCrop className='mr-2' />
                        Crop
                      </Link>
                    </div>


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

  );
};

export default BackgroundRemoval;