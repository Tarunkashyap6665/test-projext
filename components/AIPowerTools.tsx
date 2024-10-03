import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const AIPowerTools = ({ items }: { items: AIPowerToolsProps[] }) => {


    return (
        <div className="min-h-screen  bg-gray-100">
            <section className="container py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our AI-Powered Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((tool, index) => (
                            
                            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center" key={`${tool.title}-${index}`}>
                                {React.createElement(tool.icon, {
                                    strokeWidth: 2,
                                    className: `text-5xl text-${tool.color}-500 mb-4 w-[1em]`,
                                })}
                                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                                <p className="text-gray-600 text-center mb-4">{tool.description}</p>
                                <div className="w-full h-40 bg-gray-200 rounded-md mb-4 overflow-hidden">
                                    <Image src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8aW1hZ2UgZWRpdGluZ3x8fHx8fDE2ODY3NTc1MzE&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" width={1080} height={821} alt="Image" className="w-full h-full object-cover" />
                                </div>
                                <Link href={tool.route} className={`bg-${tool.color}-500 text-white px-4 py-2 rounded-md hover:bg-${tool.color}-600 transition duration-300`}>Try Now</Link>
                            </div>
                    
                        ))}
                    </div>
                </div>
            </section>

        </div>


    )
}

export default AIPowerTools