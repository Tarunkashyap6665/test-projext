import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { FaArrowsAltH } from "react-icons/fa";

const BeforeAfterBanner = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };


    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.Touch) => {
        if (isDragging && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
            setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
        }
    };


    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            setSliderPosition((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "ArrowRight") {
            setSliderPosition((prev) => Math.min(prev + 1, 100));
        }
    };

    useEffect(() => {
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <section className="relative bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative container w-full mx-auto overflow-hidden ">
                <div
                    className={`flex flex-col md:flex-row items-center justify-center p-8 `}
                >
                    <div className={`w-full md:w-1/2 mb-8 md:mb-0 md:mr-8`}>
                        <h1 className="text-4xl font-bold text-white mb-4">Experience the Power of Artifixer</h1>
                        <p className="text-xl text-orange-300 mb-6">
                            Revolutionize your images with our AI-powered enhancement technology
                        </p>
                        <Link href={"#trytools"} className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300">
                            Try it now
                        </Link>
                    </div>
                    <div
                        ref={containerRef}
                        className="relative w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-xl"
                        onMouseMove={handleMouseMove}
                        onTouchMove={(e) => {
                            const touch = e.touches[0];
                            handleMouseMove(touch);
                        }}
                    >
                        <Image
                            src="/assets/images/unblur-after.jpg"
                            alt="Before: Original image"
                            width={2725}
                            height={4088}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                        <div
                            className="absolute top-0 left-0 w-full h-full overflow-hidden"
                            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                        >
                            <Image
                                src="/assets/images/unblur-before.png"
                                alt="After: Enhanced image"
                                width={2725}
                                height={4088}
                                className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                        </div>
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                            style={{ left: `${sliderPosition}%` }}
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleMouseDown}
                            tabIndex={0}
                            role="slider"
                            aria-valuenow={sliderPosition}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label="Image comparison slider"
                            onKeyDown={handleKeyDown}
                        >
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
                                <FaArrowsAltH className="text-purple-700 text-xl" />
                            </div>
                        </div>
                        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                            Before
                        </div>
                        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                            After
                        </div>
                    </div>
                </div>
            </div>


        </section>
    );
};

export default BeforeAfterBanner;