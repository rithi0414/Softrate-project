import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, Github, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const Footer = ({ categories = [] }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" size="md" to="/" />

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Softrate is an enterprise technology publication dedicated to distributed systems, cloud computing, intelligent automation, and modern software craftsmanship.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-white mb-2">
                Subscribe to our Engineering Dispatch
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                Curated weekly architectures, benchmarks, and deep dives. No spam.
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-lg text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Thank you for subscribing! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your work email"
                      required
                      className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-zoho-red"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-zoho-red hover:bg-zoho-redHover text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Categories Col 1 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore Topics
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/category/software-development" className="hover:text-white transition-colors">
                  Software Development
                </Link>
              </li>
              <li>
                <Link to="/category/artificial-intelligence-machine-learning" className="hover:text-white transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link to="/category/web-and-mobile-app-development" className="hover:text-white transition-colors">
                  Web & Mobile Dev
                </Link>
              </li>
              <li>
                <Link to="/category/technology-innovation" className="hover:text-white transition-colors">
                  Technology & Innovation
                </Link>
              </li>
              <li>
                <Link to="/category/cybersecurity" className="hover:text-white transition-colors">
                  Cybersecurity
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Col 2 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Platforms & Strategy
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/category/cloud-computing" className="hover:text-white transition-colors">
                  Cloud Computing
                </Link>
              </li>
              <li>
                <Link to="/category/industry-insights" className="hover:text-white transition-colors">
                  Industry Insights
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  All Publications
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  XML Sitemap
                </a>
              </li>
              <li>
                <a href="/robots.txt" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Robots Indexing
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links & Social */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Connect & Admin
            </h4>
            <div className="flex items-center gap-3 text-slate-400 mb-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-zoho-red hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-zoho-red hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-zoho-red hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-zoho-red hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-2 text-xs">
              <Link
                to="/admin/login"
                className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>CMS Admin Portal</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <p className="text-slate-500 text-[11px] pt-2">
                Designed & Built with MERN Stack adhering strictly to enterprise production standards.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Softrate Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
