import { getAllEntries, getBlogListRes } from '../core/api';
import { Context, Pages, PostPage } from '../types/pages';

const Sitemap = () => {
  return null;
};

const getServerSideProps = async ({ res }: { res: Context }) => {
  const baseUrl = process.env.NEXT_PUBLIC_HOSTED_URL || 'http://localhost:3000';

  const pages: Pages = await getAllEntries();
  const posts: PostPage = await getBlogListRes();

  const allPages = pages.map((page) => `${baseUrl}${page.url}`);
  const allPosts = posts.map((post) => `${baseUrl}${post.url}`);
  const siteMapList = [...allPages, ...allPosts].sort();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${siteMapList
        .map((url) => {
          return `
          <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
export { getServerSideProps };
