import React, { useState, useRef } from 'react';
import {
  Heading2,
  Heading3,
  Bold,
  Italic,
  Quote,
  List,
  ListOrdered,
  Code,
  Table,
  Image as ImageIcon,
  Link2,
  Eye,
  FileCode,
  Undo
} from 'lucide-react';

const RichTextEditor = ({ value = '', onChange }) => {
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'preview'
  const textareaRef = useRef(null);

  const insertSnippet = (prefix, suffix = '', defaultText = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultText;

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 0);
  };

  const handleInsertHeading2 = () => insertSnippet('<h2>', '</h2>\n', 'Section Title');
  const handleInsertHeading3 = () => insertSnippet('<h3>', '</h3>\n', 'Subsection Title');
  const handleInsertBold = () => insertSnippet('<strong>', '</strong>', 'bold text');
  const handleInsertItalic = () => insertSnippet('<em>', '</em>', 'italicized text');
  const handleInsertQuote = () =>
    insertSnippet('<blockquote>\n  "', '"\n</blockquote>\n', 'Quote text here');
  const handleInsertUl = () =>
    insertSnippet('<ul>\n  <li>', '</li>\n  <li>Second item</li>\n</ul>\n', 'First item');
  const handleInsertOl = () =>
    insertSnippet('<ol>\n  <li>', '</li>\n  <li>Step 2</li>\n</ol>\n', 'Step 1');
  const handleInsertCodeBlock = () =>
    insertSnippet('<pre><code>\n', '\n</code></pre>\n', '// code snippet here');
  const handleInsertInlineCode = () => insertSnippet('<code>', '</code>', 'variableName');

  const handleInsertLink = () => {
    const url = prompt('Enter URL link:', 'https://');
    if (url) {
      insertSnippet(`<a href="${url}" target="_blank" rel="noopener noreferrer">`, '</a>', 'link text');
    }
  };

  const handleInsertImage = () => {
    const url = prompt(
      'Enter Image URL:',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    );
    if (url) {
      const alt = prompt('Enter Image Caption/Alt:', 'Article illustration') || '';
      insertSnippet(`<figure>\n  <img src="${url}" alt="${alt}" />\n  <figcaption>${alt}</figcaption>\n</figure>\n`);
    }
  };

  const handleInsertTable = () => {
    const tableTemplate = `<table border="1" cellpadding="8" style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f1f5f9;">
      <th>Feature</th>
      <th>Specification</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Architecture</td>
      <td>Microservices / Event-Driven</td>
      <td>Production Ready</td>
    </tr>
    <tr>
      <td>Security</td>
      <td>Zero Trust / mTLS</td>
      <td>Active</td>
    </tr>
  </tbody>
</table>\n`;
    insertSnippet(tableTemplate);
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
      {/* Editor Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center justify-between gap-1">
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={handleInsertHeading2}
            title="Heading 2"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertHeading3}
            title="Heading 3"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-300 mx-1" />

          <button
            type="button"
            onClick={handleInsertBold}
            title="Bold"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertItalic}
            title="Italic"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertQuote}
            title="Blockquote"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <Quote className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-300 mx-1" />

          <button
            type="button"
            onClick={handleInsertUl}
            title="Bullet List"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertOl}
            title="Numbered List"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-300 mx-1" />

          <button
            type="button"
            onClick={handleInsertCodeBlock}
            title="Code Block"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertTable}
            title="Insert Table"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <Table className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertImage}
            title="Insert Image"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertLink}
            title="Insert Link"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <Link2 className="w-4 h-4" />
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
              activeTab === 'editor'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
              activeTab === 'preview'
                ? 'bg-white text-zoho-red shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      {activeTab === 'editor' ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your article content using HTML or Markdown tags (<h2>, <p>, <blockquote>, <pre><code>, <table>)..."
          rows={18}
          className="w-full p-4 font-mono text-sm text-slate-800 bg-white focus:outline-none resize-y leading-relaxed"
        />
      ) : (
        <div className="p-6 bg-white min-h-[420px] max-h-[600px] overflow-y-auto">
          {value ? (
            <div
              className="article-prose"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          ) : (
            <p className="text-slate-400 italic text-sm">No content to preview yet.</p>
          )}
        </div>
      )}

      {/* Footer Helper */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Supports HTML tags, code blocks, tables, and images.</span>
        <span>
          Word count: {value.replace(/<\/?[^>]+(>|$)/g, ' ').trim().split(/\s+/).filter(Boolean).length} words
        </span>
      </div>
    </div>
  );
};

export default RichTextEditor;
