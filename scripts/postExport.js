const dbSitemap = require('../db/sitemap.json')
const fs = require('fs')

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(
  dbSitemap
)
  .map(
    (path) => `
  <url>
    <loc>https://stupidsimple.blog${path}</loc>
    <lastmod>${dbSitemap[path].publishedSitemap}</lastmod>
  </url>`
  )
  .join('')}
</urlset>`

fs.writeFileSync('public/sitemap.xml', sitemapXml)

const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <atom:link href="https://stupidsimple.blog/rss.xml" rel="self" type="application/rss+xml" />
      <title>Stupid Simple Blog.</title>
      <link>https://stupidsimple.blog</link>
      <description>A Stupid Simple Blog demo witn next.js.</description>
      <image>
          <url>https://stupidsimple.blog/favicon-152.png</url>
          <title>Stupid Simple Blog.</title>
          <link>https://stupidsimple.blog</link>
          <description>Stupid Simple Blog. Logo</description>
      </image>${Object.keys(dbSitemap)
        .map(
          (path) => `
        <item>
            <title>${dbSitemap[path].title}</title>
            <guid>https://stupidsimple.blog${path}</guid>
            <description>${dbSitemap[path].description}</description>
            <pubDate>${dbSitemap[path].publishedRSS}</pubDate>
        </item>`
        )
        .join('')}
    </channel>
</rss>`
fs.writeFileSync('public/rss.xml', rssXml)
