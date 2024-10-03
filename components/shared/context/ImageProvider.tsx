"use client";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type ImageContextProps = {
    image: string | null; // Image can be either string or null
    setImage: Dispatch<SetStateAction<string | null>>;
};

export const ImageContext = createContext<ImageContextProps | null>(null);

const ImageProvider = ({ children }: { children: React.ReactNode }) => {
    const [image, setImage] = useState<string | null>(null); // Define the initial state type properly

    return (
        <ImageContext.Provider value={{ image, setImage }}>
            {children}
        </ImageContext.Provider>
    );
};

export default ImageProvider;
