import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}about-us`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}faq`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}seeker-guidelines`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}employer-guidelines`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}terms-and-conditions`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}privacy-policy`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}cookie-policy`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
