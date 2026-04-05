/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileCtaBar } from './components/layout/MobileCtaBar';

// Routes
import { Home } from './routes/Home';
import { Services } from './routes/Services';
import { Work } from './routes/Work';
import { About } from './routes/About';
import { Reviews } from './routes/Reviews';
import { Faq } from './routes/Faq';
import { Quote } from './routes/Quote';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-sans selection:bg-primary/30 selection:text-on-background">
      <ScrollToTop />
      <Header />
      
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/quote" element={<Quote />} />
        </Routes>
      </div>

      <Footer />
      <MobileCtaBar />
    </div>
  );
}
