import type { MetadataRoute } from 'next';

const baseUrl = 'https://anderson-cleaning-services.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/about', '/services', '/gallery', '/contact', '/quote', '/careers'].map((path) => ({
    url: baseUrl + path,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/quote' || path === '/contact' ? 0.8 : 0.6,
  }));
}
