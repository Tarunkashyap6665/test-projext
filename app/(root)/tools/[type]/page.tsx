
import BackgroundRemoval from '@/components/BackgroundRemoval';
import CropImage from '@/components/CropImage';
import ResizeImage from '@/components/ResizeImage';
import { Metadata } from 'next';
import React from 'react'

export const generateMetadata = ({ params: { type } }: { params: { type: string } }): Metadata => {
  const tools = toolsType[type as ToolType];
  return {
    title: tools.title,
    description: tools.description
  }
}


const toolsType = {
  "crop-image": {
    title: "Crop Image",
    description: "Easily crop images to your desired dimensions.",
    component: <CropImage />
  },
  "resize-image": {
    title: "Resize Image",
    description: "Resize images while maintaining quality and aspect ratio.",
    component: <ResizeImage />
  },
  "background-removal": {
    title: "Background Removal",
    description: "Effortlessly remove image backgrounds with a single click.",
    component: <BackgroundRemoval />
  },
}
type ToolType = 'crop-image' | 'resize-image' | 'background-removal';
const ToolsPage = ({ params: { type } }: { params: { type: string } }) => {
  const tools = toolsType[type as ToolType];
  return (
    <>

      <div className=" py-16  bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {tools.title}
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              {tools.description}
            </p>
          </div>
          <div className='mt-12'>
          {tools.component}
          </div>
        </div>

      </div>

    </>
  )

}

export default ToolsPage