import React, { useEffect } from 'react';

const SEO = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage,
  articleData
}) => {
  const siteTitle = 'Softrate Tech | Modern Engineering, Cloud & AI Architecture';
  const finalTitle = title ? `${title} | Softrate Tech` : siteTitle;
  const finalDesc =
    description ||
    'In-depth technical articles, engineering deep dives, and software architecture insights from Softrate Technologies.';
  const finalUrl = canonical || window.location.href;
  const defaultImage =
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80';
  const finalImage = ogImage || defaultImage;

  useEffect(() => {
    // Update Title
    document.title = finalTitle;

    // Helper to update or create meta tag
    const setMetaTag = (attribute, value, content) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta
    setMetaTag('name', 'description', finalDesc);

    // Open Graph
    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDesc);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', finalUrl);
    setMetaTag('property', 'og:image', finalImage);
    setMetaTag('property', 'og:site_name', 'Softrate Tech');

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDesc);
    setMetaTag('name', 'twitter:image', finalImage);

    // Canonical link tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', finalUrl);

    // Schema.org JSON-LD structured data for Articles
    const existingScript = document.getElementById('schema-article-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    if (articleData) {
      const script = document.createElement('script');
      script.id = 'schema-article-jsonld';
      script.type = 'application/ld+json';
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: articleData.title,
        image: [finalImage],
        datePublished: articleData.publishedDate,
        dateModified: articleData.updatedAt || articleData.publishedDate,
        author: {
          '@type': 'Person',
          name: articleData.author?.name || 'Softrate Contributor'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Softrate Technologies',
          logo: {
            '@type': 'ImageObject',
            url: window.location.origin + '/favicon.svg'
          }
        },
        description: articleData.summary || finalDesc,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': finalUrl
        }
      };
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [finalTitle, finalDesc, finalUrl, finalImage, ogType, articleData]);

  return null;
};

export default SEO;
