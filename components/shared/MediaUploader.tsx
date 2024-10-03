"use client"
import { useToast } from "@/hooks/use-toast";
import { CldUploadWidget } from "next-cloudinary"

import { FiUpload} from "react-icons/fi";

type MediaUploaderProps = {
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>;
    setFileName: React.Dispatch<any>;
    publicId: string,
    image: any,
    type: string
}

const MediaUploader = ({ onValueChange, setFileName, setImage, publicId}: MediaUploaderProps) => {
    const { toast } = useToast()


    const onUploadSuccessHandler = (result: any) => {
        setImage((prevState: any) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureURL: result?.info?.secure_url

        }))
        setFileName(result?.info?.display_name)
        onValueChange(result?.info?.public_id)
        
    }
    const onUploadErrorHandler = () => {
        toast({
            title: 'Something went wrong while uploading',
            description: 'Please try again',
            duration: 5000,
            className: 'error-toast'
        })
    }
    return (
        <CldUploadWidget
            uploadPreset='artfixer'
            options={{
                multiple: false,
                resourceType: "image"
            }}
            onSuccess={onUploadSuccessHandler}
            onError={onUploadErrorHandler}>
            {({ open }) => (
                <>


                    {!publicId && (
                        <div className=" p-8 rounded-lg">
                        <div className="mb-6">
                            <label
                                htmlFor="image-upload"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Upload an image:
                            </label>
                            <div
                               
                                className={`border-gray-300 rounded-lg text-center  cursor-pointer    flex items-center justify-center w-full`}
                                onClick={() => open()}>
                                <label
                                    htmlFor="image-upload"
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                >

                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        
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


                    )}

                    
                </>
            )}
        </CldUploadWidget>
    )
}

export default MediaUploader