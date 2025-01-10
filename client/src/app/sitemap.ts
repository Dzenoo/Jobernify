import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}about-us`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}faq`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}seeker-guidelines`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}employer-guidelines`,
    },
  ];
}
