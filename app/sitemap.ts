import { aiPoweredTools } from '@/constants'
import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
    const urls=aiPoweredTools.map((tool)=>({url:`${process.env.NEXT_PUBLIC_SERVER_URL}${tool.route}`}))
  return [{
    url:`${process.env.NEXT_PUBLIC_SERVER_URL}`
  },
   ...urls
  ]
}