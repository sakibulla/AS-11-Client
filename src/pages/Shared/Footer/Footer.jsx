import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link } from 'react-router';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-base-content py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          <div className="flex-shrink-0">
            <Logo />
            <p className="mt-3 max-w-sm text-sm">We connect you with professional decorators and event services — fast, reliable and secure.</p>
            <div className="mt-4 text-sm">
              <div>Address: 123 Celebration Ave, Party City</div>
              <div>Phone: <a href="tel:+1234567890" className="link link-hover">+1 (234) 567-890</a></div>
              <div>Email: <a href="mailto:hello@xdecor.example" className="link link-hover">hello@xdecor.example</a></div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 flex-1">
            <div>
              <h4 className="font-semibold mb-2">Explore</h4>
              <ul className="space-y-1 text-sm">
                <li><Link to="/" className="link link-hover">Home</Link></li>
                <li><Link to="/services" className="link link-hover">Services</Link></li>
                <li><Link to="/coverage" className="link link-hover">Coverage</Link></li>
                <li><Link to="/about" className="link link-hover">About</Link></li>
                <li><Link to="/contact" className="link link-hover">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Account</h4>
              <ul className="space-y-1 text-sm">
                <li><Link to="/login" className="link link-hover">Login</Link></li>
                <li><Link to="/register" className="link link-hover">Register</Link></li>
                <li><Link to="/dashboard" className="link link-hover">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Legal</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="/privacy" className="link link-hover">Privacy</a></li>
                <li><a href="/terms" className="link link-hover">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-6 border-t pt-6">
          <div className="flex items-center gap-4">
            <span className="text-sm">Follow us:</span>
            <div className="flex gap-3">
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-current">
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
            </div>
          </div>

          <div className="text-sm">&copy; {year} ACME Industries Ltd — All rights reserved</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;