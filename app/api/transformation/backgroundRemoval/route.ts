// pages/api/background-remove.js

import { NextResponse } from "next/server";

// Function to convert Data URL to a Blob
function dataURLtoBlob(dataurl: string): Blob | null {
  // Split the data URL at the comma
  const arr = dataurl.split(',');

  const mimeMatch = arr[0].match(/:(.*?);/);
  
  if (!mimeMatch) {
    // Handle the error case when match() fails
    console.error("Invalid data URL format.");
    return null; // or throw an error, depending on how you want to handle it
  }

  const mime = mimeMatch[1];

  // Decode the Base64 string
  const bstr = atob(arr[1]);

  // Create a typed array to hold the decoded data
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  // Return the Blob object
  return new Blob([u8arr], { type: mime });
}

// Convert Data URL to a File object
function dataURLtoFile(dataurl: string, filename: string): File | null {
  const blob = dataURLtoBlob(dataurl);
  if (!blob) {
    // Handle the case where the Blob is null
    console.error("Failed to convert data URL to Blob.");
    return null;
  }
  return new File([blob], filename, { type: blob.type });
}




export async function POST(req: Request) {
  // Ensure the request method is POST

  if (req.method !== 'POST') {
    return (new Response('Only POST requests are allowed', {
      status: 405
    }))
  }

  const url = 'https://remove-background-of-any-image-object.p.rapidapi.com/rembg_file';
  const formData = new FormData();

  // Assuming the image is being sent from the frontend in the request body
  const { image } = await req.json();

  // Convert the Data URL to a File object
  const imageFile = dataURLtoFile(image, "image.png");

  // Append image to formData (if you are sending the image in base64 or file, handle accordingly)
  formData.append('file', imageFile!);

  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': 'cd71467a38mshb73d6bb2b9b603ap1486cajsn78f8b90c8a74',
      'x-rapidapi-host': 'remove-background-of-any-image-object.p.rapidapi.com'
    },
    body: formData
  };



  try {
    const response = await fetch(url, options);

    if(response.status==200){

      const result = await response.arrayBuffer();
      // Convert ArrayBuffer to Buffer
      const buffer = Buffer.from(result);
  
      const base64Image = buffer.toString('base64');
  
      // Create data URL
      const imgSrc = `data:image/png;base64,${base64Image}`;
  
      
      return NextResponse.json({ result: imgSrc }, { status: 200 });
    }
    if(response.status==400){
      return NextResponse.json({ title:"Bad Request",result: "Use a different image as the quality is not good.." }, { status: 400 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process the request' }, { status: 500 });
  }
}
