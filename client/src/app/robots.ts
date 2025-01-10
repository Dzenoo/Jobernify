import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/terms-and-conditions',
          '/privacy-policy',
          '/cookie-policy',
          '/employers/*',
          '/seekers/*',
          '/profile/*',
          '/jobs/*',
          '/dashboard/*',
          '/verify-email',
          '/check-your-email',
          '/auth/*',
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_CLIENT_URL}sitemap.xml`,
  };
}
