import React, { useEffect, useState } from 'react';
import { ListOrdered } from 'lucide-react';

const TableOfContents = ({ content = '' }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!content) return;

    // Create a temporary DOM container to parse headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');

    const items = [];
    headingElements.forEach((el, index) => {
      const text = el.textContent || '';
      const id =
        el.id ||
        text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') ||
        `heading-${index}`;

      items.push({
        id,
        text,
        level: el.tagName.toLowerCase() === 'h2' ? 2 : 3
      });
    });

    setHeadings(items);

    // Also attach matching IDs to real DOM headings in .article-prose
    const articleContainer = document.querySelector('.article-prose');
    if (articleContainer) {
      const liveHeadings = articleContainer.querySelectorAll('h2, h3');
      liveHeadings.forEach((el, index) => {
        if (!el.id && items[index]) {
          el.id = items[index].id;
        }
      });
    }

    // Scroll spy
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const liveHeadings = document.querySelectorAll('.article-prose h2, .article-prose h3');
      let currentActive = '';

      liveHeadings.forEach((heading) => {
        const top = heading.getBoundingClientRect().top + window.scrollY - 120;
        if (scrollY >= top) {
          currentActive = heading.id;
        }
      });

      if (currentActive) {
        setActiveId(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content]);

  if (!headings || headings.length < 2) {
    return null; // Don't show TOC for very short articles
  }

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs sticky top-24">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-800">
        <ListOrdered className="w-4 h-4 text-zoho-red" />
        <span>Table of Contents</span>
      </div>

      <nav className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1">
        {headings.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`block w-full text-left text-xs transition-colors rounded-md py-1 px-2 ${
                item.level === 3 ? 'pl-5 text-slate-500' : 'font-medium text-slate-700'
              } ${
                isActive
                  ? 'text-zoho-red font-bold bg-red-50/70 border-l-2 border-zoho-red'
                  : 'hover:text-zoho-red hover:bg-slate-50'
              }`}
            >
              <span className="line-clamp-2">{item.text}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TableOfContents;
