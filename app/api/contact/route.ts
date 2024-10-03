import { NextResponse} from 'next/server'
import nodemailer from 'nodemailer';


// Handles POST requests to /api

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS
    }
});

export async function POST(request: Request) {

    const formData = await request.json()



    try {
        await transporter.sendMail({
            from: formData.email, // sender address
            to: process.env.EMAIL_ADDRESS, // list of receivers
            subject: `${formData.subject} - Artifixer.tech`, // Subject line
            text: JSON.stringify(formData.message), // plain text body
            html: `<div className=' border-2'>
      <div className="flex items-center justify-center gap-2 py-12 bg-gradient-to-r from-purple-900 to-indigo-900">
        <FaRobot className="text-5xl text-white" />
        <span className="text-4xl font-bold text-white italic">Artifixer</span>
      </div>
      <div className='px-3 py-4'>
        <div>
          <span className='text-lg font-semibold'>Name: </span><span className='text-base'>${formData.name}</span>
        </div>
        <div>
          <span className='text-lg font-semibold'>Email: </span><span className='text-base'>${formData.email}</span>
        </div>
        <div>
          <span className='text-lg font-semibold'>Subject: </span><span className='text-base'>${formData.subject}</span>
        </div>
        <div>
          <span className='text-lg font-semibold'>Message: </span>
          <p className='text-base'>${formData.message}
          </p>
        </div>
      </div>
    </div>`// html body
        })
        return NextResponse.json({ status: 200 })
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }


}