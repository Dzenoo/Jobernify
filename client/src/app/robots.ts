import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about-us',
          '/faq',
          '/seeker-guidelines',
          '/employer-guidelines',
          '/terms-and-conditions',
          '/privacy-policy',
          '/cookie-policy',
        ],
        disallow: [
          '/login',
          '/register',
          '/employers/*',
          '/seekers/*',
          '/profile/*',
          '/jobs/*',
          '/dashboard/*',
          '/verify-email',
          '/check-your-email',
          '/auth/*',
          '/_next/*',
          '/static/*',
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_CLIENT_URL}sitemap.xml`,
  };
}
