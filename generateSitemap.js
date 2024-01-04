const fs = require('fs');
const products = require('./allProducts')
// Список ідентифікаторів товарів (припустимо, що вони зберігаються у масиві)


// Функція для генерації sitemap.xml зі списку товарів
function generateSitemap(products) {
  const baseUrl = 'https://www.beautyblossom.com.ua/product/';

  const urls = products.map(product => {
    return `${baseUrl}${product.id}`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(url => `
      <url>
        <loc>${url}</loc>
        <lastmod>2023-12-21</lastmod>
      </url>`).join('\n')}
    </urlset>`;

  fs.writeFileSync('sitemap.xml', xml, 'utf8');
}

generateSitemap(products);

console.log(products);