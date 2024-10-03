import React from 'react'
import { useDropzone } from 'react-dropzone';
import { FiUpload} from 'react-icons/fi';

const DragAndDrop = ({ onDrop }: { onDrop: (acceptedFiles: File[]) => void }) => {
    const { getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.bmp'], // Use an object to specify the accept type
        },
        multiple: false,
    });
    return (
        <>
            <div className=" p-8 rounded-lg">
                <div className="mb-6">
                    <label
                        htmlFor="image-upload"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Upload an image:
                    </label>
                    <div
                        {...getRootProps()}
                        className={`${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'} rounded-lg text-center  cursor-pointer    flex items-center justify-center w-full`}
                    >
                        <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >

                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <input {...getInputProps()} />
                                <FiUpload className="text-4xl text-gray-400 mb-4" />
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or
                                    drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG or GIF
                                </p>
                            </div>
                        </label>
                    </div>

                </div>
            </div>



        </>
    )
}

export default DragAndDrop