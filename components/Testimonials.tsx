import React from 'react'
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {

    const testimonials = [
        { name: "John Doe", comment: "Artifixer's AI tools have revolutionized my image editing workflow!" },
        { name: "Jane Smith", comment: "The background removal feature is simply amazing. Saved me hours of work!" },
        { name: "Mike Johnson", comment: "Incredibly easy to use. The results are professional-grade every time." }
      ];
    return (
        <section className="bg-gray-200 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-600 mb-4">&quot;{testimonial.comment}&quot;</p>
                            <p className="font-semibold">{testimonial.name}</p>
                            <div className="flex text-yellow-400 mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials