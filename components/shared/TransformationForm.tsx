"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Form,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { aspectRatioOptions, creditFee, defaultValues, transformationTypes } from "@/constants"
import { CustomField } from "./CustomField"
import { useEffect, useState, useTransition } from "react"
import { AspectRatioKey, dataUrl, debounce, deepMergeObjects, download, getImageSize } from "@/lib/utils"
import MediaUploader from "./MediaUploader"
import TransformedImage from "./TransformedImage"
import { updateCredits } from "@/lib/actions/user.actions"
import { CldImage, getCldImageUrl } from "next-cloudinary"
import { addImage, updateImage } from "@/lib/actions/image.actions"
import { useRouter } from "next/navigation"
import { InsufficientCreditsModal } from "./InsufficientCreditsModal"
import { FiDownloadCloud, FiRotateCw } from "react-icons/fi"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props"
import { toast } from "@/hooks/use-toast"

export const formSchema = z.object({
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
})

const TransformationForm = ({ action, data = null, userId, type, creditBalance, config = null }: TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data)
  const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);
  const [, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config)
  const [, startTransition] = useTransition()
  const [fileName, setFileName] = useState(null)
  const router = useRouter()


  const initialValues = data && action === 'Update' ? {
    title: data?.title,
    aspectRatio: data?.aspectRatio,
    color: data?.color,
    prompt: data?.prompt,
    publicId: data?.publicId,
  } : defaultValues

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (data || image) {
      const transformationUrl = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig
      })

      const imageData = {
        publicId: image?.publicId,
        transformationType: type,
        width: image?.width,
        height: image?.height,
        config: transformationConfig,
        secureURL: image?.secureURL,
        transformationURL: transformationUrl,
        aspectRatio: values.aspectRatio,
        prompt: values.prompt,
        color: values.color,
      }

      if (action === 'Add') {
        try {
          const newImage = await addImage({
            image: imageData,
            userId,
            path: '/'
          })

          if (newImage) {
            form.reset()
            setImage(data)
            router.push(`/transformations/${newImage._id}`)
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (action === 'Update') {
        try {
          const updatedImage = await updateImage({
            image: {
              ...imageData,
              _id: data._id
            },
            userId,
            path: `/transformations/${data._id}`
          })

          if (updatedImage) {
            router.push(`/transformations/${updatedImage._id}`)
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    setIsSubmitting(false)
  }


  const downloadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    download(getCldImageUrl({
      width: image?.width,
      height: image?.height,
      src: image?.publicId,
      ...transformationConfig
    }), fileName!, type)
  }
  const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey]

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }))

    setNewTransformation(transformationType.config);

    return onChangeField(value)
  }

  const onInputChangeHandler = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void) => {
    debounce(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === 'prompt' ? 'prompt' : 'to']: value
        }
      }))
    }, 1000)();

    return onChangeField(value)
  }

  const onTransformHandler = async () => {
    setIsTransforming(true)

    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    )
    setNewTransformation(null)
    startTransition(async () => {
      await updateCredits(userId, creditFee)

    })
    toast({
      title: `Image transformed successfully`,
      description: '1 credit was deducted from your',
      duration: 5000,
      className: 'success-toast'

  })
  }

  useEffect(() => {
    if (image && (type === 'restore' || type === 'removeBackground')) {
      setNewTransformation(transformationType.config)
    }
  }, [image, transformationType.config, type])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {creditBalance < Math.abs(creditFee) && <InsufficientCreditsModal />}

        <CustomField
          control={form.control}
          name="publicId"
          className="flex size-full flex-col"
          render={({ field }) => (
            <MediaUploader
              onValueChange={field.onChange}
              setImage={setImage}
              setFileName={setFileName}
              publicId={field.value}
              image={image}
              type={type}
            />
          )}
        />
        {image?.publicId && (
          <>


            <div >

              <div className="mt-2 p-6">
                <div className="flex flex-col md:flex-row justify-around space-y-4 md:space-y-0 md:space-x-4">
                  <div className="w-full md:w-1/2" >
                    <h2 className="text-lg font-semibold mb-2">Original Image</h2>

                    <CldImage
                      width={getImageSize(type, image, "width")}
                      height={getImageSize(type, image, "height")}
                      src={image.publicId}
                      alt="image"
                      sizes={"(max-width:767px) 100vw, 50vw"}
                      placeholder={dataUrl as PlaceholderValue}
                      className="w-full h-auto rounded-lg shadow-md"

                    />
                  </div>
                  <TransformedImage
                    image={image}
                    type={type}
                    fileName={fileName!}
                    isTransforming={isTransforming}
                    setIsTransforming={setIsTransforming}
                    transformationConfig={transformationConfig}
                  />
                </div>
              </div>


            </div>
            <div>
            {type === 'fill' && (
              <CustomField
                control={form.control}
                name="aspectRatio"
                formLabel="Aspect Ratio"
                
                className="w-full  px-3 my-3 py-2"
                
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}
                    value={field.value}
                  >
                    <SelectTrigger >
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(aspectRatioOptions).map((key) => (
                        <SelectItem key={key} value={key} >
                          {aspectRatioOptions[key as AspectRatioKey].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            )}

            {(type === 'remove' || type === 'recolor') && (
              <div className="prompt-field">
                <CustomField
                  control={form.control}
                  name="prompt"
                  formLabel={
                    type === 'remove' ? 'Object to Remove' : 'Object to Recolor'
                  }
                  className="w-full  px-3 my-3 py-2"
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      
                      onChange={(e) => onInputChangeHandler(
                        'prompt',
                        e.target.value,
                        type,
                        field.onChange
                      )}
                    />
                  )}
                />

                {type === 'recolor' && (
                  <CustomField
                    control={form.control}
                    name="color"
                    formLabel="Replacement Color"
                    className="w-full  px-3 my-3 py-2"
                    render={({ field }) => (
                      <Input
                        value={field.value}
                        
                        onChange={(e) => onInputChangeHandler(
                          'color',
                          e.target.value,
                          'recolor',
                          field.onChange
                        )}
                      />
                    )}
                  />
                )}
              </div>
            )}
            </div>

            <div className='flex flex-col gap-4 px-2 py-3'>

              {/* <Button
            type="submit"
            className="submit-button capitalize"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Save Image'}
          </Button> */}
              <button
                onClick={onTransformHandler}
                disabled={isTransforming || newTransformation === null}
                className={`w-full  py-2 px-4 rounded-md  focus:outline-none focus:ring-2  focus:ring-offset-2  flex items-center justify-center ${(isTransforming || newTransformation === null)?'bg-blue-200 text-gray-200':'bg-blue-600 transition duration-300 ease-in-out transform hover:scale-[101%] text-white hover:bg-blue-700 focus:ring-blue-500'}  `}>
                <FiRotateCw className="mr-2" />

                {isTransforming ? 'Transforming...' : 'Apply Transformation'}
              </button>
              <button

                onClick={downloadHandler}
                className={` py-2 px-4 rounded-md  focus:outline-none focus:ring-2  focus:ring-offset-2  flex items-center justify-center bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-[101%]`}

              >
                <FiDownloadCloud className="mr-2" />
                Download
              </button>

            </div>
          </>
        )}



      </form>
    </Form>
  )
}

export default TransformationForm